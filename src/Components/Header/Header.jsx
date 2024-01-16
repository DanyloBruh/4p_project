/* eslint-disable no-undef */
import React, { useState } from 'react';
import './Header.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from '../../Assets/logo.png';

function Header() {
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else setColor(false);
  };

  window.addEventListener('scroll', changeColor);

  return (
    <div className={`header ${color ? 'header__bg-black' : 'header__bg'}`}>
      <Container className="header__container">
        <img src={Logo} alt="logo" />
        <Navbar data-bs-theme="dark">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/">menu</NavLink>
                <NavLink to="recipes">recipes</NavLink>
                <NavLink to="blog">blog</NavLink>
                <NavLink to="aboutus">about us</NavLink>
                <NavLink to="contacts">contacts</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}

export default Header;
