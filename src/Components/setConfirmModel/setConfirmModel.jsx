/* eslint-disable import/prefer-default-export */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { confirmable, createConfirmation } from 'react-confirm';
import { Button, Modal } from 'react-bootstrap';
import './setConfirmModel.scss';

/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
function ComplexConfirmation({
  title, show, proceed, dismiss, cancel, message, variant1, variant2,
}) {
  const handleOnClick = (index) => () => {
    proceed({
      button: index,
    });
  };

  return (
    <Modal
      animation={false}
      show={show}
      onHide={dismiss}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={cancel}>Cancel</Button>
        <Button
          className="button-l"
          bsStyle="primary"
          onClick={handleOnClick(variant1)}
        >
          {variant1}
        </Button>
        <Button
          className="button-l"
          bsStyle="primary"
          onClick={handleOnClick(variant2)}
        >
          {variant2}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export const confirm = createConfirmation(confirmable(ComplexConfirmation));
