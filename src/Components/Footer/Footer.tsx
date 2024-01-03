import { Col, Container, Row } from "react-bootstrap";
import "./Footer.scss";
import Logo from "../../Assets/logo.png";

function Footer() {
  return (
    <div className="footer-body">
      <Container>
        <Row>
          <Col xs={3} className="col">
            <img src={Logo} alt="logo-footer" className="footer-logo" />
          </Col>
          <Col xs={2} className="col">
            <h2>4P</h2>
            <p>menu</p>
            <p>about</p>
            <p>blog</p>
          </Col>
          <Col xs={2} className="col">
            <h2>contacts</h2>
            <p>email</p>
            <p>instagram </p>
            <p>twitter</p>
          </Col>
          <Col xs={2} className="col">
            <h2>useful info</h2>
            <p>return policy</p>
            <p>delivery</p>
            <p>where we deliver</p>
          </Col>
          <Col xs={3} className="col">
            <h2>opening hours</h2>
            {/* <div> */}
            <div>
              <p>Mon-Fri:</p>
              <p>8am-9pm</p>
            </div>
            <div>
              <p>Sat-Sun:</p>
              <p>8am-1am</p>
            </div>
            {/* </div> */}
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
