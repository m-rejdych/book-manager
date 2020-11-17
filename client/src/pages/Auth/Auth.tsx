import React from 'react';
import { Center } from '@chakra-ui/react';

import AuthForm from '../../components/AuthForm';

const Auth: React.FC = () => {
  return (
    <Center height="100vh" width="100vw">
      <AuthForm />
    </Center>
  );
};

export default Auth;
