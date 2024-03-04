import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Footer.scss';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

import Logo from '../../Assets/logo.png';

function Footer() {
  return (
    <div className="footer-body">
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={2} className="footer-col logo">
            <img src={Logo} alt="logo-footer" className="footer-logo" />
          </Col>
          <Col md={2} sm={2} className="footer-col">
            <Link to="top" duration={200} className="scroll-link">
              4P
            </Link>
            <NavLink to="/">
              <p>Menu</p>
            </NavLink>
            <NavLink to="blog">
              <p>Blog</p>
            </NavLink>
            <NavLink to="recipes">
              <p>Recipes</p>
            </NavLink>
          </Col>
          <Col md={2} sm={2} className="footer-col">
            <NavLink to="contacts">
              <h2>CONTACTS</h2>
            </NavLink>
            <a href="mailto:frompeople4@gmail.com">
              <p>Email</p>
            </a>
            <a href="https://www.instagram.com/4rom_people/">
              <p>Instagram </p>
            </a>
            <a href="https://www.facebook.com/from.people.4">
              <p>Facebook</p>
            </a>
          </Col>
          <Col md={2} sm={2} className="footer-col">
            <NavLink to="aboutus">
              <h2>USEFUL INFO</h2>
            </NavLink>
            <NavLink to="aboutus">
              <p>About Us</p>
            </NavLink>
            <NavLink to="privacy-policy">
              <p>Privacy Policy</p>
            </NavLink>
          </Col>
          <Col md={3} sm={4} className="footer-col footer-hours">
            <h2>OPENING HOURS</h2>
            <div>
              <p>Mon-Fri:</p>
              <p>8am - 9pm</p>
            </div>
            <div>
              <p>Sat-Sun:</p>
              <p>8am - 1am</p>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="footer-line" />
      <div className="footer-text-rights">
        <p>© 4P 2024 | All Rights Reserved </p>
      </div>
    </div>
  );
}

export default Footer;
