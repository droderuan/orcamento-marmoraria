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
  roomsInBudget: Room[];
  client: Client;
  deleteBudget(): void;
  saveRoom(updatedRoom: Room): void;
  createRoom({ name }: CreateRoomDTO): void;
  deleteRoom(roomToDelete: Room): void;
  createProduct({ roomId, product }: CreateProductDTO): void;
  saveProduct({ roomId, product }: CreateProductDTO): void;
  deleteProduct({ roomId, productId }: DeleteProductDTO): void;
  addOrSaveItem({ roomId, productId, item }: AddOrSaveItemDTO): void;
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
  const [roomsInBudget, setRoomsInBudget] = useState<Room[]>([]);
  const [client, setClient] = useState({} as Client);

  const [budget, setBudget] = useState<Budget>({} as Budget);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchBudget() {
      if (budgetId) {
        console.log(budgetId);
        const recoveryBudget = await getBudgetFromStorage(budgetId);

        if (recoveryBudget) {
          setBudget(recoveryBudget);
          setRoomsInBudget(recoveryBudget.rooms);
          setClient(recoveryBudget.client);
        }
      } else {
        setBudget({ id: generateID(), client: {} as Client, rooms: [] });
        console.log('passou pelo budget');
        setRoomsInBudget([]);
        console.log('passou pelo room');
        setClient({
          name: '',
          cpf: '',
          phone: '',
          address: [],
          email: '',
        } as Client);
        console.log('passou pelo client');
      }
      setLoaded(true);
    }

    if (!loaded) fetchBudget();
  }, [budgetId, budget, client, roomsInBudget, loaded]);

  useEffect(() => {
    function saveData() {
      const parsedBudget = {
        ...budget,
        client,
        rooms: roomsInBudget,
      } as Budget;
      saveBudgetFromStorage(parsedBudget);
    }
    if (loaded) saveData();
  }, [budgetId, budget, roomsInBudget, client, loaded]);

  const deleteBudget = useCallback(() => {
    deleteBudgetFromStorage(budget.id);
  }, [budget.id]);

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
      const roomsCopy = [...roomsInBudget];
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
      const roomsCopy = [...roomsInBudget];
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

  const addOrSaveItem = useCallback(
    ({ roomId, productId, item }: AddOrSaveItemDTO) => {
      const roomsCopy = [...roomsInBudget];
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
  const deleteItem = useCallback(
    ({ roomId, productId, itemId }: GetItemDTO) => {
      const roomsCopy = [...roomsInBudget];
      const roomIndex = roomsCopy.findIndex(room => room.id === roomId);

      if (roomIndex === -1) {
        throw new Error(`Room with id ${roomId} was not find`);
      }

      const roomToSaveProduct = { ...roomsCopy[roomIndex] };
      const productIndex = roomToSaveProduct.products.findIndex(
        product => product.id === productId,
      );

      if (productIndex === -1) {
        throw new Error(`Product with id ${productId} was not find`);
      }

      const productToUpdate = roomToSaveProduct.products[productIndex];

      const updatedItemsProduct = productToUpdate.items.filter(
        itemToFind => itemToFind.id !== itemId,
      );

      productToUpdate.items = [...updatedItemsProduct];
      roomToSaveProduct.products[productIndex] = productToUpdate;

      roomsCopy[roomIndex] = roomToSaveProduct;
      setRoomsInBudget(roomsCopy);
    },
    [roomsInBudget],
  );

  const saveClient = useCallback((clientToSave: Client) => {
    setClient(clientToSave);
  }, []);

  const saveOrCreateAddress = useCallback(
    (address: ClientAddress) => {
      const clientCopy = { ...client };
      const checkAddressExists = clientCopy.address.findIndex(
        addressFromClient => addressFromClient.id === address.id,
      );

      if (checkAddressExists === -1) {
        clientCopy.address.push(address);
      } else {
        clientCopy.address[checkAddressExists] = address;
      }
      setClient(clientCopy);
    },
    [client],
  );

  const getAddress = useCallback(
    (addressId: string): ClientAddress => {
      const clientCopy = { ...client };
      const checkAddressExists = clientCopy.address.find(
        addressFromClient => addressFromClient.id === addressId,
      );

      if (!checkAddressExists) {
        throw new Error(`Invalid address id: ${addressId}`);
      }

      return checkAddressExists;
    },
    [client],
  );

  const deleteAddress = useCallback(
    (addressId: string) => {
      const clientCopy = { ...client };
      const checkAddressExists = clientCopy.address.filter(
        addressFromClient => addressFromClient.id !== addressId,
      );

      clientCopy.address = checkAddressExists;

      setClient(clientCopy);
    },
    [client],
  );

  return (
    <BudgetContext.Provider
      value={{
        budget,
        roomsInBudget,
        client,
        deleteBudget,
        createRoom,
        saveRoom,
        deleteRoom,
        createProduct,
        saveProduct,
        deleteProduct,
        addOrSaveItem,
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
