import React, { useContext, useState, createContext, useCallback } from 'react';
import Client from '@dtos/Client';

interface ClientContextData {
  client: Client;
  saveClient(toSaveClient: Client): void;
}

const ClientContext = createContext<ClientContextData>({} as ClientContextData);

export const ClientProvider: React.FC = ({ children }) => {
  const [client, setClient] = useState({
    name: '',
    cpf: '',
    phone: '',
    address: [],
    email: '',
  } as Client);

  const saveClient = useCallback((toSaveClient: Client) => {
    setClient(toSaveClient);
  }, []);

  return (
    <ClientContext.Provider value={{ client, saveClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export function useClient(): ClientContextData {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error('useClient must be used within ClientProvider');
  }

  return context;
}
