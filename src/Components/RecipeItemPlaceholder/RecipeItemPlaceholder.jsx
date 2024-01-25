/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { Placeholder } from 'react-bootstrap';
import './RecipeItemPlaceholder.scss';

function RecipeItemPlaceholder() {
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
            <Placeholder xs={3} />
          </Placeholder>
        </h2>
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

        <Placeholder.Button variant="outline-light" />
      </div>
    </div>
  );
}

export default RecipeItemPlaceholder;
