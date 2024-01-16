import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './Recipe.scss';

import axios from 'axios';

function Recipe() {
  const [product, setProduct] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3005/product/').then((data) => {
      setProduct(data.data);
    });
  }, []);

  return (
    <div className="recipe">
      <div className="recipe__header" />
      <Container className="recipe__container">
        <h2>Pelmeni</h2>
        <div className="dop-info">
          <div className="dop-info-item">
            <p>Difficulty</p>
            <h3>Medium</h3>
          </div>
          <div className="dop-info-item">
            <p>Cooking time</p>
            <h3>50 minutes </h3>
          </div>
          <div className="dop-info-item">
            <p>Makes</p>
            <h3>4 servings</h3>
          </div>
        </div>
        <div className="descriptions">
          <div className="description">
            <h2>Description</h2>
            <p>
              Pelmeni are cherished for their simplicity and delicious taste.
              They are usually boiled until they float to the surface,
              indicating they are cooked and ready to be served.
            </p>
            {product && (
              <img
                src={`data:image/png;base64,${product[0].Image.imageData}`}
                alt="dumplings-bg"
              />
            )}
          </div>
          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>
              <li>
                <p>500g all-purpose flour</p>
                <hr />
              </li>
              <li>
                <p>220-250ml hot water</p>
                <hr />
              </li>
              <li>
                <p>3 tbsp sunflower oil</p>
                <hr />
              </li>
              <li>
                <p>2-3 cloves garlic</p>
                <hr />
              </li>
              <li>
                <p>100g unsalted butter</p>
                <hr />
              </li>
            </ul>
          </div>
        </div>
        <div className="instructions">
          <h3>Instructions</h3>
          <ul>
            <li>
              <div className="list-text">
                <p className="number">1</p>
                <p>
                  Cut the pork into medium-sized chunks. Their size doesn’t
                  really matter as we’ll be grinding the meat anyway. Peel the
                  onion and garlic cloves.
                </p>
              </div>

              <hr />
            </li>
            <li>
              <div className="list-text">
                <p className="number">2</p>
                <p>
                  In the bowl of a stand mixer equipped with a dough hook,
                  combine the flour, hot water, salt and oil. Knead it on medium
                  speed, until the dough becomes smooth and elastic. If you have
                  a meat grinding attachment, you can multitask and make the
                  ground pork filling while the dough is being kneaded. If not,
                  grind the meat separately. Add a pinch of salt and some
                  freshly-ground pepper.
                </p>
              </div>

              <hr />
            </li>
            <li>
              <div className="list-text">
                <p className="number">3</p>
                <p>
                  Roll the dough into a ball, cover with a kitchen towel and let
                  it rest for about 20 minutes. If you have a rolling
                  attachment, roll the dough out into a thin sheet. If you don’t
                  have an attachment like that, don’t worry – you’ll just have
                  to roll it out using a rolling pin.
                </p>
              </div>
              <hr />
            </li>
            <li>
              <div className="list-text">
                <p className="number">4</p>
                <p>
                  Using the rim of a 4-5cm glass or a round cookie cutter, cut
                  circles from the dough. They should be round and quite small,
                  as the pelmeni are usually dainty and delicate.
                </p>
              </div>
              <hr />
            </li>
          </ul>
        </div>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  );
}

export default Recipe;
