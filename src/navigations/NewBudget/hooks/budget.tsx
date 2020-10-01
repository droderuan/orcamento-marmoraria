import React, { createContext, useCallback, useState, useContext } from 'react';
import Budget from '@dtos/Budget';
import Room from '@dtos/Room';
import Product from '@dtos/Product';
import generateID from '@utils/GenerateID';

interface BudgetContextData {
  budget: Budget;
  roomsInBudget: Room[];
  saveRoom(updatedRoom: Room): void;
  createRoom({ name }: CreateRoomProps): void;
  deleteRoom(roomToDelete: Room): void;
  createProduct({ roomId, product }: CreateProductProps): void;
  saveProduct({ roomId, product }: CreateProductProps): void;
  deleteProduct({ roomId, productId }: DeleteProductProps): void;
}

interface CreateRoomProps {
  name: string;
}

interface CreateProductProps {
  roomId: string;
  product: Product;
}

interface DeleteProductProps {
  roomId: string;
  productId: string;
}

const BudgetContext = createContext<BudgetContextData>({} as BudgetContextData);

export const BudgetProvider: React.FC = ({ children }) => {
  const [budget, setBudget] = useState<Budget>({} as Budget);
  const [roomsInBudget, setRoomsInBudget] = useState<Room[]>([]);

  const createRoom = useCallback(({ name }: CreateRoomProps) => {
    const newRoom = { id: generateID(), name, products: [] as Product[] };

    setRoomsInBudget(oldRoomsInBudget => {
      return [...oldRoomsInBudget, newRoom];
    });
  }, []);

  const saveRoom = useCallback((updatedRoom: Room) => {
    setRoomsInBudget(oldRoomsInBudget => {
      const updatedRoomsInBudget = oldRoomsInBudget;
      const roomIndex = oldRoomsInBudget.findIndex(
        room => room.id === updatedRoom.id,
      );
      updatedRoomsInBudget[roomIndex] = updatedRoom;
      return updatedRoomsInBudget;
    });
  }, []);

  const deleteRoom = useCallback(
    (roomToDelete: Room) => {
      const updatedRoomsInBudget = roomsInBudget.filter(
        room => room.id !== roomToDelete.id,
      );
      setRoomsInBudget([...updatedRoomsInBudget]);
    },
    [roomsInBudget],
  );

  const createProduct = useCallback(
    ({ roomId, product }: CreateProductProps) => {
      const roomsCopy = roomsInBudget;
      const roomToAddProductIndex = roomsCopy.findIndex(
        room => room.id === roomId,
      );
      if (roomToAddProductIndex !== -1) {
        const roomToAddProduct = roomsCopy[roomToAddProductIndex];
        roomToAddProduct.products.push(product);
        roomsCopy[roomToAddProductIndex] = roomToAddProduct;
        setRoomsInBudget([...roomsCopy]);
      }
    },
    [roomsInBudget],
  );

  const saveProduct = useCallback(
    ({ roomId, product }: CreateProductProps) => {
      const roomsCopy = roomsInBudget;
      const roomIndex = roomsCopy.findIndex(room => room.id === roomId);

      if (roomIndex !== -1) {
        const roomToSaveProduct = roomsCopy[roomIndex];
        const productIndex = roomToSaveProduct.products.findIndex(
          item => item.id === product.id,
        );
        productIndex !== -1 &&
          (roomToSaveProduct.products[productIndex] = product);
        roomsCopy[roomIndex] = roomToSaveProduct;
        setRoomsInBudget(roomsCopy);
      }
    },
    [roomsInBudget],
  );

  const deleteProduct = useCallback(
    ({ roomId, productId }: DeleteProductProps) => {
      const roomsCopy = roomsInBudget;
      const roomIndex = roomsCopy.findIndex(room => room.id === roomId);

      if (roomIndex !== -1) {
        const updatedProducts = roomsCopy[roomIndex].products.filter(
          item => item.id !== productId,
        );
        roomsCopy[roomIndex].products = updatedProducts;

        setRoomsInBudget(roomsCopy);
      }
    },
    [roomsInBudget],
  );

  return (
    <BudgetContext.Provider
      value={{
        budget,
        roomsInBudget,
        createRoom,
        saveRoom,
        deleteRoom,
        createProduct,
        saveProduct,
        deleteProduct,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export function useBudget(): BudgetContextData {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
