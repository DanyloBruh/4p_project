import React, { useEffect, useState } from 'react';
import {
  Carousel, Col, Container, Placeholder, Row,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar';
import RecipeItem from '../../Components/RecipeItem/RecipeItem';
import './Recipes.scss';
import { getAllInstractions } from '../../Helper/requests';
import Recipe from '../../Components/Recipe/Recipe';
import RecipeItemPlaceholder from '../../Components/RecipeItemPlaceholder/RecipeItemPlaceholder';

function Recipes() {
  const [allRecipes, setAllRecipes] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (!id && !allRecipes) {
      getAllInstractions().then(setAllRecipes);
    }
  }, [id]);
  return !id ? (
    <div className="recipes">
      <div className="recipes__header">
        <Container className="recipes__container">
          <h2>Search the recipe you need</h2>
          <div className="search-bar">
            <SearchBar />
          </div>
        </Container>
      </div>

      <Container>
        <Carousel>
          {allRecipes
            && allRecipes
              ?.filter((recipe) => recipe.carrousel === true)
              ?.map((recipe) => (
                <Carousel.Item interval={10000}>
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
          {!allRecipes && (
            <Carousel.Item interval={10000}>
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
      </Container>
      <Container className="item-section">
        <Row>
          {allRecipes
            && allRecipes?.map((item) => (
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
          {!allRecipes && (
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
    <Recipe recipe={allRecipes?.find((item) => item.id === id)} />
  );
}

export default Recipes;
