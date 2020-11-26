import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useReactiveVar, useApolloClient } from '@apollo/client';
import { Center, Text, Button, HStack, Input, Box } from '@chakra-ui/react';

import Card from '../../components/Card';
import UsersList from '../../components/UsersList';
import { useUsersQuery } from '../../generated/graphql';
import { userVar, booksVar } from '../../graphql/reactiveVariables';

interface User {
  id: string;
  fullName: string;
}

const Home: React.FC = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { data } = useUsersQuery();
  const user = useReactiveVar(userVar);
  const history = useHistory();
  const client = useApolloClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const filterUsers = (): User[] => {
    return (
      data?.users.filter(({ fullName }) =>
        fullName.toLowerCase().includes(value.toLowerCase()),
      ) || []
    );
  };

  const handleLogout = (): void => {
    userVar(null);
    booksVar([]);
    localStorage.clear();
    client.clearStore();
  };

  return (
    <Center h="100vh" position="relative">
      <HStack spacing={6} h="100%">
        <Card>
          <Text fontSize="4xl" fontWeight={500}>
            My shelfbook
          </Text>
          <Text fontSize="xl">
            A place to store your{' '}
            <Text as="span" fontSize="xl" color="darkmagenta">
              books
            </Text>
          </Text>
          <Button
            onClick={() => history.push(`/user/${user!.id}`)}
            colorScheme="teal"
          >
            See your books
          </Button>
        </Card>
        <Card>
          <Text fontSize="4xl" fontWeight={500}>
            Find others
          </Text>
          <Text fontSize="xl">
            Find inspiration from{' '}
            <Text
              as="span"
              display="inline-block"
              fontSize="xl"
              color="darkmagenta"
            >
              users
            </Text>
          </Text>
          <Box position="relative">
            <Input
              onChange={handleChange}
              onFocus={(): void => setIsFocused(true)}
              onBlur={(): void => setIsFocused(false)}
              value={value}
              placeholder="User name"
            />
            {isFocused && value.length > 0 && filterUsers().length > 0 && (
              <UsersList users={filterUsers()} />
            )}
          </Box>
        </Card>
        <Button onClick={handleLogout} position="absolute" top={10} left={10}>
          Logout
        </Button>
      </HStack>
    </Center>
  );
};

export default Home;
