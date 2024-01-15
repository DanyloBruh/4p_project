import { Carousel, Col, Container, Row } from "react-bootstrap";
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";
import RecipeItem from "../../Components/RecipeItem/RecipeItem.jsx";

import Borch from "../../Assets/recipe-item-borch.jpg";
import Shawarma from "../../Assets/shawarma-recipe.png";
import "./Recipes.scss";

function Recipes() {
  return (
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
                <button className="recipes__btn">Jump to recipe</button>
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
                <button className="recipes__btn">Jump to recipe</button>
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
                <button className="recipes__btn">Jump to recipe</button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container className="item-section">
        <Row>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <RecipeItem img={Borch} />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <RecipeItem img={Borch} />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <RecipeItem img={Borch} />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <RecipeItem img={Borch} />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <RecipeItem img={Borch} />
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12}>
            <RecipeItem img={Borch} />
          </Col>
        </Row>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  );
}
export default Recipes;
