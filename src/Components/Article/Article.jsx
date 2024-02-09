/* eslint-disable react/prop-types */
import React from 'react';
import './Article.scss';
import moment from 'moment';
import HtmlToReactParser from 'html-to-react';
import { Container } from 'react-bootstrap';

function Article({ blog }) {
  const Parser = new HtmlToReactParser.Parser();

  return (
    <div className="article">
      <Container>
        <h2>{blog?.name}</h2>
        <div className="article__header">
          <p>{blog?.User.name}</p>
          <p>{moment(blog?.createdAt).format('MMMM DD, YYYY')}</p>
        </div>
        <div className="article__main-content">
          <img
            src={`data:image/png;base64,${blog?.Images[0].imageData}`}
            alt={blog?.Images[0].imageName}
          />
          {Parser.parse(blog?.text)}
        </div>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  );
}

export default Article;
