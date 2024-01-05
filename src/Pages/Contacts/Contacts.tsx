import { Col, Container, Row } from "react-bootstrap";
import "./Contacts.scss";

function Contacts() {
  return (
    <div className="contacts-content">
      <Container className="contact-card">
        <h2>Contacts</h2>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contacts;
