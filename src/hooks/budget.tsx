import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import Budget from '@dtos/Budget';
import Room from '@dtos/Room';
import Product from '@dtos/Product';
import Item from '@dtos/Item';
import generateID from '@utils/GenerateID';
import Client from '@dtos/Client';
import ClientAddress from '@dtos/ClientAddress';

import {
  getBudgetFromStorage,
  saveBudgetFromStorage,
  deleteBudgetFromStorage,
} from '@services/Storage';
import { useRoute } from '@react-navigation/core';

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

interface AddOrSaveItemDTO {
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
  deleteBudget(): void;
  saveRoom(updatedRoom: Room): void;
  createRoom({ name }: CreateRoomDTO): void;
  deleteRoom(roomToDelete: Room): void;
  createProduct({ roomId, product }: CreateProductDTO): void;
  saveProduct({ roomId, product }: CreateProductDTO): void;
  deleteProduct({ roomId, productId }: DeleteProductDTO): void;
  createItem({ roomId, productId, item }: AddOrSaveItemDTO): void;
  saveItem({ roomId, productId, item }: AddOrSaveItemDTO): void;
  getItem({ roomId, productId, itemId }: GetItemDTO): Item | undefined;
  deleteItem({ roomId, productId, itemId }: GetItemDTO): void;
  saveClient(clientToSave: Client): void;
  saveOrCreateAddress(address: ClientAddress): void;
  getAddress(addressId: string): ClientAddress;
  deleteAddress(addressId: string): void;
}

interface RouteParamsProps {
  budgetId?: string;
}

const BudgetContext = createContext<BudgetContextData>({} as BudgetContextData);

export const BudgetProvider: React.FC = ({ children }) => {
  const route = useRoute();
  const { budgetId } = route?.params as RouteParamsProps;

  const [budget, setBudget] = useState<Budget>({} as Budget);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchBudget() {
      if (budgetId) {
        const recoveryBudget = await getBudgetFromStorage(budgetId);

        if (recoveryBudget) {
          setBudget(recoveryBudget);
        }
      } else {
        setBudget({
          id: generateID(),
          client: {
            name: '',
            cpf: '',
            email: '',
            phone: '',
            address: [],
          } as Client,
          rooms: [],
          created_at: new Date(),
        });
      }
      setLoaded(true);
    }

    if (!loaded) fetchBudget();
  }, [budgetId, budget, loaded]);

  useEffect(() => {
    function saveData() {
      saveBudgetFromStorage(budget);
    }
    if (loaded) saveData();
  }, [budgetId, budget, loaded]);

  const getRoomIndex = useCallback(
    (roomId: string) => {
      const budgetCopy = { ...budget };

      const roomIndex = budgetCopy.rooms.findIndex(room => room.id === roomId);
      if (roomIndex !== -1) {
        return roomIndex;
      }
      throw new Error('RoomIndex does not found');
    },
    [budget],
  );

  const getProductIndex = useCallback(
    (roomId: string, productId: string) => {
      const budgetCopy = { ...budget };

      const roomIndex = getRoomIndex(roomId);

      const productIndex = budgetCopy.rooms[roomIndex].products.findIndex(
        item => item.id === productId,
      );

      if (productIndex === -1) {
        throw new Error('Room does not exist');
      }

      return { roomIndex, productIndex };
    },
    [budget, getRoomIndex],
  );

  const getItemIndex = useCallback(
    (roomId: string, productId: string, itemId: string) => {
      const budgetCopy = { ...budget };

      const { roomIndex, productIndex } = getProductIndex(roomId, productId);

      const itemIndex = budgetCopy.rooms[roomIndex].products[
        productIndex
      ].items.findIndex(item => item.id === itemId);

      if (productIndex === -1) {
        throw new Error('Room does not exist');
      }

      return { roomIndex, productIndex, itemIndex };
    },
    [budget, getProductIndex],
  );

  const deleteBudget = useCallback(() => {
    deleteBudgetFromStorage(budget.id);
  }, [budget.id]);

  const createRoom = useCallback(({ name }: CreateRoomDTO) => {
    const newRoom = { id: generateID(), name, products: [] as Product[] };

    setBudget(oldBudget => {
      return { ...oldBudget, rooms: [...oldBudget.rooms, newRoom] };
    });
  }, []);

  const saveRoom = useCallback(
    (updatedRoom: Room) => {
      const budgetCopy = { ...budget };
      budgetCopy.rooms = budget.rooms.map(room =>
        room.id === updatedRoom.id ? updatedRoom : room,
      );
      setBudget(budgetCopy);
    },
    [budget],
  );

  const deleteRoom = useCallback(
    (roomToDelete: Room) => {
      const budgetCopy = { ...budget };
      budgetCopy.rooms = budget.rooms.filter(
        room => room.id !== roomToDelete.id,
      );
      setBudget(budgetCopy);
    },
    [budget],
  );

  const createProduct = useCallback(
    ({ roomId, product }: CreateProductDTO) => {
      const budgetCopy = { ...budget };

      const roomIndex = getRoomIndex(roomId);

      budgetCopy.rooms[roomIndex].products.push(product);

      setBudget(budgetCopy);
    },
    [budget, getRoomIndex],
  );

  const saveProduct = useCallback(
    ({ roomId, product }: CreateProductDTO) => {
      const budgetCopy = { ...budget };

      const { roomIndex, productIndex } = getProductIndex(roomId, product.id);

      budgetCopy.rooms[roomIndex].products[productIndex] = product;
      setBudget(budgetCopy);
    },
    [budget, getProductIndex],
  );

  const deleteProduct = useCallback(
    ({ roomId, productId }: DeleteProductDTO) => {
      const budgetCopy = { ...budget };

      const roomIndex = getRoomIndex(roomId);

      const updatedProducts = budgetCopy.rooms[roomIndex].products.filter(
        item => item.id !== productId,
      );

      budgetCopy.rooms[roomIndex].products = updatedProducts;

      setBudget(budgetCopy);
    },
    [budget, getRoomIndex],
  );

  const createItem = useCallback(
    ({ roomId, productId, item }: AddOrSaveItemDTO) => {
      const budgetCopy = { ...budget };

      const { roomIndex, productIndex } = getProductIndex(roomId, productId);

      budgetCopy.rooms[roomIndex].products[productIndex].items.push(item);

      setBudget(budgetCopy);
    },
    [budget, getProductIndex],
  );

  const saveItem = useCallback(
    ({ roomId, productId, item }: AddOrSaveItemDTO) => {
      const budgetCopy = { ...budget };

      const { roomIndex, productIndex, itemIndex } = getItemIndex(
        roomId,
        productId,
        item.id,
      );

      budgetCopy.rooms[roomIndex].products[productIndex].items[
        itemIndex
      ] = item;

      setBudget(budgetCopy);
    },
    [budget, getItemIndex],
  );

  const getItem = useCallback(
    ({ productId, roomId, itemId }: GetItemDTO) => {
      const budgetCopy = { ...budget };
      const { roomIndex, productIndex, itemIndex } = getItemIndex(
        roomId,
        productId,
        itemId,
      );
      const item =
        budgetCopy.rooms[roomIndex].products[productIndex].items[itemIndex];

      return item;
    },
    [budget, getItemIndex],
  );

  const deleteItem = useCallback(
    ({ roomId, productId, itemId }: GetItemDTO) => {
      const budgetCopy = { ...budget };

      const { roomIndex, productIndex, itemIndex } = getItemIndex(
        roomId,
        productId,
        itemId,
      );

      budgetCopy.rooms[roomIndex].products[productIndex].items.splice(
        itemIndex,
        1,
      );

      setBudget(budgetCopy);
    },
    [budget, getItemIndex],
  );

  const saveClient = useCallback(
    (clientToSave: Client) => {
      setBudget(oldBudget => ({
        ...oldBudget,
        client: { ...budget.client, ...clientToSave },
      }));
    },
    [budget.client],
  );

  const saveOrCreateAddress = useCallback(
    (address: ClientAddress) => {
      const clientCopy = { ...budget.client };
      const checkAddressExists = clientCopy.address.findIndex(
        addressFromClient => addressFromClient.id === address.id,
      );

      if (checkAddressExists === -1) {
        clientCopy.address.push(address);
      } else {
        clientCopy.address[checkAddressExists] = address;
      }
      setBudget(oldBudget => ({ ...oldBudget, client: clientCopy }));
    },
    [budget.client],
  );

  const getAddress = useCallback(
    (addressId: string): ClientAddress => {
      const clientCopy = { ...budget.client };
      const checkAddressExists = clientCopy.address.find(
        addressFromClient => addressFromClient.id === addressId,
      );

      if (!checkAddressExists) {
        throw new Error(`Invalid address id: ${addressId}`);
      }

      return checkAddressExists;
    },
    [budget.client],
  );

  const deleteAddress = useCallback(
    (addressId: string) => {
      const clientCopy = { ...budget.client };
      const checkAddressExists = clientCopy.address.filter(
        addressFromClient => addressFromClient.id !== addressId,
      );

      clientCopy.address = checkAddressExists;

      setBudget(oldBudget => ({ ...oldBudget, client: clientCopy }));
    },
    [budget.client],
  );

  return (
    <BudgetContext.Provider
      value={{
        budget,
        deleteBudget,
        createRoom,
        saveRoom,
        deleteRoom,
        createProduct,
        saveProduct,
        deleteProduct,
        createItem,
        saveItem,
        getItem,
        deleteItem,
        saveClient,
        saveOrCreateAddress,
        getAddress,
        deleteAddress,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export function useBudget(): BudgetContextData {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error('useBudget must be used within BudgetProvider');
  }

  return context;
}
