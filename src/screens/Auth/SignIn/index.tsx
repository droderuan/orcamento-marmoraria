import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/Auth';

import SignInView from './SignInView';

const SignInController: React.FC = () => {
  const { navigate } = useNavigation();
  const { signInWithGoogle } = useAuth();

  const handleSubmit = useCallback((data: { [key: string]: string }) => {
    console.log(data);
  }, []);

  const navigateToSignUp = useCallback(() => navigate('SignUp'), [navigate]);

  return (
    <SignInView
      handleSubmit={handleSubmit}
      handleSignInWithGoogle={signInWithGoogle}
      navigateToSignUp={navigateToSignUp}
    />
  );
};

export default SignInController;
