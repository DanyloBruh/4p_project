/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import './MainArticle.scss';
import { Link } from 'react-router-dom';
import { Placeholder } from 'react-bootstrap';

function MainArticle({ data }) {
  return (
    <Link to={`/blog/${data?.id}`}>
      <div className="article-content">
        {data ? (
          <img
            src={`data:image/png;base64,${data.Images[0].imageData}`}
            alt={data.Images[0].imageName}
          />
        ) : (
          <div className="article-content__image-placeholder" />
        )}
        <div>
          {data ? (
            <h2>{data?.name}</h2>
          ) : (
            <h2>
              <Placeholder animation="glow">
                <Placeholder xs={3} size="lg" />
                <Placeholder xs={6} size="lg" />
                <Placeholder xs={2} size="lg" />
                <Placeholder xs={2} size="lg" />
                <Placeholder xs={3} size="lg" />
                <Placeholder xs={6} size="lg" />
              </Placeholder>
            </h2>
          )}
          {data ? (
            <p>{data?.text}</p>
          ) : (
            <p>
              <Placeholder animation="glow">
                <Placeholder xs={3} />
                <Placeholder xs={6} />
                <Placeholder xs={2} />
                <Placeholder xs={2} />
                <Placeholder xs={3} />
                <Placeholder xs={6} />
              </Placeholder>
            </p>
          )}
          <div>
            {data ? (
              <p>{data?.User.name}</p>
            ) : (
              <p className="article-content__text-placeholder">
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
              </p>
            )}
            {data ? (
              <p>{moment(data?.createdAt).format('DD/MM/YY')}</p>
            ) : (
              <p className="article-content__text-date-placeholder">
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MainArticle;
