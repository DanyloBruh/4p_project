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
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import Login from './Pages/Login/Login';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import RequireAuth from './Components/Login/RequireAuth';
import PersistLogin from './Components/Login/PersistLogin';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/">
            <Route path=":id?" element={<Menu />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="blog">
            <Route path=":id?" element={<Blog />} />
          </Route>
          <Route path="recipes">
            <Route path=":id?" element={<Recipes />} />
          </Route>

          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={['admin', 'employee']} />}
            >
              <Route path="admin" element={<AdminPanel />}>
                <Route path="product" element={<AdminPanel />} />
                <Route path="instruction" element={<AdminPanel />} />
                <Route path="blog" element={<AdminPanel />} />
                <Route path="order" element={<AdminPanel />} />
              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={['admin']} />}>
              <Route path="admin" element={<AdminPanel />}>
                <Route path="user" element={<AdminPanel />} />
              </Route>
            </Route>

            <Route
              element={<RequireAuth allowedRoles={['admin', 'employee']} />}
            >
              <Route path="addform" element={<AdminPanel />}>
                <Route path="product" element={<AdminPanel />} />
                <Route path="instruction" element={<AdminPanel />} />
                <Route path="blog" element={<AdminPanel />} />
                <Route path="order" element={<AdminPanel />} />
              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={['admin']} />}>
              <Route path="addform" element={<AdminPanel />}>
                <Route path="user" element={<AdminPanel />} />
              </Route>
            </Route>
            <Route
              element={<RequireAuth allowedRoles={['admin', 'employee']} />}
            >
              <Route path="edit" element={<AdminPanel />}>
                <Route path="product/:id" element={<AdminPanel />} />
                <Route path="instruction/:id" element={<AdminPanel />} />
                <Route path="blog/:id" element={<AdminPanel />} />
                <Route path="order/:id" element={<AdminPanel />} />
              </Route>
            </Route>

            <Route
              element={<RequireAuth allowedRoles={['admin']} />}
            >
              <Route path="edit" element={<AdminPanel />}>
                <Route path="user/:id" element={<AdminPanel />} />
              </Route>
            </Route>
          </Route>
          <Route path="privacy-policy" element={<PrivacyPolicy />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
