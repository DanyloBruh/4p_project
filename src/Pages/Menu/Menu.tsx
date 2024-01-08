import {
  Carousel, Col, Container, Row,
} from 'react-bootstrap';
import './Menu.scss';
import Varenyk from '../../Assets/varenyk.png';
import Dumplings from '../../Assets/dumplings.png';
import Borsch from '../../Assets/borsch.png';
import MenuProduct from '../../Components/MenuProduct/MenuProduct';

function Menu() {
  return (
    <div className="menu-content">
      <div className="menu-header">
        <Container className="menu-header__text-box">
          <h2>
            Lorem ipsum dolor sit amet. <br></br>
            Non animi minus ut eveniet illum et eligendi debitis.
          </h2>
          <button className="menu-header__btn"> OPEN MENU</button>
        </Container>
        <Carousel>
          <Carousel.Item>
            <img src={Varenyk} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Dumplings} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Borsch} alt="" />
          </Carousel.Item>
        </Carousel>
      </div>
      <Container className="menu-main">
        <h2>Menu</h2>
        <p>
          Non voluptas minima et nobis debitis vel dolor nisi? Et esse similique{' '}
          <br />
          ut corrupti repellat ea enim harum.
        </p>
        <Row className="menu-main__filter">
          <Col>
            <button>varenyky</button>
          </Col>
          <Col>
            <button>pelmeni</button>
          </Col>
          <Col>
            <button>shaurma</button>
          </Col>
          <Col>
            <button>borsch</button>
          </Col>
        </Row>
        <Row className="menu-main__product">
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <MenuProduct />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <MenuProduct />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <MenuProduct />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <MenuProduct />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <MenuProduct />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <MenuProduct />
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default Menu;
