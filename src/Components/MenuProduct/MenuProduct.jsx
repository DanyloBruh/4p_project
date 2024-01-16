/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import ProductImage from '../../Assets/product1.jpg';
import './MenuProduct.scss';
import Counter from '../Counter/Counter';

function MenuProduct({ handlerSelectProduct }) {
  return (
    <div className="product" onClick={() => handlerSelectProduct(4322)}>
      <img src={ProductImage} alt="" />
      <div className="product__text">
        <h2>Ukrainian varenyky</h2>
        <p id="price">PRICE | 20$</p>
        <p>
          There are firewood and water present, if there were cheese and flour,
          I would make varenyky!
        </p>
        <div className="btn-group">
          <Counter />
          <Button variant="outline-light">add to cart</Button>
        </div>
      </div>
    </div>
  );
}

export default MenuProduct;
