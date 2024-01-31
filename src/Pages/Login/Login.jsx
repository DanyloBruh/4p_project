/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import Logo from '../../Assets/logo.png';
import { login } from '../../Helper/requests';
import useRefreshToken from '../../Hooks/useRefreshToken';
import { loginReducer } from '../../redux/authSlice';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const [validated, setValidated] = useState(false);
  const isValidEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

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
      login({
        email,
        password,
      }).then((data) => {
        dispatch(
          loginReducer({ user: data.user, accessToken: data.accesToken }),
        );
      });
    }
  };

  const getSmth = () => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/user', {
          signal: controller.signal,
        });
        if (isMounted) {
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
        // navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
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
        <Button type="button" onClick={() => refresh()}>
          click
        </Button>
        <Button type="button" onClick={() => getSmth()}>
          click2
        </Button>
      </div>
    </div>
  );
}

export default Login;
