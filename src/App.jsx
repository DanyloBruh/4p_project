import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Menu from './Pages/Menu/Menu';
import Contacts from './Pages/Contacts/Contacts';
import Layout from './Components/Layout/Layout';
import AboutUs from './Pages/AboutUs/AboutUs';
import NotFound from './Pages/NotFound/NotFound';
import Blog from './Pages/Blog/Blog';
import Article from './Pages/Article/Article';
import Recipes from './Pages/Recipes/Recipes';
import Recipe from './Pages/Recipe/Recipe';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
// import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Menu />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<Article />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipe/:id" element={<Recipe />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
