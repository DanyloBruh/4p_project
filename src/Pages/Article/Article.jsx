import React from 'react';
// import { useParams } from 'react-router-dom';
import './Article.scss';
import { Container } from 'react-bootstrap';
import Borch from '../../Assets/borsch.jpg';

function Article() {
  // const { id } = useParams();

  return (
    <div className="article">
      <Container>
        <h2>10 unique borscht recipes from different regions of Ukraine</h2>
        <div className="article__header">
          <p>Chloe Williams</p>
          <p>Published: December 06, 2023</p>
        </div>
        <div className="article__main-content">
          <img src={Borch} alt="" />
          <p>
            Ukraine is a land where the languages, customs, and traditions of
            many nationalities are mixed. As a reflection of the soul of the
            country - its cuisine: diverse, colorful, but at the same time
            hearty and light, luxurious and everyday according to the principles
            of its culinary processing. Ukrainian national cuisine was created
            on the basis of elements of culinary culture already formed in each
            of the regional parts of Ukraine. The differences between the dishes
            of Chernihiv Oblast and Galicia, Poltava Oblast and Volhynia,
            Bukovyna and Kharkiv Oblast, Podillia and Transcarpathia have
            survived to this day.
            {' '}
            <br />
            Peculiarities of Ukrainian cuisine are determined by the way of life
            of the people, who were engaged in hard agricultural work. In order
            to fulfill it, people needed hearty high-calorie food. National
            whims demanded that this food be tasty. Our ancestors from ancient
            times knew how to prepare nutritious vegetable, meat and fish food.
            <br />
            {' '}
            What are the names of the dishes worth, you can admire them.
            No amount of imagination is enough to imagine what delicacies are
            hidden behind incomprehensible words: taruta, shpundra, pechenya,
            krucheniki, shulik, potaptsi, uzvar, kulish... You can pronounce
            these words for quite a long time, but what is hidden behind them,
            what kind of dishes are these? It is very difficult to describe, you
            just have to taste it.
            <br />
            {' '}
            From time immemorial, Ukrainians endowed nature with holy
            magical properties, they adored it, because the people made many
            dishes from the pasture, the most important of which was bread.
            Bread is a talisman, a symbol of well-being and wealth, which is
            called to the family by the magical wish `&quot;`bread -
            salt`&quot;`. In ancient times, bread offerings were offered to
            household spirits, for example, to the housekeeper, to the spirits
            of the earth, so that the harvest would be good, to the waterman, so
            that he would not drown livestock and people. Throwing even a small
            piece of bread into the trash was considered a great sin. It was
            once believed that in the next world, people who disrespected the
            shrine would collect all the crumbs thrown away during their earthly
            life. All dishes that were a product of agriculture and had a ritual
            character were called ceremonial bread. This includes a loaf of
            bread, festive kalachs and bagels, meat dumplings, wedding divna and
            Christmas knish, which are used in many ceremonies.
            {' '}
          </p>
        </div>
      </Container>
      <div className="ornament-left" />
      <div className="ornament-rigth" />
    </div>
  );
}

export default Article;
