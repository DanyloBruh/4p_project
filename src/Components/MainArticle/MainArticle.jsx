import React from 'react';
import './MainArticle.scss';
import { Link } from 'react-router-dom';
import Borch from '../../Assets/borsch.jpg';

function MainArticle() {
  return (
    <Link to={`/blog/${123}`}>
      <div className="article-content">
        <img src={Borch} alt="" />
        <div>
          <h2>10 unique borscht recipes from different regions of Ukraine</h2>
          <p>
            Culinary Diversity of Ukraine: A Look at Traditional Borscht through
            the Variety of Regional Recipes
          </p>
          <div>
            <p>Noah White</p>
            <p>07/01/22</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MainArticle;
