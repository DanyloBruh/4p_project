/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from 'react-bootstrap';
import './Recipe.scss';

function Recipe({ recipe }) {
  return (
    <div className="recipe">
      <div className="recipe__header">
        <h2>{recipe?.name}</h2>
      </div>
      <Container className="recipe__container">
        <div className="dop-info">
          <div className="dop-info-item">
            <p>Difficulty</p>
            <h3>{recipe?.difficulty}</h3>
          </div>
          <div className="dop-info-item">
            <p>Cooking time</p>
            <h3>{recipe?.time}</h3>
          </div>
          <div className="dop-info-item">
            <p>Makes</p>
            <h3>{`${recipe?.makes} servings`}</h3>
          </div>
        </div>
        <div className="descriptions">
          <div className="description">
            <h2>Description</h2>
            <p>{recipe?.description}</p>
            <img
              src={`data:image/png;base64,${recipe?.Image.imageData}`}
              alt={recipe?.Image.imageName}
            />
          </div>
          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>
              {recipe?.ingredients.split('|').map((item, index) => (
                <li key={index}>
                  <p>{item}</p>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="instructions">
          <h3>Instructions</h3>
          <ul>
            {recipe?.text.split('|').map((item, index) => (
              <li key={index}>
                <div className="list-text">
                  <p className="number">{index + 1}</p>
                  <p>{item}</p>
                </div>

                <hr />
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  );
}

export default Recipe;
