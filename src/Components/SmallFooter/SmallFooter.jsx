import React from 'react';
import './SmallFooter.scss';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SmallFooter() {
  return (
    <div className="small-footer-body">
      <Container>
        <div className="navigation-text">
          <Link to="/">
            <p>Menu</p>
          </Link>
          <Link to="aboutus">
            <p>About</p>
          </Link>
          <Link to="blog">
            <p>Blog</p>
          </Link>
          <Link to="recipes">
            <p>Recipe</p>
          </Link>
        </div>
      </Container>
      <div className="footer-line" />
      <div className="text-rights">
        <p>© 4P 2024 | All Rights Reserved </p>
      </div>
    </div>
  );
}

export default SmallFooter;
