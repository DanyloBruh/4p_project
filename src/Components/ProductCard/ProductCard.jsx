/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import './ProductCard.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import Counter from '../Counter/Counter';
import { addOrderData, setVisible } from '../../redux/orderDataSlice';

function ProductCard({ data }) {
  const ref = useRef();
  const navigate = useNavigate();
  const routeChange = () => {
    const path = '/';
    navigate(path);
  };
  const [count, setCount] = useState(1);
  const dispath = useDispatch();

  const incCount = () => {
    setCount((current) => current + 1);
  };

  const decCount = () => {
    setCount((current) => current - 1);
  };

  const handleReduxAdd = () => {
    dispath(
      addOrderData({
        product: data,
        count,
      }),
    );
    setCount(1);
  };

  const handleSetVisible = () => {
    dispath(
      addOrderData({
        product: data,
        count,
      }),
    );
    setCount(1);
    dispath(setVisible(true));
    routeChange();
  };

  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      routeChange();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
  return (
    <div className="product-modal">
      <div className="product-modal__card" ref={ref}>
        <button
          type="button"
          className="product-modal__card__close"
          onClick={() => routeChange()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <path
              d="M39.1654 35.9052C39.6408 36.4195 39.8987 37.0978 39.8851 37.7979C39.8715 38.4981 39.5874 39.1659 39.0924 39.6612C38.5973 40.1566 37.9298 40.4411 37.2296 40.4552C36.5294 40.4693 35.851 40.2119 35.3364 39.7368L24.9996 29.4L14.6627 39.7368C14.415 40.0048 14.1157 40.22 13.7827 40.3695C13.4497 40.519 13.09 40.5997 12.7251 40.6068C12.3602 40.6139 11.9976 40.5473 11.6591 40.4108C11.3206 40.2744 11.0131 40.071 10.7552 39.8128C10.4972 39.5546 10.294 39.247 10.1578 38.9084C10.0215 38.5698 9.95512 38.2072 9.96246 37.8423C9.96981 37.4774 10.0508 37.1177 10.2005 36.7849C10.3502 36.452 10.5656 36.1528 10.8338 35.9052L21.1706 25.5684L10.8338 15.2368C10.5656 14.9893 10.3502 14.6901 10.2005 14.3572C10.0508 14.0244 9.96981 13.6647 9.96246 13.2998C9.95512 12.9349 10.0215 12.5723 10.1578 12.2337C10.294 11.8951 10.4972 11.5874 10.7552 11.3293C11.0131 11.0711 11.3206 10.8677 11.6591 10.7313C11.9976 10.5948 12.3602 10.5281 12.7251 10.5352C13.09 10.5423 13.4497 10.6231 13.7827 10.7726C14.1157 10.922 14.415 11.1373 14.6627 11.4052L24.9996 21.7395L35.3364 11.4026C35.851 10.9276 36.5294 10.6701 37.2296 10.6842C37.9298 10.6983 38.5973 10.9828 39.0924 11.4782C39.5874 11.9736 39.8715 12.6413 39.8851 13.3415C39.8987 14.0417 39.6408 14.72 39.1654 15.2342L28.8285 25.5684L39.1654 35.9052Z"
              fill="#8D8D8D"
            />
          </svg>
        </button>
        <Row>
          <Col xxl={7} xl={6} sm={5}>
            <img
              className="product-modal__card__img"
              src={`data:image/png;base64,${data?.Image.imageData}`}
              alt={data?.Image.imageName}
            />
          </Col>
          <Col
            xxl={5}
            xl={6}
            sm={7}
            className="product-modal__card__description"
          >
            <h2 className="product-modal__card__title">{data?.name}</h2>
            <p className="product-modal__card__mass">{`${data?.weight} G`}</p>
            <p className="product-modal__card__text">
              {/* <span>Dough: </span> */}
              {data?.ingredients}
            </p>
            {/* <p className="product-modal__card__text">
              <span>Filling: </span>
              potatoes, butter, sauteed onion, fresh dill, salt, pepper
            </p> */}
            <div className="product-modal__card__one-line">
              <p className="product-modal__card__price">{`PRICE | ${data?.price}£`}</p>
              <Counter count={count} decr={decCount} incr={incCount} />
            </div>
            <div className="product-modal__card__one-line">
              <Button variant="outline-light" onClick={handleSetVisible}>by in one click</Button>
              <Button variant="outline-light" onClick={handleReduxAdd}>add to cart</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProductCard;
