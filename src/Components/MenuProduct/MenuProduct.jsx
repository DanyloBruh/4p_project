/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './MenuProduct.scss';
import Counter from '../Counter/Counter';

function MenuProduct({
  id, image, title, description, price,
}) {
  return (
    <div key={id} className="product">
      <Link to={`/${id}`}>
        <img src={`data:image/png;base64,${image}`} alt="dumplings-bg" />
      </Link>
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
