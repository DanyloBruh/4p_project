/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';
import BuyList from '../buyList/BuyList';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  const location = useLocation();
  // eslint-disable-next-line
  if (
    !location.pathname.match('^/admin/')
    && location.pathname !== '/addform'
    && location.pathname !== '/admin'
    && location.pathname !== '/login'
    && !location.pathname.match('^/edit/')
    && !location.pathname.match('^/addform/')
  ) {
    return (
      <>
        <Header />
        <BuyList />
        <ToastContainer />

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
