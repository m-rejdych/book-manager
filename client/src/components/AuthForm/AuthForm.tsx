import React from 'react';
import { Formik, Form } from 'formik';
import { useLocation, useHistory } from 'react-router-dom';
import { VStack, Button, Text } from '@chakra-ui/react';

import InputElement from '../InputElement';
import {
  useRegisterMutation,
  useLoginMutation,
  RegisterInput,
  LoginInput,
} from '../../generated/graphql';
import { userVar } from '../../graphql/reactiveVariables';

const AuthForm: React.FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [register, { loading: registerLoading }] = useRegisterMutation();
  const [login, { loading: loginLoading }] = useLoginMutation();

  const isLoggingIn = pathname === '/login';

  const initialValues = isLoggingIn
    ? {
        email: '',
        password: '',
      }
    : {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      };

  const fields = [
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (
          !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value,
          )
        )
          errorMessage = 'Enter a valid email!';

        return errorMessage;
      },
    },
    {
      type: 'passowrd',
      name: 'password',
      label: 'Password',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (!/^(?=.*\d).{4,8}$/.test(value))
          errorMessage =
            'Password should include a digit and contain at least 4 characters!';

        return errorMessage;
      },
    },
    {
      type: 'text',
      name: 'firstName',
      label: 'First name',
      hidden: isLoggingIn,
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (value.trim().length === 0)
          errorMessage = 'First name can not be empty!';

        return errorMessage;
      },
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last name',
      hidden: isLoggingIn,
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (value.trim().length === 0)
          errorMessage = 'Last name can not be empty!';

        return errorMessage;
      },
    },
  ];

  const handleSubmit = async (
    values: LoginInput | RegisterInput,
  ): Promise<void> => {
    if (isLoggingIn) {
      const response = await login({
        variables: { data: values as LoginInput },
      });
      if (response.data) {
        const { token, user } = response.data.login;
        userVar(user);
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', (Date.now() + 3600000).toString());
      }
    } else {
      const response = await register({
        variables: { data: values as RegisterInput },
      });
      if (response.data) {
        const { token, user } = response.data.register;
        userVar(user);
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', (Date.now() + 3600000).toString());
      }
    }
  };

  const handleSwitch = (handleReset: () => void): void => {
    handleReset();
    if (isLoggingIn) history.push('/register');
    else history.push('/login');
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ handleReset, dirty, isValid }) => (
        <Form>
          <VStack h="100%" minW={450} spacing={4}>
            {fields
              .filter(({ hidden }) => !hidden)
              .map((field) => (
                <InputElement key={field.name} {...field} />
              ))}
            <VStack spacing={2} alignSelf="flex-start">
              <Button
                alignSelf="flex-start"
                colorScheme="teal"
                isDisabled={!dirty || !isValid}
                isLoading={loginLoading || registerLoading}
                type="submit"
              >
                {isLoggingIn ? 'Login' : 'Register'}
              </Button>
              <Text
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
                fontSize="xs"
                onClick={() => handleSwitch(handleReset)}
              >
                {isLoggingIn
                  ? "Don't have an account? Register!"
                  : 'Already have an account? Login!'}
              </Text>
            </VStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
