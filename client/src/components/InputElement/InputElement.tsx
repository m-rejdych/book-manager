import React from 'react';
import { useField } from 'formik';
import {
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';

interface Props {
  type: string;
  name: string;
  label: string;
  validate: (value: string) => string | undefined;
}

const InputElement: React.FC<Props> = ({ label, ...props }) => {
  const [field, { touched, error }] = useField(props);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input isInvalid={!!(error && touched)} size="lg" isRequired {...field} />
      <FormHelperText color="red.600">
        {touched && error ? error : ' '}
      </FormHelperText>
    </FormControl>
  );
};

export default InputElement;
