import React, { useCallback } from 'react';

import SignUpView from './SignUpView';

const SignUpController: React.FC = () => {
  const handleSubmit = useCallback((data: { [key: string]: string }) => {
    console.log(data);
  }, []);

  return <SignUpView handleSubmitCreateAccount={handleSubmit} />;
};

export default SignUpController;
