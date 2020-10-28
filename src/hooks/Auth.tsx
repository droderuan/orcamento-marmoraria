import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import auth from '@react-native-firebase/auth';
import { onGoogleButtonPress } from '@services/AuthFirebase';
import { saveUser, deleteUser } from '@services/Storage';

interface AuthContextData {
  user: any;
  initializing: boolean;
  signIn(): void;
  signOut(): void;
  signInWithGoogle(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<{} | null>(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = useCallback(
    authUser => {
      setUser(authUser);
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  const signIn = useCallback(() => {}, []);

  const signInWithGoogle = useCallback(async () => {
    const { user: responseUser } = await onGoogleButtonPress();
    setUser(responseUser);
  }, []);

  const signOut = useCallback(() => {
    auth().signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, initializing, signIn, signOut, signInWithGoogle }}
    >
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
