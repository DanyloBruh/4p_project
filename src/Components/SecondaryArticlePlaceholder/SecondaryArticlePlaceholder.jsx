/* eslint-disable react/prop-types */
import React from 'react';
import './SecondaryArticlePlaceholder.scss';
import { Placeholder } from 'react-bootstrap';

function SecondaryArticlePlaceholder() {
  return (
    <div className="secondary-article-placeholder">
      <div className="secondary-article-placeholder__img" />
      <h2>
        <Placeholder animation="glow">
          <Placeholder xs={6} size="lg" />
          <Placeholder xs={2} size="lg" />
          <Placeholder xs={3} size="lg" />
        </Placeholder>
      </h2>
      <p className="secondary-article-placeholder__text">
        <Placeholder animation="glow">
          <Placeholder xs={3} />
          <Placeholder xs={6} />
          <Placeholder xs={2} />
          <Placeholder xs={4} />
          <Placeholder xs={2} />
          <Placeholder xs={5} />
          <Placeholder xs={2} />
          <Placeholder xs={6} />
          <Placeholder xs={3} />
          <Placeholder xs={3} />
          <Placeholder xs={6} />
          <Placeholder xs={2} />
        </Placeholder>
      </p>

      <p className="secondary-article-placeholder__group">
        <Placeholder animation="glow">
          <Placeholder xs={2} />
          <Placeholder xs={2} />
        </Placeholder>
      </p>
    </div>
  );
}

export default SecondaryArticlePlaceholder;
