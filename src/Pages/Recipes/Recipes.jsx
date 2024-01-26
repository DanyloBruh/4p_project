/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar';
import RecipeItem from '../../Components/RecipeItem/RecipeItem';

import Shawarma from '../../Assets/shawarma-recipe.png';
import './Recipes.scss';
import { getAllInstractions } from '../../helper/requests';
import Recipe from '../../Components/Recipe/Recipe';
import RecipeItemPlaceholder from '../../Components/RecipeItemPlaceholder/RecipeItemPlaceholder';

function Recipes() {
  const [allRecipes, setAllRecipes] = useState();
  const { id } = useParams();

  useEffect(() => {
    getAllInstractions().then(setAllRecipes);
  }, []);
  return !id ? (
    <div className="recipes">
      <div className="recipes__header" />

      <Container className="recipes__container">
        <h2>Search the recipe you need</h2>
        <div className="search-bar">
          <SearchBar />
        </div>
      </Container>
      <Container>
        <Carousel>
          <Carousel.Item interval={10000}>
            <div className="item-cover">
              <img src={Shawarma} alt="" />
              <div className="carousel-text">
                <h2>Chicken Shawarma Lavash</h2>
                <p>
                  This Chicken Shawarma Lavash takes the flavors you crave when
                  you want shawarma, but rolls it into a lavash. The crispy
                  lettuce (or arugula) and tomato blend perfectly with the
                  chicken shawarma and garlic dill sauce. This is envy inducing
                  lunch, but it also a great after-school snack. It will hold
                  even hungry teens over til dinner.
                </p>
                <button type="button" className="recipes__btn">
                  Jump to recipe
                </button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <div className="item-cover">
              <img src={Shawarma} alt="" />
              <div className="carousel-text">
                <h2>2</h2>
                <p>
                  This Chicken Shawarma Lavash takes the flavors you crave when
                  you want shawarma, but rolls it into a lavash. The crispy
                  lettuce (or arugula) and tomato blend perfectly with the
                  chicken shawarma and garlic dill sauce. This is envy inducing
                  lunch, but it also a great after-school snack. It will hold
                  even hungry teens over til dinner.
                </p>
                <button type="button" className="recipes__btn">
                  Jump to recipe
                </button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <div className="item-cover">
              <img src={Shawarma} alt="" />
              <div className="carousel-text">
                <h2>3</h2>
                <p>
                  This Chicken Shawarma Lavash takes the flavors you crave when
                  you want shawarma, but rolls it into a lavash. The crispy
                  lettuce (or arugula) and tomato blend perfectly with the
                  chicken shawarma and garlic dill sauce. This is envy inducing
                  lunch, but it also a great after-school snack. It will hold
                  even hungry teens over til dinner.
                </p>
                <button type="button" className="recipes__btn">
                  Jump to recipe
                </button>
              </div>
            </div>
          </Carousel.Item>
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
