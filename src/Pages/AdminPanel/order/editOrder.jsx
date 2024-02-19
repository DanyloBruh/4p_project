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
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
} from 'react-bootstrap';
import * as Yup from 'yup';
import TextareaAutosize from 'react-textarea-autosize';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';
import Select from 'react-select';
import ToastNotification from '../../../Components/Toast/Toast';
import useAxiosPrivateImages from '../../../Hooks/useAxiosPrivateWithImages';
import Product from '../../../Components/Order/product';
import { editData, getAllProducts } from '../../../Helper/requests';
import { axiosPrivate } from '../../../Helper/axios';

function EditOrder({ item, setData, fileOptions, close }) {
  const [addressFinder, setAddressFinder] = useState(false);
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

  const initialState = useMemo(
    () => ({
      name: item.name,
      phoneNumber: item.phoneNumber,
      adress: item.adress,
      comment: item.comment,
      paymentType: item.paymentType,
      deliveryType: item.deliveryType,
      totalAmount: item.totalAmount,
      status: item.status,
    }),
    [],
  );

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
  }, [item]);

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
    const selectedProductObj = allProducts.find(
      (product) => product.name === selectedProduct.value,
    );
    selectedProductObj.Dishes = { count: 1 };
    console.log(selectedProductObj);
    setOrder((prevOrder) => {
      return {
        ...prevOrder,
        Products: [...prevOrder.Products, selectedProductObj],
      };
    });
  }, [selectedProduct]);

  const optionsArr = allProducts.map((product) => {
    return {
      value: product.name,
      label: product.name,
    };
  });

  const handleSubmitForm = (values) => {
    console.log(order);
    const productIds = order.Products.map((product) => {
      console.log(product);
      const ret = {
        productId: product.id,
        count: product.Dishes.count,
      };
      return ret;
    });
    const total = getTotalAmount();
    const request = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      comment: values.comment,
      paymentType: values.paymentType,
      deliveryType: values.deliveryType,
      totalAmount: total,
      productIds,
    };
    console.log(request);
    editData('order', order.id, axiosPrivate, request)
      .then(() => {
        ToastNotification('success', 'Successfully updated!');
        setData((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.id === item.id) {
              return { ...values, id: item.id };
            }
            return node;
          }),
        }));
      })
      .catch((err) => {
        console.log(err);
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
    <div className="">
      <div className="order">
        <div className="container">
          <div className="ornament ornament--left" />
          <div className="ornament ornament--right" />
          <div className="order__cross" onClick={close} />
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
            <Select
              className="basic-single"
              classNamePrefix="select"
              isLoading={!allProducts[0]?.name}
              name="product"
              onChange={setSelectedProduct}
              options={optionsArr}
              value={selectedProduct}
            />
            <Button variant="outline-light" onClick={addProduct}>
              Add Selected Product
            </Button>
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
                          value={values.deliveryType}
                          onChange={handleChange}
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
                        </>
                      )}
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
                      <Form.Group className="form-element">
                        <Form.Select
                          name="status"
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
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.status}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <hr className="order__line" />
                      <span className="order__total">{`Total: ${getTotalAmount()}£`}</span>

                      <Button
                        type="submit"
                        className="order__button"
                        variant="outline-light"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      )
    </div>
  );
}

export default EditOrder;
