import React, { useState } from "react";
import "./Header.scss";
import { Container, Nav, Navbar } from "react-bootstrap";
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
                <Nav.Link href="#home">menu</Nav.Link>
                <Nav.Link href="#link">promotions</Nav.Link>
                <Nav.Link href="#link">blog</Nav.Link>
                <Nav.Link href="#link">about us</Nav.Link>
                <Nav.Link href="#link">contacts</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}

export default Header;
