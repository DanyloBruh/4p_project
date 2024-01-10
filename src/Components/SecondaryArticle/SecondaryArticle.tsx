import { Link } from "react-router-dom";
import Borch from "../../Assets/borsch.jpg";
import "./SecondaryArticle.scss";

function SecondaryArticle() {
  return (
    <Link to={`/blog/${5987}`}>
      <div className="secondary-article-content">
        <img src={Borch} alt="" />
        <h2>
          Delightful Ukrainian Fare: A Journey Through Traditional Cuisine
        </h2>
        <p>
          Experience the rich tapestry of Ukrainian culinary traditions with our
          immersive journey through this vibrant cuisine. From hearty borscht to
          the beloved varenyky, immerse yourself in the flavors that define
          Ukrainian gastronomy...
        </p>
        <div>
          <p>Ava Martinez</p>
          <p>12/13/22</p>
        </div>
      </div>
    </Link>
  );
}

export default SecondaryArticle;
