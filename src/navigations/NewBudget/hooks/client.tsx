import React, { useContext, useState, createContext } from 'react';
import Client from '@dtos/Client';

interface ClientContextData {
  client: Client;
}

const ClientContext = createContext<ClientContextData>({} as ClientContextData);

export const ClientProvider: React.FC = ({ children }) => {
  const [client, setClient] = useState({} as Client);

  return (
    <ClientContext.Provider value={{ client }}>
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
