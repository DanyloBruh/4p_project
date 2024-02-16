import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import './Menu.scss';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Varenyk from '../../Assets/varenyk.png';
import Dumplings from '../../Assets/dumplings.png';
import Borsch from '../../Assets/borsch.png';
import MenuProduct from '../../Components/MenuProduct/MenuProduct';
import SecondaryArticle from '../../Components/SecondaryArticle/SecondaryArticle';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { getAllProducts, getMainBlogs } from '../../Helper/requests';

import MenuProductPlaceholder from '../../Components/MenuProductPlaceholder/MenuProductPlaceholder';
import SecondaryArticlePlaceholder from '../../Components/SecondaryArticlePlaceholder/SecondaryArticlePlaceholder';
import { offScroll, onScroll } from '../../redux/scrollSlice';

function Menu() {
  const [menuItems, setMenuItems] = useState();
  const [blogItems, setBlogItems] = useState();
  const [selectItems, setSelectItems] = useState();

  const dispath = useDispatch();

  useEffect(() => {
    if (selectItems) {
      dispath(offScroll());
    } else {
      dispath(onScroll());
    }
  }, [selectItems]);

  useEffect(() => {
    getAllProducts().then(setMenuItems);
    getMainBlogs()
      .then(setBlogItems)
      .catch((e) => console.log(e));
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
              <Col key={item.id} xxl={4} xl={4} lg={4} md={6} sm={6}>
                <MenuProduct product={item} setSelectItems={setSelectItems} />
              </Col>
            ))}
            {(!menuItems || menuItems.length === 0) && (
              <>
                <Col lg={4} sm={6}>
                  <MenuProductPlaceholder />
                </Col>
                <Col lg={4} sm={6}>
                  <MenuProductPlaceholder />
                </Col>
                <Col lg={4} sm={6} className="menu-product-third-placeholder">
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
            {blogItems
              && blogItems?.map((item) => (
                <Col key={item.id} lg={4} sm={6}>
                  <SecondaryArticle
                    id={item.id}
                    title={item.name}
                    text={item.text}
                    createdBy={item.User.name}
                    image={item.Images[0].imageData}
                    imageName={item.Images[0].imageName}
                    createdAt={moment(item.createdAt).format('DD/MM/YY')}
                  />
                </Col>
              ))}
            {!blogItems && (
              <>
                <Col lg={4} sm={6}>
                  <SecondaryArticlePlaceholder />
                </Col>
                <Col lg={4} sm={6}>
                  <SecondaryArticlePlaceholder />
                </Col>
                <Col lg={4} className="blog__third-placeholder">
                  <SecondaryArticlePlaceholder />
                </Col>
              </>
            )}
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
      {selectItems && menuItems?.find((item) => item.id === selectItems) && (
        <ProductCard
          data={menuItems?.find((item) => item.id === selectItems)}
          setSelectItems={setSelectItems}
        />
      )}
    </div>
  );
}

export default Menu;
