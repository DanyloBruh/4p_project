/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React from 'react';
import HtmlToReactParser from 'html-to-react';
import { Link } from 'react-router-dom';
import './SecondaryArticle.scss';

function SecondaryArticle({
  id,
  title,
  text,
  createdBy,
  createdAt,
  image,
  imageName,
}) {
  const Parser = new HtmlToReactParser.Parser();

  return (
    <Link to={`/blog/${id}`}>
      <div className="secondary-article-content">
        <div className="secondary-article-content__img-container">
          <img src={`data:image/png;base64,${image}`} alt={imageName} />
        </div>

        <h2>{title}</h2>
        <div className="secondary-article-content__text">
          {Parser.parse(text)}
        </div>
        <div>
          <p>{createdBy}</p>
          <p>{createdAt}</p>
        </div>
      </div>
    </Link>
  );
}

export default SecondaryArticle;
