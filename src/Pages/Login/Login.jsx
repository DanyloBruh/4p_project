/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import Logo from '../../Assets/logo.png';
import { login } from '../../Helper/requests';
import { loginReducer } from '../../redux/authSlice';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const [validated, setValidated] = useState(false);
  const isValidEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  useEffect(() => {
    if (!emailError && !passwordError) {
      setValidated(true);
    } else setValidated(false);
  }, [emailError, passwordError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && email.match(isValidEmail)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    if (password && password.length >= 6) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
    if (
      email
      && email.match(isValidEmail)
      && password
      && password.length >= 6
    ) {
      try {
        const response = await login({
          email,
          password,
        });
        dispatch(
          loginReducer({
            user: response.user,
            accessToken: response.accesToken,
          }),
        );
        navigate(from, { replace: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <img src={Logo} alt="4P logo" />
        <h1>LOGIN</h1>
        <p>Please enter your login and password</p>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-4"
            >
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Button type="submit" variant="outline-light">
            LOGIN
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
