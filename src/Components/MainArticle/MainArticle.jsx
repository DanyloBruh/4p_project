/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import './MainArticle.scss';
import { Link } from 'react-router-dom';

function MainArticle({ data }) {
  return (
    <Link to={`/blog/${data?.id}`}>
      <div className="article-content">
        <img
          src={`data:image/png;base64,${data?.Images[0].imageData}`}
          alt={data?.Images[0].imageName}
        />
        <div>
          <h2>{data?.name}</h2>
          <p>{data?.text}</p>
          <div>
            <p>{data?.User.name}</p>
            <p>{moment(data?.createdAt).format('DD/MM/YY')}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MainArticle;
