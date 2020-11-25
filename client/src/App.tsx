import React, { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import {
  ChakraProvider,
  Box,
  theme,
  CircularProgress,
  Center,
} from '@chakra-ui/react';
import ColorModeSwitcher from './components/ColorModeSwitcher';
import { Route, Redirect, Switch } from 'react-router-dom';

import Auth from './pages/Auth';
import Home from './pages/Home';
import User from './pages/User';
import { useUserLazyQuery } from './generated/graphql';
import { userVar } from './graphql/reactiveVariables';

const App: React.FC = () => {
  const user = useReactiveVar(userVar);
  const [userQuery, { data, loading }] = useUserLazyQuery();

  useEffect(() => {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn && Number(expiresIn) - Date.now() < 0) {
      return localStorage.clear();
    }

    const token = localStorage.getItem('token');
    if (token) userQuery();
  }, []);

  if (data?.user && !user?.id) userVar(data?.user);

  const routes = user?.id ? (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/user/:userId" component={User} />
      <Redirect to="/home" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/register" component={Auth} />
      <Route path="/login" component={Auth} />
      <Redirect to="/register" />
    </Switch>
  );

  return (
    <ChakraProvider theme={theme} resetCSS>
      <Box position="relative" minH="100vh">
        <ColorModeSwitcher position="absolute" top={3} right={3} />
        {loading ? (
          <Center h="100vh" w="100vw">
            <CircularProgress isIndeterminate size={300} color="teal.400" />
          </Center>
        ) : (
          routes
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App;
