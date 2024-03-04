import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Footer.scss';
import { Link } from 'react-router-dom';
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
            <h2>4P</h2>
            <Link to="/">
              <p>Menu</p>
            </Link>
            <Link to="blog">
              <p>Blog</p>
            </Link>
            <Link to="recipes">
              <p>Recipes</p>
            </Link>
          </Col>
          <Col md={2} sm={2} className="footer-col">
            <Link to="contacts">
              <h2>CONTACTS</h2>
            </Link>
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
            <Link to="aboutus">
              <h2>USEFUL INFO</h2>
            </Link>
            <Link to="aboutus">
              <p>About Us</p>
            </Link>
            <Link to="privacy-policy">
              <p>Privacy Policy</p>
            </Link>
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
