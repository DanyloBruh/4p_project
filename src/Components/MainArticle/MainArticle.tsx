import "./MainArticle.scss";
import Borch from "../../Assets/borsch.jpg";

function MainArticle() {
  return (
    <div className="article-content">
      <img src={Borch} alt="" />
      <div>
        <h2>10 unique borscht recipes from different regions of Ukraine</h2>
        <p>Culinary Diversity of Ukraine: A Look at Traditional Borscht through the Variety of Regional Recipes</p>
        <div>
            <p>Noah White</p>
            <p>07/01/22</p>
        </div>
      </div>
    </div>
  );
}

export default MainArticle;
