/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';

const DangerModal = props => {
  const { handleClose } = props;

  const defaultActions = [
    {
      text: 'Aceptar',
      variant: 'danger',
      onClick: handleClose,
    },
    {
      text: 'Cancelar',
      variant: 'default',
      onClick: handleClose,
    },
  ];

  const {
    title = 'Advertencia',
    content = '¿Desea eliminar el registro?',
    actions = defaultActions,
    show,
  } = props;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
        {actions.map(action => (
          <Button
            variant={action.variant}
            onClick={action.onClick}
            key={`modal-${action.text}`}
          >
            {action.text}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default DangerModal;
