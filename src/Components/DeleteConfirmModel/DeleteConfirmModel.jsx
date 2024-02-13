import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { confirmable, createConfirmation } from 'react-confirm';
import { Button, Modal } from 'react-bootstrap';
import './DeleteConfirmModel.scss';

/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
function Confirmation({
  okLabel = 'OK',
  cancelLabel = 'Cancel',
  title = 'Confirmation',
  confirmation,
  show,
  proceed,
  enableEscape = true,
}) {
  return (
    <Modal
      animation={false}
      show={show}
      onHide={() => proceed(false)}
      backdrop={enableEscape ? true : 'static'}
      keyboard={enableEscape}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {confirmation}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => proceed(false)}>{cancelLabel}</Button>
        <Button
          className="button-l"
          bsStyle="primary"
          onClick={() => proceed(true)}
        >
          {okLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function confirm(
  confirmation,
  proceedLabel = 'OK',
  cancelLabel = 'cancel',
  options = {},
) {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
}
