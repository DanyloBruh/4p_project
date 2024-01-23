/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { Placeholder } from 'react-bootstrap';
import './MenuProductPlaceholder.scss';

function MenuProductPlaceholder() {
  return (
    <div className="product-placeholder">
      {/* <img
        onClick={() => handlerSelectProduct(4322)}
        src={`data:image/png;base64,${image}`}
        alt="dumplings-bg"
      /> */}
      <div className="product-placeholder__img-placeholder" />
      <div className="product-placeholder__text">
        <h2>
          <Placeholder animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        </h2>

        <p>
          <Placeholder animation="glow">
            <Placeholder xs={2} size="lg" />
            <Placeholder xs={1} size="lg" />
          </Placeholder>
        </p>
        <p>
          <Placeholder animation="glow">
            <Placeholder xs={6} />
            <Placeholder xs={4} />
            <Placeholder xs={3} />
            <Placeholder xs={3} />
            <Placeholder xs={4} />
            <Placeholder xs={5} />
          </Placeholder>
        </p>
        <div className="btn-group">
          <Placeholder.Button variant="outline-light" sm={6} />
          <Placeholder.Button variant="outline-light" sm={6} />
        </div>
      </div>
    </div>
  );
}

export default MenuProductPlaceholder;
