import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Footer.scss';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/logo.png';

function Footer() {
  return (
    <div className="footer-body">
      <Container>
        <Row>
          <Col md={3} sm={2} className="footer-col">
            <img src={Logo} alt="logo-footer" className="footer-logo" />
          </Col>
          <Col md={2} sm={2} className="footer-col">
            <h2>4P</h2>
            <Link to="/">
              <p>menu</p>
            </Link>
            <Link to="blog">
              <p>blog</p>
            </Link>
            <Link to="aboutus">
              <p>about</p>
            </Link>
          </Col>
          <Col md={2} sm={2} className="footer-col">
            <h2>contacts</h2>
            <p>email</p>
            <p>instagram </p>
            <p>twitter</p>
          </Col>
          <Col md={2} sm={2} className="footer-col">
            <h2>useful info</h2>
            <p>return policy</p>
            <p>delivery</p>
            <Link to="privacy-policy">
              <p>privacy policy</p>
            </Link>
          </Col>
          <Col md={3} sm={4} className="footer-col footer-hours">
            <h2>opening hours</h2>
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
