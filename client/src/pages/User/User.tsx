import React, { useEffect, useState } from 'react';
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
import { userVar, booksVar } from '../../graphql/reactiveVariables';
import {
  useUserQuery,
  UpdateBookInput,
  useDeleteBookMutation,
} from '../../generated/graphql';

const User: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<null | UpdateBookInput>(null);
  const { userId } = useParams<{ userId: string }>();
  const { data, loading } = useUserQuery({ variables: { id: userId } });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useReactiveVar(userVar);
  const books = useReactiveVar(booksVar);
  const [deleteBook] = useDeleteBookMutation();

  useEffect(() => {
    if (data) {
      const {
        user: { books },
      } = data;
      booksVar(books);
    }
  }, [data]);

  const isMe = user?.id === userId;

  const handleStartEditing = (data: UpdateBookInput): void => {
    onOpen();
    setIsEditing(true);
    setEditData(data);
  };

  const handleClose = (): void => {
    onClose();
    if (isEditing) setIsEditing(false);
    if (editData) setEditData(null);
  };

  const handleDeleteBook = async (id: string): Promise<void> => {
    const response = await deleteBook({ variables: { bookId: id } });
    if (response.data) {
      const { deleteBook: bookId } = response.data;
      booksVar(books.filter(({ id }) => id !== bookId));
    }
  };

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
          <HStack spacing={3} wrap="wrap">
            {books.map(
              ({ title, description, author, isRead, category, id }) => (
                <Card key={title}>
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
                  <HStack spacing={4}>
                    <Button
                      onClick={(): void =>
                        handleStartEditing({
                          title,
                          description,
                          author,
                          isRead,
                          category: category.name,
                          bookId: id,
                        })
                      }
                      colorScheme="teal"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteBook(id)}
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </HStack>
                </Card>
              ),
            )}
          </HStack>
          <AddBookModal
            isOpen={isOpen}
            onClose={handleClose}
            isEditing={isEditing}
            editData={editData}
          />
        </Stack>
      )}
    </Box>
  );
};

export default User;
