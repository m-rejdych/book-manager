import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import AddBookForm from '../AddBookForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Add book</ModalHeader>
      <ModalOverlay />
      <ModalBody>
        <ModalContent p={8}>
          <AddBookForm />
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default AddBookModal;
