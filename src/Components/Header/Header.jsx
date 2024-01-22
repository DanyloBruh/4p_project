/* eslint-disable no-undef */
import React, { useState } from 'react';
import './Header.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from '../../Assets/logo.png';
import SideBar from '../SideBar/SideBar';

function Header() {
  const [openSideBar, setOpenSideBar] = useState(false);
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
        <Navbar data-bs-theme="dark" className="header__navbar">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/">menu</NavLink>
              <NavLink to="recipes">recipes</NavLink>
              <NavLink to="blog">blog</NavLink>
              <NavLink to="aboutus">about us</NavLink>
              <NavLink to="contacts">contacts</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <button
          type="button"
          className={`header__hamburger ${openSideBar ? 'open-hamburger' : ''}`}
          aria-label="Side bar"
          onClick={() => setOpenSideBar((prev) => !prev)}
        >
          <span> </span>
          <span> </span>
          <span> </span>
          <span> </span>
        </button>
      </Container>
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
    </div>
  );
}

export default Header;
