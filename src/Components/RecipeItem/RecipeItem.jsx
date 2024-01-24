/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import './RecipeItem.scss';
import { Link } from 'react-router-dom';

function RecipeItem({
  id, title, description, image, imageName,
}) {
  return (
    <Link key={id} to={`/recipe/${id}`}>
      <div className="recipe-card">
        <img
          className="recipe-card-img"
          src={`data:image/png;base64,${image}`}
          alt={imageName}
        />
        <div className="recipe-card-body">
          <div className="recipe-card-title">{title}</div>
          <div className="recipe-card-text">{description}</div>
          <Button variant="outline-light">read more</Button>
        </div>
      </div>
    </Link>
  );
}

export default RecipeItem;
