/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import './Order.scss';

import Counter from '../Counter/Counter';

function Product({
  product, count, incCount, decCount, deleteProduct,
}) {
  return (
    <div className="order__product">
      <img
        className="order__product__img"
        src={`data:image/png;base64,${product.Image.imageData}`}
        alt={product.Image.imageName}
      />
      <div className="order__product__group">
        <div className="order__product__nameCount">
          <div className="order__product__textGroup">
            <span className="order__product__text order__product__name">{`| ${product.name} |`}</span>
            <span className="order__product__text">
              {`${product.price * count}£`}
            </span>
          </div>
          <div
            className="order__product__cross"
            onClick={() => deleteProduct(product.id)}
          />
        </div>
        <Counter
          count={count}
          incr={incCount}
          decr={decCount}
          id={product.id}
        />
      </div>
    </div>
  );
}

export default Product;
