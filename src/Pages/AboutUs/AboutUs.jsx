/* eslint-disable no-undef */
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './AboutUs.scss';
import ImageComponent from '../../Components/Image/ImageComponent';
import HeaderImg from '../../Assets/aboutus-bg.webp';
import AboutUs1 from '../../Assets/aboutus-1.webp';
import AboutUs2 from '../../Assets/aboutus-2.webp';
import AboutUs3 from '../../Assets/aboutus-3.webp';
import AboutUs4 from '../../Assets/aboutus-4.webp';

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us__header">
        <ImageComponent
          src={HeaderImg}
          alt="dumplings with sour cream and greens"
          hash="2CD[@6~A4T"
          height={410}
          width="100%"
        />
        <h2>good food 4 people</h2>
      </div>
      <Container className="about-us__content">
        <h2>about us</h2>
        <Row>
          <Col lg={6}>
            <ImageComponent
              src={AboutUs1}
              alt="vareniks with onions"
              hash="L7Du-.?b00M{0MR*xut78wNG_MtR"
              height={330}
              width="100%"
              className="about-us__content__img right"
            />
          </Col>
          <Col lg={6}>
            <h2 className="about-us__content__header">Who are we?</h2>
            <p className="about-us__content__text">
              We are Ukrainians who have relocated to the United Kingdom, not in
              pursuit of a brighter future, but as a result of the war that
              commenced on February 24, 2022, in our beloved Ukraine.We will be
              glad to offer you a deeper insight into our Ukrainian world,
              encompassing our culinary delights and artistic creations. We have
              resolved to harness our professional expertise, knowledge, and
              energy to provide a more vivid portrayal of who we are as
              individuals.
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <h2 className="about-us__content__header">Our plan</h2>
            <p className="about-us__content__text">
              The core long term form of our activity will is selling of
              Ukrainian frozen food. One pound from each food item sold will
              help to fund our therapeutic classes for Ukrainian PTSD sufferers.
              We plan to start with support and development of Pottery workshop
              with free masterclasses for PTSD sufferers and then other
              therapeutic activities in near future.
            </p>
          </Col>
          <Col lg={6}>
            <ImageComponent
              src={AboutUs2}
              alt="molded dumplings"
              hash="LUHng7?wpJtRE%%3XTxapIi{Won~"
              height={330}
              width="100%"
              className="about-us__content__img right"
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <ImageComponent
              src={AboutUs3}
              alt="happy employees"
              hash="LEHnQnyW-:xH1,xvIpX8~Br?M{Sg"
              height={330}
              width="100%"
              className="about-us__content__img left"
            />
          </Col>
          <Col lg={6}>
            <h2 className="about-us__content__header">Our events</h2>
            <p className="about-us__content__text">
              We plan to hold events at various venues in which real homemade
              Ukrainian food made by Ukrainians can be tested and will give
              British people and other nationalities the change to savour our
              delicious food and give an insight into Ukrainian cooking. This
              will be accompanied by traditional music and art of the country.
              These events will provide an opportunity for locals and Ukrainians
              to mix and socialise, helping to build bridges between people,
              whilst also providing financial support for Ukrainians in need.
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <h2 className="about-us__content__header">Our purpose</h2>
            <p className="about-us__content__text">
              The brave fighting men of Ukraine, the courageous women and
              children of Ukraine not only suffer from physical injuries from
              the war but also experience severe mental trauma. Many people
              don’t consider this aspect. We aim to make people aware of the
              mental troubles caused by the war to the people of Ukraine and to
              offer our form of support and therapy.
            </p>
          </Col>
          <Col lg={6}>
            <ImageComponent
              src={AboutUs4}
              alt="dumplings with sour cream and greens"
              hash="2CD[@6~A4T"
              height={330}
              width="100%"
              className="about-us__content__img left"
            />
          </Col>
        </Row>
        <div className="ornament-left" />
        <div className="ornament-rigth" />
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  );
}

export default AboutUs;
