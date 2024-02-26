/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './Article.scss';
import moment from 'moment';
import HtmlToReactParser from 'html-to-react';
import { Carousel, Container, Placeholder } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getBlogById } from '../../Helper/requests';

function Article({ blog }) {
  const [blogInfo, setBlogInfo] = useState();
  const Parser = new HtmlToReactParser.Parser();
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '*/*';
  useEffect(() => {
    if (id) {
      if (blog) {
        setBlogInfo(blog);
      } else {
        getBlogById(id)
          .then(setBlogInfo)
          .catch(() => navigate(from, { replace: true }));
      }
    } else {
      navigate(from, { replace: true });
    }
  }, []);
  return (
    <div className="article">
      <Container>
        <h2>
          {blogInfo ? (
            blogInfo?.name
          ) : (
            <Placeholder animation="glow">
              <Placeholder xs={2} />
              <Placeholder xs={4} />
              <Placeholder xs={3} />
            </Placeholder>
          )}
        </h2>
        <div className="article__header">
          {blogInfo ? (
            <p>{blogInfo?.User.name}</p>
          ) : (
            <p style={{ width: 100 }}>
              <Placeholder
                animation="glow"
                style={{ display: 'flex', width: '100%' }}
              >
                <Placeholder xs={5} />
                <Placeholder xs={7} />
              </Placeholder>
            </p>
          )}
          {blogInfo ? (
            <p>{moment(blogInfo?.createdAt).format('MMMM DD, YYYY')}</p>
          ) : (
            <p style={{ width: 100 }}>
              <Placeholder
                animation="glow"
                style={{ display: 'flex', width: '100%' }}
              >
                <Placeholder xs={7} />
                <Placeholder xs={5} />
              </Placeholder>
            </p>
          )}
        </div>
        <div className="article__main-content">
          {blogInfo ? (
            blogInfo.Images.length > 1 ? (
              <Carousel>
                {blogInfo?.Images.map((data) => (
                  <Carousel.Item key={data.id}>
                    <img
                      src={`data:image/png;base64,${data.imageData}`}
                      alt={data.imageName}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <img
                src={`data:image/png;base64,${blogInfo?.Images[0].imageData}`}
                alt={blogInfo?.Images[0].imageName}
              />
            )
          ) : (
            <div className="article__img-placeholder" />
          )}

          {blogInfo ? (
            Parser.parse(blogInfo?.text)
          ) : (
            <p>
              {' '}
              <Placeholder animation="glow">
                <Placeholder xs={2} />
                <Placeholder xs={3} />
                <Placeholder xs={3} />
                <Placeholder xs={3} />
                <Placeholder xs={1} />
                <Placeholder xs={4} />
                <Placeholder xs={3} />
                <Placeholder xs={4} />
                <Placeholder xs={5} />
                <Placeholder xs={2} />
                <Placeholder xs={3} />
                <Placeholder xs={3} />
                <Placeholder xs={4} />
                <Placeholder xs={2} />
                <Placeholder xs={3} />
                <Placeholder xs={4} />
                <Placeholder xs={6} />
                <Placeholder xs={4} />
                <Placeholder xs={2} />
                <Placeholder xs={3} />
                <Placeholder xs={8} />
                <Placeholder xs={5} />
                <Placeholder xs={3} />
                <Placeholder xs={5} />
                <Placeholder xs={2} />
                <Placeholder xs={4} />
                <Placeholder xs={6} />
                <Placeholder xs={4} />
              </Placeholder>
            </p>
          )}
        </div>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  );
}

export default Article;
