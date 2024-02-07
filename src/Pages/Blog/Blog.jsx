/* eslint-disable no-self-compare */
/* eslint-disable operator-linebreak */
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
            <MainArticle
              data={
                allBlogs?.sort(
                  (item1, item2) =>
                    new Date(item2.createdAt) - new Date(item1.createdAt),
                )[0]
              }
            />
          </Col>
          <Col xxl={7} lg={6}>
            <TextArticle />
          </Col>
        </Row>
        <Row className="blog__secondary-article">
          {allBlogs &&
            allBlogs?.map((item) => (
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
          {!allBlogs && (
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
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  ) : (
    <Article blog={allBlogs?.find((item) => item.id === id)} />
  );
}

export default Blog;
