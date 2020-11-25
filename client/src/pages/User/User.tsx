import React from 'react';
import {
  Box,
  Text,
  CircularProgress,
  Center,
  HStack,
  Stack,
  Flex,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useReactiveVar } from '@apollo/client';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';

import Card from '../../components/Card';
import AddBookModal from '../../components/AddBookModal';
import { userVar } from '../../graphql/reactiveVariables';
import { useUserQuery } from '../../generated/graphql';

const User: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, loading } = useUserQuery({ variables: { id: userId } });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useReactiveVar(userVar);

  const isMe = user?.id === userId;

  return (
    <Box minH="100vh" p={8}>
      {loading ? (
        <Center height="100%">
          <CircularProgress isIndeterminate color="teal" />
        </Center>
      ) : (
        <Stack spacing={6}>
          <Flex justify="space-between" align="center">
            <Text fontSize={48}>{data?.user.fullName}</Text>
            {isMe && (
              <Button onClick={onOpen} mr={10}>
                Add book
              </Button>
            )}
          </Flex>
          <HStack spacing={3}>
            <Card>
              {data?.user.books.map(
                ({ title, description, author, isRead, category }) => (
                  <>
                    <Box>
                      <Text fontSize={32} mb={1}>
                        {title}
                      </Text>
                      <Text fontSize={16}>{author}</Text>
                    </Box>
                    {description && <Text fontSize={24}>{description}</Text>}
                    <HStack spacing={2}>
                      <Text fontSize={16}>Is read:</Text>
                      {isRead ? (
                        <CheckIcon color="green.400" />
                      ) : (
                        <CloseIcon color="red.400" />
                      )}
                    </HStack>
                    <Text fontSize={24}>Category: {category.name}</Text>
                  </>
                ),
              )}
            </Card>
          </HStack>
          <AddBookModal isOpen={isOpen} onClose={onClose} />
        </Stack>
      )}
    </Box>
  );
};

export default User;
