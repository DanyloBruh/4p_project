import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './DeleteConfirmModel.scss';

/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
function DeleteConfirmModel({ show, setShow, handleDelete, category }) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm the Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete
        {` ${category} `}
        from the table?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmModel;
