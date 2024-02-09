/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './MenuProduct.scss';
import Counter from '../Counter/Counter';
import { addOrderData } from '../../redux/orderDataSlice';

function MenuProduct({ product }) {
  const [count, setCount] = useState(1);
  const dispath = useDispatch();

  const incCount = () => {
    setCount((current) => current + 1);
  };

  const decCount = () => {
    if (count === 1) {
      return;
    }
    setCount((current) => current - 1);
  };

  const handleReduxAdd = () => {
    dispath(
      addOrderData({
        product,
        count,
      }),
    );
    setCount(1);
  };

  return (
    <div key={product.id} className="product">
      <Link to={`/${product.id}`}>
        <img
          src={`data:image/png;base64,${product.Image.imageData}`}
          alt={product.Image.imageName}
        />
      </Link>
      <div className="product__text">
        <h2>{product.name}</h2>
        <p id="price">{`PRICE | ${product.price}$`}</p>
        <p>{product.description}</p>
        <div className="btn-group">
          <Counter count={count} decr={decCount} incr={incCount} />
          <Button variant="outline-light" onClick={handleReduxAdd}>
            add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MenuProduct;
