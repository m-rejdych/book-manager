import React, { Fragment } from 'react';
import { List, ListItem, useColorMode, Divider } from '@chakra-ui/react';

interface User {
  id: string;
  fullName: string;
}

interface Props {
  users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
  const { colorMode } = useColorMode();

  return (
    <List
      position="absolute"
      top="100%"
      left={2}
      right={2}
      p={4}
      maxH={200}
      overflowY="auto"
      bgColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      boxShadow="0 3px 7px #000"
      borderRadius="0 0 10px 10px"
      onMouseDown={(e): void => e.preventDefault()}
    >
      {users.map(({ id, fullName }, index) => (
        <Fragment key={id}>
          <ListItem
            _hover={{
              bgColor: colorMode === 'light' ? 'gray.300' : 'gray.600',
            }}
            cursor="pointer"
            p={1}
          >
            {fullName}
          </ListItem>
          {index !== users.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  );
};

export default UsersList;
