/* eslint-disable no-undef */
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './AboutUs.scss';
import Dumplings from '../../Assets/dumplings-about-us.webp';
import Shawerma from '../../Assets/shawarma.webp';
import Borsch from '../../Assets/borsch_1.webp';
import Dumplings2 from '../../Assets/dumplings-about-us_2.webp';
import ImageComponent from '../../Components/Image/ImageComponent';

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us__header">
        <ImageComponent
          src={Dumplings2}
          alt="12"
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
              src={Dumplings}
              alt="12"
              hash="L7Du-.?b00M{0MR*xut78wNG_MtR"
              height={330}
              width="100%"
              className="about-us__content__img right"
            />
          </Col>
          <Col lg={6}>
            <h2 className="about-us__content__header">fresh products</h2>
            <p className="about-us__content__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
              libero enim sed faucibus turpis in. Ultrices sagittis orci a
              scelerisque purus semper eget duis at. Eget nunc lobortis mattis
              aliquam faucibus purus. Urna et pharetra pharetra massa massa
              ultricies mi quis. Fames ac turpis egestas maecenas pharetra
              convallis posuere morbi leo.
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <h2 className="about-us__content__header">fast delivery</h2>
            <p className="about-us__content__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
              libero enim sed faucibus turpis in. Ultrices sagittis orci a
              scelerisque purus semper eget duis at. Eget nunc lobortis mattis
              aliquam faucibus purus. Urna et pharetra pharetra massa massa
              ultricies mi quis. Fames ac turpis egestas maecenas pharetra
              convallis posuere morbi leo.
            </p>
          </Col>
          <Col lg={6}>
            <ImageComponent
              src={Shawerma}
              alt="shawerma"
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
              src={Borsch}
              alt="borsch"
              hash="LEHnQnyW-:xH1,xvIpX8~Br?M{Sg"
              height={330}
              width="100%"
              className="about-us__content__img left"
            />
          </Col>
          <Col lg={6}>
            <h2 className="about-us__content__header">delicious food</h2>
            <p className="about-us__content__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
              libero enim sed faucibus turpis in. Ultrices sagittis orci a
              scelerisque purus semper eget duis at. Eget nunc lobortis mattis
              aliquam faucibus purus. Urna et pharetra pharetra massa massa
              ultricies mi quis. Fames ac turpis egestas maecenas pharetra
              convallis posuere morbi leo.
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <h2 className="about-us__content__header">made with love</h2>
            <p className="about-us__content__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
              libero enim sed faucibus turpis in. Ultrices sagittis orci a
              scelerisque purus semper eget duis at. Eget nunc lobortis mattis
              aliquam faucibus purus. Urna et pharetra pharetra massa massa
              ultricies mi quis. Fames ac turpis egestas maecenas pharetra
              convallis posuere morbi leo.
            </p>
          </Col>
          <Col lg={6}>
            <ImageComponent
              src={Dumplings2}
              alt="borsch"
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
