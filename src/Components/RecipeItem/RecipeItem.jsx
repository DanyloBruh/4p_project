/* eslint-disable react/prop-types */
import React from 'react';

import { Button } from 'react-bootstrap';

import './RecipeItem.scss';
import { Link } from 'react-router-dom';
import Borsh from '../../Assets/borsch.jpg';

function RecipeItem({
  id, data, title, description,
}) {
  return (
    <Link key={id} to={`/recipe/${id}`}>
      <div className="recipe-item">
        <div className="recipe-card">
          {/* <img className="recipe-card-img"
          src={`data:image/png;base64,${image}`} alt="dumplings-bg" /> */}

          <img className="recipe-card-img" src={Borsh} alt="card-img" />
          <div className="recipe-card-body">
            <div className="recipe-card-date">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                  fill="none"
                >
                  <path
                    d="M2 15.6111H37M9.77778 2V5.88889M29.2222 2V5.88889M8.22222 37H30.7778C32.9557 37 34.0448 37 34.8767 36.5761C35.6084 36.2034 36.2034 35.6084 36.5761 34.8767C37 34.0448 37 32.9557 37 30.7778V12.1111C37 9.93312 37 8.84413 36.5761 8.01226C36.2034 7.28051 35.6084 6.68559 34.8767 6.31276C34.0448 5.88889 32.9557 5.88889 30.7778 5.88889H8.22222C6.04425 5.88889 4.95524 5.88889 4.12337 6.31276C3.39162 6.68559 2.7967 7.28051 2.42387 8.01226C2 8.84413 2 9.93312 2 12.1111V30.7778C2 32.9557 2 34.0448 2.42387 34.8767C2.7967 35.6084 3.39162 36.2034 4.12337 36.5761C4.95524 37 6.04423 37 8.22222 37Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="recipe-card-text">{data}</div>
            </div>
            <div className="recipe-card-title">{title}</div>
            <div className="recipe-card-text">{description}</div>
            <Button variant="outline-light">read more</Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeItem;
