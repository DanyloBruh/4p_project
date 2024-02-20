/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import ToastNotification from '../../../Components/Toast/Toast';
import { postData } from '../../../Helper/requests';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import './user.scss';

function AddUser({ setData, close }) {
  const axiosPrivate = useAxiosPrivate();

  const initialState = useMemo(
    () => ({
      name: '',
      role: '',
      email: '',
      password: '',
      confirmPassword: '',
    }),
    [],
  );
  const schema = useMemo(
    () => Yup.object().shape({
      name: Yup.string()
        .min(2, 'Name must be minimum 2')
        .max(100, 'Name must not be more than 100 characters')
        .required('Name is required')
        .matches(
          '^[A-Za-z]{1,20} [A-Za-z]{1,20}',
          'Username must be in the format Name Surname',
        ),
      role: Yup.string()
        .required('Role is required')
        .oneOf(['admin', 'employee'], 'Role is required'),
      email: Yup.string()
        .matches(/^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/, 'Invalid email')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be 6 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Mismatched passwords')
        .required('Please confirm your password'),
    }),
    [],
  );

  const handleSubmitForm = (values) => {
    const response = { ...values };

    postData('user', axiosPrivate, response)
      .then((result) => {
        ToastNotification('success', 'Successfully created!');
        setData((state) => ({
          nodes: [...state.nodes, result],
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
      <div className="add-edit-form add-user">
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
        <Formik
          initialValues={initialState}
          validationSchema={schema}
          onSubmit={handleSubmitForm}
        >
          {({
            errors, handleSubmit, values, handleChange, touched,
          }) => (
            <form
              className="form"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <Form.Label>Add user</Form.Label>

              <Form.Group className="form-element">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter user name"

                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="user name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && errors.name}
                    autoComplete="off"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="form-element">
                <Form.Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  isValid={touched.role && !errors.role}
                  isInvalid={touched.role && errors.role}
                  autoComplete="off"
                >
                  <option>Сhoose a role from the select menu</option>
                  <option>admin</option>
                  <option>employee</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.role}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form-element">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter email"
                >
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                    autoComplete="off"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="form-element">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter password"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && errors.password}
                    autoComplete="off"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="form-element">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Confirm password"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isValid={touched.confirmPassword && !errors.confirmPassword}
                    isInvalid={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    autoComplete="off"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <hr />
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
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddUser;
