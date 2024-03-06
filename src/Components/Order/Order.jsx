/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import './Order.scss';
import { PostcodeLookup } from '@ideal-postcodes/postcode-lookup';
import {
  Button, FloatingLabel, Form, InputGroup,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Link, useLocation } from 'react-router-dom';
import Product from './product';
import { orderComplite } from '../../Helper/requests';
import { deleteOrderData } from '../../redux/orderDataSlice';
import ToastNotification from '../Toast/Toast';
import { offScroll } from '../../redux/scrollSlice';

const regexes = {
  regexPostcode: /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i,
  regexPhone:
    /\s*(([+](\s?\d)([-\s]?\d)|0)?(\s?\d)([-\s]?\d){9}|[(](\s?\d)([-\s]?\d)+\s*[)]([-\s]?\d)+)\s*/,
};

function Order({
  setOrderVisibleFalse,
  productDedux,
  deleteProduct,
  incCount,
  decCount,
}) {
  const [products, setProducts] = useState([]);
  // const [addressFinder, setAddressFinder] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const location = useLocation();
  const schema = useMemo(() => (
    Yup.object().shape({
      name: Yup.string()
        .min(2, 'Name must be minimum 2')
        .max(100, 'Name must not be more than 100 characters')
        .required('Name is required'),
      phone: Yup.string()
        .required('Phone is required')
        .matches(regexes.regexPhone, 'Phone number is not valid'),
      postcode: Yup.string()
        .required('Postcode is required')
        .matches(regexes.regexPostcode, 'Postcode number is not valid'),
      addressLine1: Yup.string().required(),
      addressLine2: Yup.string(),
      addressLine3: Yup.string(),
      town: Yup.string().required(),
      terms: Yup.bool().required().oneOf([true], 'Terms must be accepted'),
      payment: Yup.string()
        .required('required')
        .oneOf(['card', 'cash'], 'required'),
    })
  ), []);
  const dispath = useDispatch();

  useEffect(() => {
    PostcodeLookup.setup({
      apiKey: process.env.POSTCODE_API_KEY,
      context: '#lookup_field',
      input: '#postcode_input',
      button: '#postcode_button',
      outputFields: {
        line_1: '#line_1',
        line_2: '#line_2',
        line_3: '#line_3',
        post_town: '#post_town',
        postcode: '#postcode',
      },
    });
  }, []);

  useEffect(() => {
    setProducts(productDedux);
  }, [productDedux]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    setOrderVisibleFalse();
  }, [location]);

  const handleHideOrder = (event) => {
    if (event.target === event.currentTarget) {
      setOrderVisibleFalse();
    }
  };

  const getTotalAmount = useCallback(() => {
    if (products.length) {
      return products.reduce(
        (pre, curr) => pre + +curr.product.price * curr.count,
        0,
      );
    }

    return '0';
  }, [products]);

  useEffect(() => {
    dispath(offScroll());
  }, []);

  const handleSubmit = async (values) => {
    const addressLine = values.town
      + '|'
      + values.addressLine1
      + '|'
      + values.addressLine2
      + '|'
      + values.addressLine3
      + '|'
      + values.postcode;

    const productIds = products.map((product) => {
      const ret = {
        productId: product.product.id,
        count: product.count,
      };
      return ret;
    });
    const total = getTotalAmount();
    const request = {
      name: values.name,
      phoneNumber: values.phone,
      adress: addressLine,
      comment: values.comment,
      paymentType: values.payment,
      deliveryType: 'courier',
      totalAmount: total,
      productIds,
    };

    await orderComplite(request)
      .then(() => {
        dispath(deleteOrderData());
        // eslint-disable-next-line no-undef
        const myStorage = window.localStorage;
        myStorage.setItem('order', JSON.stringify([]));
        ToastNotification(
          'success',
          'Thank you for your order! we will call you back soon',
        );
      })
      .catch(() => {
        ToastNotification(
          'error',
          'We cannot create an order. Try again or call us to order',
        );
      });
  };

  const initialValues = {
    name: '',
    phone: '',
    postcode: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    town: '',
    comment: '',
    payment: '',
    terms: '',
  };

  return (
    <div className="orderBackground" onClick={handleHideOrder}>
      <div className="order-position">
        <div className="order">
          <div className="container">
            <div className="ornament ornament--left" />
            <div className="ornament ornament--right" />
            <button
              type="button"
              className="product-modal__card__close"
              onClick={setOrderVisibleFalse}
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
            <div className="order__content">
              <h1 className="order__title">Your order:</h1>
              <hr className="order__line" />
              {products.map(({ product, count }) => (
                <Product
                  product={product}
                  count={count}
                  incCount={incCount}
                  decCount={decCount}
                  deleteProduct={deleteProduct}
                  key={product.id}
                />
              ))}
              <hr className="order__line" />
              <span className="order__total">{`Total: ${getTotalAmount()}£`}</span>
              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}
              >
                {({
                  errors, handleSubmit, values, handleChange, touched,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="order__inputs">
                      <Form.Group controlId="floatingInput">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Your Name"
                          className="order__input"
                        >
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="name"
                            value={values.name}
                            onChange={handleChange}
                            isValid={touched.name && !errors.name}
                            isInvalid={touched.name && errors.name}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group controlId="floatingInput">
                        <InputGroup hasValidation>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Phone Number"
                            className="order__input"
                          >
                            <Form.Control
                              type="text"
                              name="phone"
                              placeholder="Phone Number"
                              value={values.phone}
                              onChange={handleChange}
                              isValid={touched.phone && !errors.phone}
                              isInvalid={touched.phone && errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <div className="order__checkBoxes">
                        <Form.Group controlId="floatingInput">
                          <h2 className="order__radioTitle">Payment</h2>
                          <div className="items">
                            <label className="sq-radio">
                              Cash
                              <input
                                type="radio"
                                name="payment"
                                value="cash"
                                onChange={handleChange}
                              />
                              <span className="checkmark" />
                            </label>
                            <label className="sq-radio">
                              Card
                              <input
                                type="radio"
                                name="payment"
                                value="card"
                                onChange={handleChange}
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                          {errors.payment && touched.payment && (
                            <div className="errorRadio">{errors.payment}</div>
                          )}
                        </Form.Group>
                      </div>
                      <div className="order__postcode">
                        <Form.Group controlId="floatingInput">
                          <InputGroup hasValidation>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Postcode"
                              className="order__input"
                            >
                              <Form.Control
                                type="text"
                                name="postcode"
                                placeholder="Postcode"
                                id="postcode_input"
                                value={values.postcode}
                                onChange={handleChange}
                                isValid={
                                      touched.postcode && !errors.postcode
                                    }
                                isInvalid={
                                      touched.postcode && errors.postcode
                                    }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.postcode}
                              </Form.Control.Feedback>
                            </FloatingLabel>
                          </InputGroup>
                        </Form.Group>
                        <Button
                          type="button"
                          className="order__button order__button--findPostcode"
                          variant="outline-light"
                          id="postcode_button"
                        >
                          Find
                        </Button>
                      </div>
                      <div id="lookup_field" />
                      <Form.Group controlId="floatingInput">
                        <InputGroup hasValidation>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Address Line 1"
                            className="order__input"
                          >
                            <Form.Control
                              type="text"
                              name="addressLine1"
                              placeholder="Address Line 1"
                              id="line_1"
                              value={values.addressLine1}
                              onChange={handleChange}
                              isValid={
                                    touched.addressLine1 && !errors.addressLine1
                                  }
                              isInvalid={
                                    touched.addressLine1 && errors.addressLine1
                                  }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.addressLine1}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group controlId="floatingInput">
                        <InputGroup hasValidation>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Address Line 2"
                            className="order__input"
                          >
                            <Form.Control
                              type="text"
                              name="addressLine2"
                              id="line_2"
                              placeholder="Address Line 2"
                              value={values.addressLine2}
                              onChange={handleChange}
                              isValid={
                                    touched.addressLine2 && !errors.addressLine2
                                  }
                              isInvalid={
                                    touched.addressLine2 && errors.addressLine2
                                  }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.addressLine2}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group controlId="floatingInput">
                        <InputGroup hasValidation>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Address Line 3"
                            className="order__input"
                          >
                            <Form.Control
                              type="text"
                              name="addressLine3"
                              id="line_3"
                              placeholder="Address Line 3"
                              value={values.addressLine3}
                              onChange={handleChange}
                              isValid={
                                    touched.addressLine3 && !errors.addressLine3
                                  }
                              isInvalid={
                                    touched.addressLine3 && errors.addressLine3
                                  }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.addressLine3}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group controlId="floatingInput">
                        <InputGroup hasValidation>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Town"
                            className="order__input"
                          >
                            <Form.Control
                              type="text"
                              name="town"
                              id="post_town"
                              placeholder="Town"
                              value={values.town}
                              onChange={handleChange}
                              isValid={touched.town && !errors.town}
                              isInvalid={touched.town && errors.town}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.town}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group controlId="floatingInput">
                        <InputGroup hasValidation>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Postcode"
                            className="order__input"
                          >
                            <Form.Control
                              type="text"
                              name="postcode"
                              id="postcode"
                              placeholder="Postcode"
                              value={values.postcode}
                              onChange={handleChange}
                              isValid={touched.postcode && !errors.postcode}
                              isInvalid={
                                    touched.postcode && errors.postcode
                                  }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.postcode}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group controlId="floatingInput">
                        <InputGroup hasValidation>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Comment"
                            className="order__input"
                          >
                            <Form.Control
                              type="text"
                              name="comment"
                              placeholder="Comment"
                              value={values.comment}
                              onChange={handleChange}
                              isValid={touched.comment && !errors.comment}
                              isInvalid={touched.comment && errors.comment}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.comment}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="terms">
                        <div className="termsGroup">
                          <div className="checkbox-wrapper-23">
                            <input
                              type="checkbox"
                              id="check-23"
                              value={values.terms}
                              onClick={handleChange}
                              name="terms"
                            />
                            <label htmlFor="check-23">
                              <svg viewBox="0,0,50,50">
                                <path d="M5 30 L 20 45 L 45 5" />
                              </svg>
                            </label>
                          </div>
                          <p className="termsGroup__text">
                            By clicking the button, you agree to the

                            <Link
                              to="privacy-policy"
                              onClick={setOrderVisibleFalse}
                              className="termsGroup__link"
                            >
                              {' '}
                              privacy policy
                            </Link>
                          </p>
                        </div>
                        {errors.terms && touched.terms && (
                        <div className="errorRadio">{errors.terms}</div>
                        )}
                      </Form.Group>

                      <hr className="order__line" />
                      <span className="order__total">{`Total: ${getTotalAmount()}£`}</span>

                      <Button
                        type="submit"
                        className="order__button"
                        variant="outline-light"
                      >
                        ORDER NOW
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
