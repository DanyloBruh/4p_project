import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MainArticle from '../../Components/MainArticle/MainArticle';
import './Blog.scss';
import SecondaryArticle from '../../Components/SecondaryArticle/SecondaryArticle';
import TextArticle from '../../Components/TextArticle/TextArticle';
import { getAllBlogs } from '../../Helper/requests';

function Blog() {
  const [allBlogs, setAllBlogs] = useState();

  useEffect(() => {
    getAllBlogs().then(setAllBlogs);
  }, []);
  console.log(allBlogs);
  return (
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
                createdAt={item.createdAt}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  );
}

export default Blog;
