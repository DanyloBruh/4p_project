import React, { useState } from "react";
import "./Header.scss";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/logo.png";

function Header() {
  return (
    <div className="header">
      <Container className="header__container">
        <img src={Logo} alt="logo" />
        <Navbar data-bs-theme="dark">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/">menu</NavLink>
                <NavLink to="link">promotions</NavLink>
                <NavLink to="link">blog</NavLink>
                <NavLink to="link">about us</NavLink>
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
