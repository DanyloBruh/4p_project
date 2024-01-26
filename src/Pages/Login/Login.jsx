import React from 'react';
import './Login.scss';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import Logo from '../../Assets/logo.png';

function Login() {
  return (
    <div className="login">
      <div className="login__content">
        <img src={Logo} alt="4P logo" />
        <h1>LOGIN</h1>
        <p>Please enter your login and password</p>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-4"
        >
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <Button variant="outline-light">LOGIN</Button>
      </div>
    </div>
  );
}

export default Login;
