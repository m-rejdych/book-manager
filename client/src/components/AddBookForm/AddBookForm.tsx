import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Checkbox, FormLabel, FormControl, Button } from '@chakra-ui/react';

import InputElement from '../InputElement';
import { useCreateBookMutation } from '../../generated/graphql';

const AddBookForm: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [createBook] = useCreateBookMutation();

  const initialValues = {
    title: '',
    author: '',
    description: '',
    isRead: false,
    category: '',
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
    const response = await createBook({ variables: { data: values } });
    console.log(response);
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
      {({ setFieldValue }) => (
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
          <Button type="submit" colorScheme="teal">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddBookForm;
