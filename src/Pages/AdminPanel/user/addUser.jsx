/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import React, { useMemo } from 'react';
import {
  Button, Container, FloatingLabel, Form,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';
import ToastNotification from '../../../Components/Toast/Toast';
import { postData } from '../../../Helper/requests';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

function AddUser({ setData, close }) {
  const axiosPrivate = useAxiosPrivate();

  const initialState = useMemo(() => ({
    name: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
  }), []);
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

  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

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
    <div className="add-edit-form">
      <Container>
        <Formik
          initialValues={initialState}
          validationSchema={schema}
          onSubmit={handleSubmitForm}
        >
          {({
            errors,
            handleSubmit,
            values,
            handleChange,
            touched,
          }) => (
            <form
              className="form"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <Form.Label>
                Add user
                <Button
                  onClick={() => close()}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <IoMdClose />
                  </IconContext.Provider>
                </Button>
              </Form.Label>

              <Form.Group className="form-element">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter user name"
                  className="mb-3"
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
                  className="mb-3"
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
                  className="mb-3"
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
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isValid={touched.confirmPassword && !errors.confirmPassword}
                    isInvalid={touched.confirmPassword && errors.confirmPassword}
                    autoComplete="off"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <br />
              <Button
                type="submit"
                variant="outline-light"
                className="button__submit"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default AddUser;
