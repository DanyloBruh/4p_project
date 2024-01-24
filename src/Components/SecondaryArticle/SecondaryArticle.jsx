/* eslint-disable react/prop-types */
import React from 'react';
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
  return (
    <Link to={`/blog/${id}`}>
      <div className="secondary-article-content">
        <img src={`data:image/png;base64,${image}`} alt={imageName} />

        <h2>{title}</h2>
        <p>{text}</p>
        <div>
          <p>{createdBy}</p>
          <p>{createdAt}</p>
        </div>
      </div>
    </Link>
  );
}

export default SecondaryArticle;
