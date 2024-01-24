import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import MainArticle from '../../Components/MainArticle/MainArticle';
import './Blog.scss';
import SecondaryArticle from '../../Components/SecondaryArticle/SecondaryArticle';
import TextArticle from '../../Components/TextArticle/TextArticle';
import { getAllBlogs } from '../../Helper/requests';
import SecondaryArticlePlaceholder from '../../Components/SecondaryArticlePlaceholder/SecondaryArticlePlaceholder';
import Article from '../../Components/Article/Article';

function Blog() {
  const [allBlogs, setAllBlogs] = useState();
  const { id } = useParams();

  useEffect(() => {
    getAllBlogs().then(setAllBlogs);
  }, []);

  return !id ? (
    <div className="blog__content">
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
          {allBlogs?.map((item) => (
            <Col key={item.id} lg={4}>
              <SecondaryArticle
                id={item.id}
                title={item.name}
                text={item.text}
                createdBy={item.User.name}
                createdAt={moment(item.createdAt).format('DD/MM/YY')}
              />
            </Col>
          ))}
          <Col lg={4} sm={6}>
            <SecondaryArticlePlaceholder />
          </Col>
          <Col lg={4} sm={6}>
            <SecondaryArticlePlaceholder />
          </Col>
          <Col lg={4} className="blog__third-placeholder">
            <SecondaryArticlePlaceholder />
          </Col>
        </Row>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  ) : (
    <Article />
  );
}

export default Blog;
