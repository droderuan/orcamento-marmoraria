import React, { createContext, useCallback, useState, useContext } from 'react';
import Budget from '@dtos/Budget';
import Room from '@dtos/Room';
import Product from '@dtos/Product';
import Item from '@dtos/Item';
import generateID from '@utils/GenerateID';

interface CreateRoomDTO {
  name: string;
}

interface CreateProductDTO {
  roomId: string;
  product: Product;
}

interface DeleteProductDTO {
  roomId: string;
  productId: string;
}

interface AddItemToProductDTO {
  roomId: string;
  productId: string;
  item: Item;
}

interface AddItemToProductDTO {
  roomId: string;
  productId: string;
  item: Item;
}

interface GetItemDTO {
  roomId: string;
  productId: string;
  itemId: string;
}

interface BudgetContextData {
  budget: Budget;
  roomsInBudget: Room[];
  saveRoom(updatedRoom: Room): void;
  createRoom({ name }: CreateRoomDTO): void;
  deleteRoom(roomToDelete: Room): void;
  createProduct({ roomId, product }: CreateProductDTO): void;
  saveProduct({ roomId, product }: CreateProductDTO): void;
  deleteProduct({ roomId, productId }: DeleteProductDTO): void;
  addItemToProduct({ roomId, productId, item }: AddItemToProductDTO): void;
  getItem({ roomId, productId, itemId }: GetItemDTO): Item | undefined;
}

const BudgetContext = createContext<BudgetContextData>({} as BudgetContextData);

export const BudgetProvider: React.FC = ({ children }) => {
  const [budget, setBudget] = useState<Budget>({} as Budget);
  const [roomsInBudget, setRoomsInBudget] = useState<Room[]>([]);

  const createRoom = useCallback(({ name }: CreateRoomDTO) => {
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
    ({ roomId, product }: CreateProductDTO) => {
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
    ({ roomId, product }: CreateProductDTO) => {
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
    ({ roomId, productId }: DeleteProductDTO) => {
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

  const addItemToProduct = useCallback(
    ({ roomId, productId, item }: AddItemToProductDTO) => {
      const roomsCopy = roomsInBudget;
      const roomIndex = roomsCopy.findIndex(room => room.id === roomId);

      if (roomIndex === -1) {
        return;
      }
      const roomToSaveProduct = roomsCopy[roomIndex];
      const productIndex = roomToSaveProduct.products.findIndex(
        product => product.id === productId,
      );
      if (productIndex === -1) {
        return;
      }
      const productToUpdate = roomToSaveProduct.products[productIndex];
      const itemIndex = productToUpdate.items.findIndex(
        itemToFind => itemToFind.id === item.id,
      );
      if (itemIndex !== -1) {
        productToUpdate.items[itemIndex] = item;
      } else {
        roomToSaveProduct.products[productIndex].items.push(item);
      }
      roomsCopy[roomIndex] = roomToSaveProduct;
      setRoomsInBudget(roomsCopy);
    },
    [roomsInBudget],
  );

  const getItem = useCallback(
    ({ productId, roomId, itemId }) => {
      const findRoom = roomsInBudget.find(room => room.id === roomId);
      const findProduct = findRoom?.products.find(
        product => product.id === productId,
      );
      const findItem = findProduct?.items.find(item => item.id === itemId);

      return findItem;
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
        addItemToProduct,
        getItem,
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
