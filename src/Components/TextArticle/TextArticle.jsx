import React from 'react';
import { Link } from 'react-router-dom';
import './TextArticle.scss';

function TextArticle() {
  return (
    <div className="text-article">
      <h2>Featured Posts</h2>
      <hr />
      <Link to={`/blog/${8952}`}>
        <div className="text-article__post">
          <h2>
            Exploring Ukrainian Cuisine: Traditional Delicacies and Flavors
          </h2>
          <div>
            <p>Emily Johnson</p>
            <p>12/1/22</p>
          </div>
        </div>
      </Link>
      <Link to={`/blog/${8952}`}>
        <div className="text-article__post">
          <h2>
            Exploring Ukrainian Cuisine: Traditional Delicacies and Flavors
          </h2>
          <div>
            <p>Emily Johnson</p>
            <p>12/1/22</p>
          </div>
        </div>
      </Link>
      <Link to={`/blog/${8952}`}>
        <div className="text-article__post">
          <h2>
            Exploring Ukrainian Cuisine: Traditional Delicacies and Flavors
          </h2>
          <div>
            <p>Emily Johnson</p>
            <p>12/1/22</p>
          </div>
        </div>
      </Link>
      <Link to={`/blog/${8952}`}>
        <div className="text-article__post">
          <h2>
            Exploring Ukrainian Cuisine: Traditional Delicacies and Flavors
          </h2>
          <div>
            <p>Emily Johnson</p>
            <p>12/1/22</p>
          </div>
        </div>
      </Link>
      <Link to={`/blog/${8952}`}>
        <div className="text-article__post">
          <h2>
            Exploring Ukrainian Cuisine: Traditional Delicacies and Flavors
          </h2>
          <div>
            <p>Emily Johnson</p>
            <p>12/1/22</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TextArticle;
