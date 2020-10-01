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
}

interface CreateRoomProps {
  name: string;
}

interface ProductDTO {
  roomId: string;
  product: Product;
}

const BudgetContext = createContext<BudgetContextData>({} as BudgetContextData);

export const BudgetProvider: React.FC = ({ children }) => {
  const [budget, setBudget] = useState<Budget>({} as Budget);
  const [roomsInBudget, setRoomsInBudget] = useState<Room[]>([]);

  const createProduct = useCallback(
    ({ roomId, product }) => {
      const roomsCopy = roomsInBudget;
      const roomToAddProductIndex = roomsInBudget.findIndex(
        room => room.id === roomId,
      );
      if (roomToAddProductIndex !== -1) {
        const roomToAddProduct = roomsInBudget[roomToAddProductIndex];
        roomToAddProduct?.products.push(product);
        roomsCopy[roomToAddProductIndex] = roomToAddProduct;
        setRoomsInBudget(oldRooms => [...roomsCopy]);
      }
    },
    [roomsInBudget],
  );

  const deleteProduct = useCallback(
    ({ roomId, product }: ProductDTO) => {
      const roomsCopy = roomsInBudget;
      const roomIndex = roomsInBudget.findIndex(room => room.id === roomId);

      if (roomIndex !== -1) {
        const roomToRemoveProduct = roomsInBudget[roomIndex];
        const productIndex = roomToRemoveProduct.products.findIndex(
          item => item.id === product.id,
        );
        roomToRemoveProduct.products.splice(productIndex, 0);
        roomsCopy[roomIndex] = roomToRemoveProduct;
        setRoomsInBudget(roomsCopy);
      }
    },
    [roomsInBudget],
  );

  const createRoom = useCallback(({ name }: CreateRoomProps) => {
    const newRoom = { id: generateID(), name, products: [] as Product[] };

    setRoomsInBudget(oldRoomsInBudget => {
      console.log([...oldRoomsInBudget, newRoom]);
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

  return (
    <BudgetContext.Provider
      value={{ budget, roomsInBudget, createRoom, saveRoom, deleteRoom }}
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
