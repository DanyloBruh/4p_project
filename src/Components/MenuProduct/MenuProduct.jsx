/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';
import ProductImage from '../../Assets/product1.jpg';
import './MenuProduct.scss';
import Counter from '../Counter/Counter';

function MenuProduct({ handlerSelectProduct }) {
  return (
    <div>
      <Card className="product" onClick={() => handlerSelectProduct(4322)}>
        <Card.Img variant="top" src={ProductImage} />
        <Card.Body>
          <Card.Title>Ukrainian varenyky</Card.Title>
          <Card.Text className="product-price">PRICE | 20$</Card.Text>
          <Card.Text>
            There are firewood and water present, if there were cheese and
            flour, I would make varenyky!
          </Card.Text>
          <div className="btn-group">
            <Counter />
            <button type="button" className="product-btn">
              add to cart
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MenuProduct;
