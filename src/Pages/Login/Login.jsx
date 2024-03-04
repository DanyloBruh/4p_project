/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './Login.scss';
import { useDispatch } from 'react-redux';
import * as formik from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button, FloatingLabel, Form, InputGroup,
} from 'react-bootstrap';
import Logo from '../../Assets/logo.png';
import { login } from '../../Helper/requests';
import { loginReducer } from '../../redux/authSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [errorMessage, setErrorMessage] = useState({
    email: { emailError: false, emailErrorMessage: '' },
    password: { passwordError: false, passwordErrorMessage: '' },
  });

  const loginHandler = async (e) => {
    try {
      const response = await login({
        email: e.email,
        password: e.password,
      });
      dispatch(
        loginReducer({
          user: response.user,
          accesToken: response.accesToken,
        }),
      );
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response.data.message === 'User with this password not found') {
        setErrorMessage({
          ...errorMessage,
          password: {
            passwordError: true,
            passwordErrorMessage: 'User with this password not found',
          },
        });
      }
      if (err.response.data.message === 'User with this email not found') {
        setErrorMessage({
          ...errorMessage,
          email: {
            emailError: true,
            emailErrorMessage: 'User with this email not found',
          },
        });
      }
      console.log(err);
    }
  };

  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .test(
        'len',
        'Password must be at least 6 characters',
        (val) => val.length >= 6,
      )
      .required(),
  });

  return (
    <div className="login">
      <div className="login__content">
        <img src={Logo} alt="4P logo" />
        <h1>LOGIN</h1>
        <p>Please enter your login and password</p>
        <Formik
          validationSchema={schema}
          onSubmit={(e) => loginHandler(e)}
          initialValues={{
            email: '',
            password: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationFormikUsername">
                <InputGroup hasValidation>
                  <FloatingLabel
                    controlId="floatingEmail"
                    label="Email address"
                    className="mb-4"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      aria-describedby="inputGroupPrepend"
                      value={values.email}
                      onChange={(e) => {
                        if (errorMessage.email.emailError) {
                          setErrorMessage({
                            ...errorMessage,
                            email: {
                              emailError: false,
                              emailErrorMessage: '',
                            },
                          });
                        }
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={
                        (touched.email && errors.email)
                        || errorMessage.email.emailError
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email
                        || (errorMessage.email.emailError
                          && errorMessage.email.emailErrorMessage)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="validationFormikPassword">
                <InputGroup hasValidation>
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-4"
                  >
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      aria-describedby="inputGroupPrepend"
                      value={values.password}
                      onChange={(e) => {
                        if (errorMessage.password.passwordError) {
                          setErrorMessage({
                            ...errorMessage,
                            password: {
                              passwordError: false,
                              passwordErrorMessage: '',
                            },
                          });
                        }
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      isValid={touched.password && !errors.password}
                      isInvalid={
                        (touched.password && errors.password)
                        || errorMessage.password.passwordError
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password
                        || (errorMessage.password.passwordError
                          && errorMessage.password.passwordErrorMessage)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </InputGroup>
              </Form.Group>

              <Button type="submit" variant="outline-light">
                LOGIN
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
