/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Carousel, Col, Container, Placeholder, Row,
} from 'react-bootstrap';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar';
import RecipeItem from '../../Components/RecipeItem/RecipeItem';
import './Recipes.scss';
import { getAllInstractions } from '../../Helper/requests';
import Recipe from '../../Components/Recipe/Recipe';
import RecipeItemPlaceholder from '../../Components/RecipeItemPlaceholder/RecipeItemPlaceholder';
import getSearchWith from '../../Helper/searchHelper';
import ToastNotification from '../../Components/Toast/Toast';
import ImageComponent from '../../Components/Image/ImageComponent';
import RecipeBg from '../../Assets/recipe-bg.webp';

function Recipes() {
  const [allRecipes, setAllRecipes] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { id } = useParams();
  useEffect(() => {
    if (!id && !allRecipes) {
      getAllInstractions()
        .then(setAllRecipes)
        .catch(() => ToastNotification('error', 'Something went wrong!'));
    }
  }, [id]);

  const visibleRecipes = useMemo(() => {
    if (allRecipes) {
      let dataBuffer = [...allRecipes];

      if (query) {
        dataBuffer = dataBuffer.filter((obj) =>
          Object.keys(obj).some((key) => {
            if (typeof obj[key] === 'string') {
              const aValue = obj[key].toLowerCase();
              const bValue = query.toLowerCase();
              return aValue.includes(bValue);
            }

            return false;
          }));
      }
      return dataBuffer;
    }

    return [];
  }, [query, allRecipes]);
  return !id ? (
    <div className="recipes">
      <div className="recipes__header">
        <ImageComponent
          src={RecipeBg}
          alt="12"
          hash="1XELW:}["
          height={505}
          width={window.innerWidth}
        />
        <Container className="recipes__container">
          <h2>Search the recipe you need</h2>
          <div className="search-bar">
            <SearchBar
              value={query}
              handleChange={(e) => {
                setSearchParams(
                  getSearchWith(searchParams, {
                    query: e.target.value || null,
                  }),
                );
              }}
            />
          </div>
        </Container>
      </div>

      <Container>
        {query === '' && (
          <Carousel>
            {visibleRecipes.length > 0
              && visibleRecipes
                ?.filter((recipe) => recipe.carrousel === true)
                ?.map((recipe) => (
                  <Carousel.Item key={recipe.id} interval={10000}>
                    <div className="item-cover">
                      <img
                        className="recipe-card-img"
                        src={`data:image/png;base64,${recipe.Image.imageData}`}
                        alt={recipe.Image.imageName}
                      />
                      <div className="carousel-text">
                        <h2>{recipe.name}</h2>
                        <p>{recipe.description}</p>
                        <Link
                          to={`/recipes/${recipe.id}`}
                          className="btn btn-outline-light"
                        >
                          Jump to recipe
                        </Link>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
            {!visibleRecipes.length > 0 && (
              <Carousel.Item>
                <div className="item-cover">
                  <div className="placeholder-img" />

                  <div className="carousel-placeholder-text">
                    <h2>
                      <Placeholder animation="glow">
                        <Placeholder xs={4} />
                        <Placeholder xs={1} />
                        <Placeholder xs={3} />
                        <Placeholder xs={2} />
                      </Placeholder>
                    </h2>
                    <p>
                      {' '}
                      <Placeholder animation="glow">
                        <Placeholder xs={2} />
                        <Placeholder xs={4} />
                        <Placeholder xs={3} />
                        <Placeholder xs={5} />
                        <Placeholder xs={2} />
                        <Placeholder xs={3} />
                        <Placeholder xs={4} />
                        <Placeholder xs={2} />
                      </Placeholder>
                    </p>
                    <Placeholder.Button variant="outline-light" />
                  </div>
                </div>
              </Carousel.Item>
            )}
          </Carousel>
        )}
      </Container>
      <Container className="item-section">
        <Row>
          {visibleRecipes.length > 0
            && visibleRecipes?.map((item) => (
              <Col key={item.id} xxl={4} xl={4} lg={4} md={6} sm={6}>
                <RecipeItem
                  id={item.id}
                  title={item.name}
                  description={item.description}
                  image={item.Image.imageData}
                  imageName={item.Image.imageName}
                />
              </Col>
            ))}
          {!visibleRecipes.length > 0 && query !== '' && (
            <h2 className="not-found">Nothing found</h2>
          )}
          {!visibleRecipes.length > 0 && query === '' && (
            <>
              <Col xxl={4} xl={4} lg={4} md={6} sm={6}>
                <RecipeItemPlaceholder />
              </Col>
              <Col xxl={4} xl={4} lg={4} md={6} sm={6}>
                <RecipeItemPlaceholder />
              </Col>
              <Col
                xxl={4}
                xl={4}
                lg={4}
                md={6}
                sm={6}
                className="menu-product-third-placeholder"
              >
                <RecipeItemPlaceholder />
              </Col>
            </>
          )}
        </Row>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  ) : (
    <Recipe recipe={visibleRecipes?.find((item) => item.id === id)} />
  );
}

export default Recipes;
