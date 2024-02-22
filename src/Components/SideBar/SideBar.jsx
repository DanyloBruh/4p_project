/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import './SideBar.scss';
import Logo from '../../Assets/logo.png';

function SideBar({ openSideBar, setOpenSideBar }) {
  const location = useLocation();
  useEffect(() => {
    setOpenSideBar(false);
  }, [location]);
  return (
    <div className={`sideBar ${openSideBar ? 'open' : 'close'}`}>
      <img src={Logo} alt="4p logo" />
      <Navbar data-bs-theme="dark" className="sideBar-navbar">
        <Navbar.Collapse id="sidenbar-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/">menu</NavLink>
            <NavLink to="recipes">recipes</NavLink>
            <NavLink to="blog">blog</NavLink>
            <NavLink to="aboutus">about us</NavLink>
            <NavLink to="contacts">contacts</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="sideBar__footer">
        <hr />
        <div className="sideBar__info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M21.875 5.72917C21.875 14.6462 14.6462 21.875 5.72917 21.875C5.32685 21.875 4.92798 21.8603 4.53304 21.8314C4.07981 21.7981 3.85319 21.7816 3.64691 21.6628C3.47605 21.5645 3.31402 21.3901 3.22839 21.2125C3.125 20.9981 3.125 20.748 3.125 20.2479V17.3132C3.125 16.8926 3.125 16.6823 3.19422 16.5021C3.25536 16.3428 3.35468 16.201 3.48344 16.0892C3.6292 15.9625 3.82683 15.8906 4.22209 15.7469L7.56255 14.5322C8.02243 14.365 8.25236 14.2814 8.47052 14.2955C8.66288 14.308 8.848 14.3737 9.00527 14.4852C9.18362 14.6116 9.30951 14.8214 9.56127 15.241L10.4167 16.6667C13.177 15.4166 15.4147 13.1759 16.6667 10.4167L15.241 9.56127C14.8214 9.30951 14.6116 9.18362 14.4852 9.00527C14.3737 8.848 14.308 8.66288 14.2955 8.47052C14.2814 8.25236 14.365 8.02243 14.5322 7.56255L15.7469 4.22209C15.8906 3.82683 15.9625 3.6292 16.0892 3.48344C16.201 3.35468 16.3428 3.25536 16.5021 3.19422C16.6823 3.125 16.8926 3.125 17.3132 3.125H20.2479C20.748 3.125 20.9981 3.125 21.2125 3.22839C21.3901 3.31402 21.5645 3.47605 21.6628 3.64691C21.7816 3.8532 21.7981 4.07981 21.8314 4.53305C21.8603 4.92798 21.875 5.32685 21.875 5.72917Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <a href="tel:+442058971574">+442058971574</a>
        </div>
        <div className="footer-col">
          <div>
            <p>Mon-Fri:</p>
            <p>8am-9pm</p>
          </div>
          <div>
            <p>Sat-Sun:</p>
            <p>8am-1am</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
