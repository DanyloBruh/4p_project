import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';

function Layout() {
  const location = useLocation();
  // eslint-disable-next-line
  if (
    !location.pathname.match('^/admin/')
    && location.pathname !== '/addform'
    && location.pathname !== '/admin'
    && location.pathname !== '/login'
    && !location.pathname.match('^/edit/')
  ) {
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
  return (
    <div className="content">
      <Outlet />
    </div>
  );
}

export default Layout;
