import React, { ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface GenericModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  body: string | ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({
  show,
  onHide,
  title,
  body
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GenericModal;
