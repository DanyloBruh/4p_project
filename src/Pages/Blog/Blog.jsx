import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MainArticle from '../../Components/MainArticle/MainArticle';
import './Blog.scss';
import SecondaryArticle from '../../Components/SecondaryArticle/SecondaryArticle';
import TextArticle from '../../Components/TextArticle/TextArticle';

function Blog() {
  return (
    <div className="blog">
      <Container>
        <Row className="blog__main-article">
          <Col xxl={5} lg={6}>
            <MainArticle />
          </Col>
          <Col xxl={7} lg={6}>
            <TextArticle />
          </Col>
        </Row>
        <Row className="blog__secondary-article">
          <Col lg={4}>
            <SecondaryArticle />
          </Col>
          <Col lg={4}>
            <SecondaryArticle />
          </Col>
          <Col lg={4}>
            <SecondaryArticle />
          </Col>
          <Col lg={4}>
            <SecondaryArticle />
          </Col>
          <Col lg={4}>
            <SecondaryArticle />
          </Col>
          <Col lg={4}>
            <SecondaryArticle />
          </Col>
        </Row>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  );
}

export default Blog;
