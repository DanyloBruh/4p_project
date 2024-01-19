/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import './MenuProduct.scss';
import Counter from '../Counter/Counter';

function MenuProduct({
  id,
  image,
  title,
  description,
  price,
  handlerSelectProduct,
}) {
  return (
    <div
      key={id}
      className="product"
      onClick={() => handlerSelectProduct(4322)}
    >
      <img src={`data:image/png;base64,${image}`} alt="dumplings-bg" />
      <div className="product__text">
        <h2>{title}</h2>
        <p id="price">{`PRICE | ${price}$`}</p>
        <p>{description}</p>
        <div className="btn-group">
          <Counter />
          <Button variant="outline-light">add to cart</Button>
        </div>
      </div>
    </div>
  );
}

export default MenuProduct;
