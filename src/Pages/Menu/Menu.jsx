import React, { useState } from 'react';
import {
  Carousel, Col, Container, Row,
} from 'react-bootstrap';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import './Menu.scss';
import Varenyk from '../../Assets/varenyk.png';
import Dumplings from '../../Assets/dumplings.png';
import Borsch from '../../Assets/borsch.png';
import MenuProduct from '../../Components/MenuProduct/MenuProduct';
import SecondaryArticle from '../../Components/SecondaryArticle/SecondaryArticle';
import ProductCard from '../../Components/ProductCard/ProductCard';

function Menu() {
  const [selectProductId, setSelectProductId] = useState(null);

  const handlerSelectProduct = (id) => {
    setSelectProductId(id);
  };
  return (
    <div className="menu-content">
      <div className="menu-header">
        <Container className="menu-header__text-box">
          <h2>
            Lorem ipsum dolor sit amet.
            <br />
            Non animi minus ut eveniet illum et eligendi debitis.
          </h2>
          <Link
            // activeClass="active"
            to="menu"
            spy
            offset={-90}
            duration={200}
            className="menu-header__btn"
          >
            OPEN MENU
          </Link>
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
        <div id="menu">
          <h2>Menu</h2>
          <p>
            Non voluptas minima et nobis debitis vel dolor nisi? Et esse
            similique
            <br />
            ut corrupti repellat ea enim harum.
          </p>
          <Row className="menu-main__product">
            <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
              <MenuProduct handlerSelectProduct={handlerSelectProduct} />
            </Col>
            <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
              <MenuProduct handlerSelectProduct={handlerSelectProduct} />
            </Col>
            <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
              <MenuProduct handlerSelectProduct={handlerSelectProduct} />
            </Col>
            <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
              <MenuProduct handlerSelectProduct={handlerSelectProduct} />
            </Col>
            <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
              <MenuProduct handlerSelectProduct={handlerSelectProduct} />
            </Col>
            <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
              <MenuProduct handlerSelectProduct={handlerSelectProduct} />
            </Col>
          </Row>
        </div>

        <div>
          <hr />
          <Row className="main-page-about-us">
            <Col xs={8}>
              <p>
                Passion for cooking, love for Ukrainian cuisine, desire to be
                useful and give joy to others - this is what prompted us to
                found 4p
              </p>
            </Col>
            <Col xs={4}>
              <img src={Dumplings} alt="" />
            </Col>
          </Row>
          <Row className="main-page-about-us">
            <Col xs={4}>
              <img src={Varenyk} alt="" />
            </Col>
            <Col xs={8}>
              <p>
                4P - delivery of Ukrainian food in London with premium quality,
                impeccable service and its own philosophy.
              </p>
            </Col>
          </Row>
          <Row className="main-page-about-us">
            <Col xs={8}>
              <p>
                Our menu combines classic Ukrainian cuisine and the chefs
                original recipes.We cook for you exclusively from the freshest
                and highest quality products.
              </p>
            </Col>
            <Col xs={4}>
              <img src={Borsch} alt="" />
            </Col>
          </Row>

          <div className="main-page-read-more-line">
            <hr />
            <NavLink to="aboutus" type="button">
              READ MORE
            </NavLink>
          </div>
        </div>

        <div className="main-page-blog">
          <h2>more about our activities</h2>
          <Row>
            <Col>
              <SecondaryArticle />
            </Col>
            <Col>
              <SecondaryArticle />
            </Col>
            <Col>
              <SecondaryArticle />
            </Col>
          </Row>
          <div className="main-page-read-more-line">
            <hr />
            <NavLink to="blog" type="button">
              READ MORE
            </NavLink>
          </div>
        </div>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
      {selectProductId !== null && (
        <ProductCard handlerSelectProduct={handlerSelectProduct} />
      )}
    </div>
  );
}

export default Menu;
