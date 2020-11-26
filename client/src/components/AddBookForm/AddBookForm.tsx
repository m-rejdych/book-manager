import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Checkbox, FormLabel, FormControl, Button } from '@chakra-ui/react';
import { useReactiveVar } from '@apollo/client';

import InputElement from '../InputElement';
import {
  useCreateBookMutation,
  UpdateBookInput,
  useUpdateBookMutation,
} from '../../generated/graphql';
import { booksVar } from '../../graphql/reactiveVariables';

interface Props {
  onClose: () => void;
  isEditing?: boolean;
  editData?: UpdateBookInput | null;
}

const AddBookForm: React.FC<Props> = ({ onClose, isEditing, editData }) => {
  const [isChecked, setIsChecked] = useState(editData?.isRead || false);
  const [createBook, { loading: createLoading }] = useCreateBookMutation();
  const [updateBook, { loading: updateLoading }] = useUpdateBookMutation();
  const books = useReactiveVar(booksVar);

  const initialValues = {
    title: editData?.title || '',
    author: editData?.author || '',
    description: editData?.description || '',
    isRead: editData?.isRead || false,
    category: editData?.category || '',
  };

  const fields = [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (!value.trim()) errorMessage = 'Title can not be empty!';
        return errorMessage;
      },
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (!value.trim()) errorMessage = 'Author can not be empty!';
        return errorMessage;
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (!value.trim()) errorMessage = 'Description can not be empty!';
        return errorMessage;
      },
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (!value.trim()) errorMessage = 'Category can not be empty!';
        return errorMessage;
      },
    },
  ];

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    if (isEditing) {
      const response = await updateBook({
        variables: { data: { ...values, bookId: editData!.bookId } },
      });
      if (response.data) {
        const { updateBook: book } = response.data;
        booksVar(books.map((b) => (b.id === book.id ? book : b)));
        onClose();
      }
    } else {
      const response = await createBook({ variables: { data: values } });
      if (response.data) {
        const { createBook: book } = response.data;
        booksVar([...books, book]);
        onClose();
      }
    }
  };

  const toggleCheck = (
    setFieldValue: (field: string, value: boolean) => void,
  ): void => {
    setIsChecked((prev) => {
      setFieldValue('isRead', !prev);
      return !prev;
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, dirty, isValid }) => (
        <Form>
          {fields.map((field) => (
            <InputElement key={field.name} {...field} />
          ))}
          <FormControl display="flex" alignItems="center">
            <FormLabel>Is read</FormLabel>
            <Checkbox
              isChecked={isChecked}
              onChange={(): void => toggleCheck(setFieldValue)}
            />
          </FormControl>
          <Button
            disabled={!isValid || !dirty}
            type="submit"
            colorScheme="teal"
            isLoading={updateLoading || createLoading}
          >
            {isEditing ? 'Edit' : 'Add'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddBookForm;
