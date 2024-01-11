import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';

function Layout() {
  return (
    <>
      <Header />

      <div className="content">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default Layout;
