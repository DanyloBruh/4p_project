/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PostcodeLookup } from '@ideal-postcodes/postcode-lookup';
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import Select from 'react-select';
import ToastNotification from '../../../Components/Toast/Toast';
import Product from '../../../Components/Order/product';
import { editData, getAllProducts } from '../../../Helper/requests';
import { axiosPrivate } from '../../../Helper/axios';
import { removeUnchangedFields } from '../adminUtils';
import './order.scss';

function EditOrder({ item, setData, fileOptions, close }) {
  const [addressFinder, setAddressFinder] = useState(
    item.deliveryType === 'courier',
  );
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [schema, setSchema] = useState({});
  const [order, setOrder] = useState(item);

  const regexes = useMemo(
    () => ({
      regexPostcode: /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i,
      regexPhone:
        /\s*(([+](\s?\d)([-\s]?\d)|0)?(\s?\d)([-\s]?\d){9}|[(](\s?\d)([-\s]?\d)+\s*[)]([-\s]?\d)+)\s*/,
    }),
    [],
  );

  const initialState = useMemo(() => {
    const masAddress = item.adress.split('|');
    return {
      name: item.name,
      phoneNumber: item.phoneNumber,
      postcode: masAddress[4],
      addressLine1: masAddress[1],
      addressLine2: masAddress[2],
      addressLine3: masAddress[3],
      town: masAddress[0],
      comment: item.comment,
      paymentType: item.paymentType,
      deliveryType: item.deliveryType,
      totalAmount: item.totalAmount,
      status: item.status,
    };
  }, []);

  useEffect(() => {
    getAllProducts().then(setAllProducts);
  }, []);

  useEffect(() => {
    if (addressFinder) {
      PostcodeLookup.setup({
        apiKey: 'ak_ls0dm59drQLRxSMrdq7eDMB3nRAd7',
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

      setSchema(
        Yup.object().shape({
          name: Yup.string()
            .min(2, 'Name must be minimum 2')
            .max(100, 'Name must not be more than 100 characters')
            .required('Name is required'),
          phoneNumber: Yup.string()
            .required('Phone is required')
            .matches(regexes.regexPhone, 'Phone number is not valid'),
          postcode: Yup.string()
            .required('Postcode is required')
            .matches(regexes.regexPostcode, 'Postcode number is not valid'),
          addressLine1: Yup.string().required(),
          addressLine2: Yup.string(),
          addressLine3: Yup.string(),
          town: Yup.string().required(),
          comment: Yup.string(),
          deliveryType: Yup.string()
            .required('required')
            .oneOf(['self', 'courier'], 'required'),
          paymentType: Yup.string()
            .required('required')
            .oneOf(['card', 'cash'], 'required'),
          status: Yup.string()
            .required('Status is required')
            .oneOf(
              [
                'ordered, not processed',
                'ordered, processed',
                'courier on the way',
                'delivered',
                'requires processing',
              ],
              'ivalid status',
            ),
        }),
      );
    } else {
      setSchema(
        Yup.object().shape({
          name: Yup.string()
            .min(2, 'Name must be minimum 2')
            .max(50, 'Name must not be more than 50 characters')
            .required('Name is required'),
          phoneNumber: Yup.string()
            .required('Phone is required')
            .matches(regexes.regexPhone, 'Phone number is not valid'),
          comment: Yup.string(),
          deliveryType: Yup.string()
            .required('required')
            .oneOf(['self', 'courier'], 'required'),
          paymentType: Yup.string()
            .required('required')
            .oneOf(['card', 'cash'], 'required'),
          status: Yup.string()
            .required('Status is required')
            .oneOf(
              [
                'ordered, not processed',
                'ordered, processed',
                'courier on the way',
                'delivered',
                'requires processing',
              ],
              'ivalid status',
            ),
        }),
      );
    }
  }, [addressFinder]);

  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

  const getTotalAmount = useCallback(() => {
    if (order.Products && order.Products.length) {
      return order.Products.reduce(
        (pre, curr) => pre + +curr.price * curr.Dishes.count,
        0,
      );
    }

    return '0';
  }, [order]);

  const incCount = useCallback((id) => {
    setOrder((ord) => {
      return {
        ...ord,
        Products: ord.Products.map((it) => {
          if (it.id === id) {
            return {
              ...it,
              Dishes: {
                ...it.Dishes,
                count: it.Dishes.count + 1,
              },
            };
          }
          return it;
        }),
      };
    });
  }, []);

  const decCount = useCallback((id) => {
    setOrder((ord) => {
      return {
        ...ord,
        Products: ord.Products.map((it) => {
          if (it.id === id && it.Dishes.count !== 1) {
            return {
              ...it,
              Dishes: {
                ...it.Dishes,
                count: it.Dishes.count - 1,
              },
            };
          }
          return it;
        }),
      };
    });
  }, []);

  const deleteProduct = useCallback((id) => {
    setOrder((ord) => {
      return {
        ...ord,
        Products: ord.Products.filter((it) => it.id !== id),
      };
    });
  }, []);
  const addProduct = useCallback(() => {
    if (
      order.Products.find((product) => product.name === selectedProduct.value)
    ) {
      setOrder((prev) => ({
        ...prev,
        Products: prev.Products.map((product) => {
          if (product.name === selectedProduct.value) {
            product.Dishes.count += 1;
            setSelectedProduct('');
          }

          return product;
        }),
      }));
      return;
    }

    const selectedProductObj = allProducts.find(
      (product) => product.name === selectedProduct.value,
    );

    if (!selectedProductObj) {
      return;
    }
    selectedProductObj.Dishes = { count: 1 };
    setOrder((prevOrder) => {
      return {
        ...prevOrder,
        Products: [...prevOrder.Products, selectedProductObj],
      };
    });
  }, [selectedProduct, order.Products]);

  const optionsArr = allProducts.map((product) => {
    return {
      value: product.name,
      label: product.name,
    };
  });

  const handleSubmitForm = (values) => {
    let productMarker = false;
    const res = {
      name: item.name,
      phoneNumber: item.phoneNumber,
      comment: item.comment,
      paymentType: item.paymentType,
      deliveryType: item.deliveryType,
      status: item.status,
    };
    const reqPres = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      comment: values.comment,
      paymentType: values.paymentType,
      deliveryType: values.deliveryType,
      status: values.status,
    };
    const req = {
      ...removeUnchangedFields(res, reqPres),
    };
    if (item.Products.length === order.Products.length) {
      for (let i = 0; i < item.Products.length; i += 1) {
        if (
          item.Products[i].id !== order.Products[i].id
          || item.Products[i].Dishes.count !== order.Products[i].Dishes.count
        ) {
          productMarker = true;
          break;
        }
      }
    } else {
      productMarker = true;
    }

    if (productMarker) {
      const productIds = order.Products.map((product) => {
        const ret = {
          ProductId: product.id,
          count: product.Dishes.count,
        };
        return ret;
      });
      const total = getTotalAmount();
      req.totalAmount = total;
      req.productIds = productIds;
    }

    const addressLine = `${values.town}|${values.addressLine1}|${values.addressLine2}|${values.addressLine3}|${values.postcode}`;

    if (item.adress !== addressLine) {
      req.adress = addressLine;
    }
    editData('order', order.id, axiosPrivate, req)
      .then(() => {
        ToastNotification('success', 'Successfully updated!');
        setData((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.id === order.id) {
              return {
                ...order,
                ...req,
              };
            }
            return node;
          }),
        }));
      })
      .catch((err) => {
        ToastNotification(
          'error',
          `Something went wrong! (${err.response.data.message})`,
        );
      })
      .finally(() => {
        close();
      });
  };

  return (
    <div className="add-edit-form-bg">
      <div className="add-edit-form-position">
        <div className="add-edit-form">
          <button
            type="button"
            className="product-modal__card__close"
            onClick={() => close()}
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
            <h1 className="order__title">Order:</h1>
            <hr className="order__line" />
            {order.Products.map((product) => (
              <Product
                product={product}
                count={product.Dishes.count}
                incCount={incCount}
                decCount={decCount}
                deleteProduct={deleteProduct}
                key={product.id}
              />
            ))}
            <hr className="order__line" />
            <span className="order__total">{`Total: ${getTotalAmount()}£`}</span>
            <div className="d-flex w-100 my-3">
              <Select
                className="basic-single"
                classNamePrefix="select"
                isLoading={!allProducts[0]?.name}
                name="product"
                onChange={setSelectedProduct}
                options={optionsArr}
                value={selectedProduct}
              />
              <Button
                variant="outline-light ml-3 rounded-0"
                onClick={addProduct}
              >
                Add Selected Product
              </Button>
            </div>

            <Formik
              initialValues={initialState}
              validationSchema={schema}
              onSubmit={handleSubmitForm}
            >
              {({ errors, handleSubmit, values, handleChange, touched }) => {
                return (
                  <form
                    onSubmit={handleSubmit}
                    className="form"
                    encType="multipart/form-data"
                  >
                    <div className="order__inputs">
                      <Form.Group>
                        <FloatingLabel
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
                      <Form.Group>
                        <InputGroup hasValidation>
                          <FloatingLabel
                            label="Phone Number"
                            className="order__input"
                          >
                            <Form.Control
                              type="text"
                              name="phoneNumber"
                              placeholder="Phone Number"
                              value={values.phoneNumber}
                              onChange={handleChange}
                              isValid={
                                touched.phoneNumber && !errors.phoneNumber
                              }
                              isInvalid={
                                touched.phoneNumber && errors.phoneNumber
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phoneNumber}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="form-element">
                        <Form.Select
                          name="paymentType"
                          className="form-element-select"
                          value={values.paymentType}
                          onChange={handleChange}
                          isValid={touched.paymentType && !errors.paymentType}
                          isInvalid={touched.paymentType && errors.paymentType}
                          autoComplete="off"
                        >
                          <option>card</option>
                          <option>cash</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.paymentType}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="form-element">
                        <Form.Select
                          name="deliveryType"
                          className="form-element-select"
                          value={values.deliveryType}
                          onChange={(e) => {
                            if (e.target.value === 'self') {
                              setAddressFinder(false);
                              handleChange(e);
                            } else {
                              setAddressFinder(true);
                              handleChange(e);
                            }
                          }}
                          isValid={touched.deliveryType && !errors.deliveryType}
                          isInvalid={
                            touched.deliveryType && errors.deliveryType
                          }
                          autoComplete="off"
                        >
                          <option>self</option>
                          <option>courier</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.deliveryType}
                        </Form.Control.Feedback>
                      </Form.Group>
                      {addressFinder && (
                        <>
                          <div className="order__postcode mb-3">
                            <Form.Group className="order__half">
                              <InputGroup hasValidation>
                                <FloatingLabel
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
                              className="order__button order__button--findPostcode order__half"
                              variant="outline-light"
                              id="postcode_button"
                            >
                              Find
                            </Button>
                          </div>
                          <div id="lookup_field" />
                          <Form.Group>
                            <InputGroup hasValidation>
                              <FloatingLabel
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
                          <Form.Group>
                            <InputGroup hasValidation>
                              <FloatingLabel
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
                          <Form.Group>
                            <InputGroup hasValidation>
                              <FloatingLabel
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
                          <Form.Group>
                            <InputGroup hasValidation>
                              <FloatingLabel
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
                          <Form.Group>
                            <InputGroup hasValidation>
                              <FloatingLabel
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
                        </>
                      )}
                      <Form.Group>
                        <InputGroup hasValidation>
                          <FloatingLabel
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
                      <Form.Group className="form-element">
                        <Form.Select
                          name="status"
                          className="form-element-select"
                          value={values.status}
                          onChange={handleChange}
                          isValid={touched.status && !errors.status}
                          isInvalid={touched.status && errors.status}
                          autoComplete="off"
                        >
                          <option>ordered, not processed</option>
                          <option>ordered, processed</option>
                          <option>courier on the way</option>
                          <option>delivered</option>
                          <option>requires processing</option>
                          <option>cancelled</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.status}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <hr className="order__line" />
                      <span className="order__total">{`Total: ${getTotalAmount()}£`}</span>

                      <div className="btn-group">
                        <Button
                          type="button"
                          variant="outline-danger"
                          className="button__submit"
                          onClick={() => close()}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="outline-light"
                          className="button__submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
