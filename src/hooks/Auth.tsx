import React, { createContext, useCallback, useState, useContext } from 'react';

interface AuthContextData {
  user: boolean;
  signIn(): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(false);

  const signIn = useCallback(() => {
    setUser(true);
  }, []);

  const signOut = useCallback(() => {
    setUser(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
