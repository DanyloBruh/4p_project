import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { NavLink, useParams } from 'react-router-dom';
import './Menu.scss';
import Varenyk from '../../Assets/varenyk.png';
import Dumplings from '../../Assets/dumplings.png';
import Borsch from '../../Assets/borsch.png';
import MenuProduct from '../../Components/MenuProduct/MenuProduct';
import SecondaryArticle from '../../Components/SecondaryArticle/SecondaryArticle';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { getAllProducts } from '../../Helper/requests';

import MenuProductPlaceholder from '../../Components/MenuProductPlaceholder/MenuProductPlaceholder';

function Menu() {
  const [menuItems, setMenuItems] = useState();

  const { id } = useParams();

  useEffect(() => {
    getAllProducts().then(setMenuItems);
  }, []);

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
            {menuItems?.map((item) => (
              <Col xxl={4} xl={4} lg={4} md={6} sm={6}>
                <MenuProduct
                  id={item.id}
                  image={item.Image.imageData}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                />
              </Col>
            ))}
            {(!menuItems || menuItems.length === 0) && (
              <>
                <Col xxl={4} xl={4} lg={4} md={6} sm={6}>
                  <MenuProductPlaceholder />
                </Col>
                <Col xxl={4} xl={4} lg={4} md={6} sm={6}>
                  <MenuProductPlaceholder />
                </Col>
                <Col
                  xxl={4}
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  className="menu-product-third-placeholder"
                >
                  <MenuProductPlaceholder />
                </Col>
              </>
            )}
          </Row>
        </div>
        <div>
          <hr />
          <Row className="main-page-about-us main-page-about-us__revers">
            <Col lg={7} md={6}>
              <p>
                Passion for cooking, love for Ukrainian cuisine, desire to be
                useful and give joy to others - this is what prompted us to
                found 4p
              </p>
            </Col>
            <Col lg={5} md={6}>
              <img src={Dumplings} alt="" />
            </Col>
          </Row>
          <Row className="main-page-about-us">
            <Col lg={5} md={6}>
              <img src={Varenyk} alt="" />
            </Col>
            <Col lg={7} md={6}>
              <p>
                4P - delivery of Ukrainian food in London with premium quality,
                impeccable service and its own philosophy.
              </p>
            </Col>
          </Row>
          <Row className="main-page-about-us main-page-about-us__revers">
            <Col lg={7} md={6}>
              <p>
                Our menu combines classic Ukrainian cuisine and the chefs
                original recipes.We cook for you exclusively from the freshest
                and highest quality products.
              </p>
            </Col>
            <Col lg={5} md={6}>
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
            <Col xxl={4} xl={4} lg={4} md={6} sm={6}>
              <SecondaryArticle />
            </Col>
            <Col xxl={4} xl={4} lg={4} md={6} sm={6}>
              <SecondaryArticle />
            </Col>
            <Col xxl={4} xl={4} lg={4} md={6} sm={6}>
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
      {id && <ProductCard data={menuItems?.find((item) => item.id === id)} />}
    </div>
  );
}

export default Menu;
