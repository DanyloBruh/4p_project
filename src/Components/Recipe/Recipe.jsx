/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { Container, Placeholder } from 'react-bootstrap';
import './Recipe.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getRecipeById } from '../../Helper/requests';

function Recipe({ recipe }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '*/*';

  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const [recipeInfo, setRecipeInfo] = useState();

  useLayoutEffect(() => {
    setHeight(ref.current.clientHeight);
  }, [ref?.current?.clientHeight]);

  useEffect(() => {
    function handleWindowResize() {
      setHeight(ref.current.clientHeight);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (id) {
      if (recipe) {
        setRecipeInfo(recipe);
      } else {
        getRecipeById(id)
          .then(setRecipeInfo)
          .catch(() => navigate(from, { replace: true }));
      }
    } else {
      navigate(from, { replace: true });
    }
  }, []);

  return (
    <div className="recipe">
      <div className="recipe__header">
        {recipeInfo ? (
          <img
            src={`data:image/png;base64,${recipeInfo?.Image.imageData}`}
            alt={recipeInfo?.Image.imageName}
          />
        ) : (
          <div className="recipe__header__img-placeholder" />
        )}
        <h2>{recipeInfo?.name}</h2>
      </div>
      <Container className="recipe__container">
        <div className="dop-info">
          <div className="dop-info-item">
            <p>Difficulty</p>
            {recipeInfo ? (
              <h3>{recipeInfo?.difficulty}</h3>
            ) : (
              <h3>
                {' '}
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
              </h3>
            )}
          </div>
          <div className="dop-info-item">
            <p>Cooking time</p>
            {recipeInfo ? (
              <h3>{recipeInfo?.time}</h3>
            ) : (
              <h3>
                {' '}
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
              </h3>
            )}
          </div>
          <div className="dop-info-item">
            <p>Makes</p>
            {recipeInfo ? (
              <h3>{`${recipeInfo?.makes} servings`}</h3>
            ) : (
              <h3>
                {' '}
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
              </h3>
            )}
          </div>
        </div>
        <div className="descriptions">
          <div className="description" ref={ref}>
            <h2>Description</h2>
            {recipeInfo ? (
              <p>{`${recipeInfo?.description}`}</p>
            ) : (
              <p>
                <Placeholder animation="glow">
                  <Placeholder xs={2} />
                  <Placeholder xs={4} />
                  <Placeholder xs={1} />
                  <Placeholder xs={2} />
                  <Placeholder xs={4} />
                  <Placeholder xs={2} />
                  <Placeholder xs={3} />
                  <Placeholder xs={2} />
                  <Placeholder xs={5} />
                  <Placeholder xs={4} />
                  <Placeholder xs={6} />
                  <Placeholder xs={3} />
                  <Placeholder xs={2} />
                  <Placeholder xs={5} />
                  <Placeholder xs={7} />
                  <Placeholder xs={3} />
                </Placeholder>
              </p>
            )}
            {recipeInfo ? (
              <img
                src={`data:image/png;base64,${recipeInfo?.Image.imageData}`}
                alt={recipeInfo?.Image.imageName}
              />
            ) : (
              <div className="img-placeholder" />
            )}
          </div>
          <div className="ingredients" style={{ height }}>
            <h3>Ingredients</h3>
            {recipeInfo ? (
              <ul>
                {recipeInfo?.ingredients.split(' | ').map((item, index) => (
                  <li key={index}>
                    <div>
                      <div className="checkbox-wrapper-32">
                        <input
                          type="checkbox"
                          name={`checkbox-${index}`}
                          id={`checkbox-${index}`}
                        />
                        <label htmlFor={`checkbox-${index}`}>{item}</label>
                        <svg
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M 10 10 L 90 90"
                            stroke="#fff"
                            strokeDasharray="113"
                            strokeDashoffset="113"
                          />
                          <path
                            d="M 90 10 L 10 90"
                            stroke="#fff"
                            strokeDasharray="113"
                            strokeDashoffset="113"
                          />
                        </svg>
                      </div>
                    </div>

                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <p
                style={{ color: '#fff', textAlign: 'left', fontSize: '1.5rem' }}
              >
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                </Placeholder>
              </p>
            )}
          </div>
        </div>
        <div className="instructions">
          <h3>Instructions</h3>

          {recipeInfo ? (
            <ul>
              {recipeInfo?.text.split(' | ').map((item, index) => (
                <li key={index}>
                  <div className="list-text">
                    <p className="number">{index + 1}</p>
                    <p>{item}</p>
                  </div>

                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <h2 style={{ color: '#fff', textAlign: 'left' }}>
              <Placeholder animation="glow">
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={12} />
              </Placeholder>
            </h2>
          )}
        </div>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  );
}

export default Recipe;
