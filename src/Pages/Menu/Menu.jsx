/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import './Menu.scss';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Varenyk from '../../Assets/main-varenyk.webp';
import Borsch from '../../Assets/main-borsch.webp';
import AboutUs1 from '../../Assets/aboutus-1.webp';
import AboutUs2 from '../../Assets/aboutus-2.webp';
import AboutUs3 from '../../Assets/aboutus-3.webp';
import MenuProduct from '../../Components/MenuProduct/MenuProduct';
import SecondaryArticle from '../../Components/SecondaryArticle/SecondaryArticle';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { getAllProducts, getMainBlogs } from '../../Helper/requests';

import MenuProductPlaceholder from '../../Components/MenuProductPlaceholder/MenuProductPlaceholder';
import SecondaryArticlePlaceholder from '../../Components/SecondaryArticlePlaceholder/SecondaryArticlePlaceholder';
import { offScroll, onScroll } from '../../redux/scrollSlice';
import ToastNotification from '../../Components/Toast/Toast';
import ImageComponent from '../../Components/Image/ImageComponent';

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
    getAllProducts()
      .then(setMenuItems)
      .catch(() => ToastNotification('error', 'Something went wrong!'));
    getMainBlogs()
      .then(setBlogItems)
      .catch(() => ToastNotification('error', 'Something went wrong!'));
  }, []);

  return (
    <div className="menu-content" id="top">
      <div className="menu-header">
        <Container className="menu-header__text-box">
          <h2>From people to people</h2>
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
            <ImageComponent
              src={Varenyk}
              alt="varenyks with sour cream and onions"
              hash="L5G*4o~18^%g19yYIAM{02=#.9E1"
              height={505}
              width="100%"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Borsch} alt="borsch" />
          </Carousel.Item>
        </Carousel>
      </div>
      <Container className="menu-main">
        <div id="menu">
          <h2>Menu</h2>
          <p>Explore Ukrainian cuisine now!</p>
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
                We are Ukrainians who have relocated to the United Kingdom, not
                in pursuit of a brighter future, but as a result of the war that
                commenced on February 24, 2022, in our beloved Ukraine
              </p>
            </Col>
            <Col lg={5} md={6}>
              <img src={AboutUs1} alt="vareniks with onions" />
            </Col>
          </Row>
          <Row className="main-page-about-us">
            <Col lg={5} md={6}>
              <img src={AboutUs2} alt="molded dumplings" />
            </Col>
            <Col lg={7} md={6}>
              <p>
                The core long term form of our activity will is selling of
                Ukrainian frozen food. One pound from each food item sold will
                help to fund our therapeutic classes for Ukrainian PTSD
                sufferers.
              </p>
            </Col>
          </Row>
          <Row className="main-page-about-us main-page-about-us__revers">
            <Col lg={7} md={6}>
              <p>
                We plan to hold events at various venues in which real homemade
                Ukrainian food made by Ukrainians can be tested and will give
                British people change to savour our delicious food
              </p>
            </Col>
            <Col lg={5} md={6}>
              <img src={AboutUs3} alt="happy employees" />
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
