import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Menu from './Pages/Menu/Menu';
import Contacts from './Pages/Contacts/Contacts';
import Layout from './Components/Layout/Layout';
import AboutUs from './Pages/AboutUs/AboutUs';
import NotFound from './Pages/NotFound/NotFound';
import Blog from './Pages/Blog/Blog';
import Recipes from './Pages/Recipes/Recipes';
import Recipe from './Pages/Recipe/Recipe';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import AddForm from './Pages/AdminPanel/AddForm/AddForm';
import EditForm from './Pages/AdminPanel/EditForm/EditForm';
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
          <Route path="blog">
            <Route path=":id?" element={<Blog />} />
          </Route>
          <Route path="recipes" element={<Recipes />}>
            <Route path=":id" element={<Recipe />} />
          </Route>
          <Route path="admin" element={<AdminPanel />}>
            <Route path="product" element={<AdminPanel />} />
            <Route path="instruction" element={<AdminPanel />} />
            <Route path="blog" element={<AdminPanel />} />
            <Route path="order" element={<AdminPanel />} />
            <Route path="user" element={<AdminPanel />} />
          </Route>
          <Route path="addform" element={<AddForm />}>
            <Route path="product" element={<AddForm />} />
            <Route path="instruction" element={<AddForm />} />
            <Route path="blog" element={<AddForm />} />
            <Route path="order" element={<AddForm />} />
            <Route path="user" element={<AddForm />} />
          </Route>
          <Route path="edit/:id" element={<EditForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
