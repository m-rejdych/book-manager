import React from 'react';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

import AddBookForm from '../AddBookForm';
import { UpdateBookInput } from '../../generated/graphql';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
  editData?: UpdateBookInput | null;
}

const AddBookModal: React.FC<Props> = ({
  isOpen,
  onClose,
  isEditing,
  editData,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalBody>
        <ModalContent p={8}>
          <AddBookForm
            onClose={onClose}
            isEditing={isEditing}
            editData={editData}
          />
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default AddBookModal;
