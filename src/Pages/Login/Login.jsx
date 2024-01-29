/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './Login.scss';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import Logo from '../../Assets/logo.png';
import { login } from '../../helper/requests';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const [validated, setValidated] = useState(false);
  const isValidEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

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
      const log = await login({
        email,
        password,
      });
      console.log(log);
      sessionStorage.setItem('accesToken', log.accesToken);
      sessionStorage.setItem('user', JSON.stringify(log.user));
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
