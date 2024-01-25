/* eslint-disable react/prop-types */
import React from 'react';
import './RecipeItem.scss';
import { Link } from 'react-router-dom';

function RecipeItem({
  id, title, description, image, imageName,
}) {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${id}`}>
        <img
          className="recipe-card-img"
          src={`data:image/png;base64,${image}`}
          alt={imageName}
        />
      </Link>
      <div className="recipe-card-body">
        <div className="recipe-card-title">{title}</div>
        <div className="recipe-card-text">{description}</div>
        <Link to={`/recipe/${id}`} className="btn btn-outline-light">
          read more
        </Link>
      </div>
    </div>
  );
}

export default RecipeItem;
