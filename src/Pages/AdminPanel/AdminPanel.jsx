/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import {
  Button, Container, Nav, Spinner,
} from 'react-bootstrap';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useSelector } from 'react-redux';
import {
  useLocation,
  useNavigate,
  useSearchParams,
  NavLink,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { getDataByCategory } from '../../Helper/requests';
import Product from './products/product';
import useLogout from '../../Hooks/useLogout';
import getSearchWith from '../../Helper/searchHelper';
import User from './user/user';
import Instruction from './instructions/instruction';
import Blog from './blog/blog';
import Order from './order/order';

function AdminPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [manipulation, setManipulation] = useState(true);
  const query = searchParams.get('query') || '';
  const [loading, setLoading] = useState(false);
  const [archived, setArchived] = useState(false);
  const theme = useTheme(getTheme());

  const fileOptions = useMemo(() => ({
    fileSize: 5242880,
    supportedFormats: ['image/jpg', 'image/jpeg', 'image/png'],
  }), []);

  const user = useSelector((state) => state.auth.auth.user);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const logout = useLogout();

  const location = useLocation();
  const category = location.pathname.split('/')[2];

  const signOut = useCallback(async () => {
    await logout();
    navigate('/login');
  }, []);

  useEffect(() => {
    if (category) {
      setLoading(true);
      getDataByCategory(category, axiosPrivate, archived)
        .then(setData)
        .finally(() => setLoading(false));
    } else {
      navigate('product');
    }
  }, [category, archived]);

  const visibleData = useMemo(() => {
    let dataBuffer = [...data];
    if (data && query) {
      dataBuffer = dataBuffer.filter((obj) => Object.keys(obj).some((key) => {
        if (typeof obj[key] === 'string') {
          const aValue = obj[key].toLowerCase();
          const bValue = query.toLowerCase();
          return aValue.includes(bValue);
        }

        return false;
      }));
    }

    return dataBuffer;
  }, [query, data]);

  return (
    <div className="admin-panel">
      <ToastContainer />
      <Container className="admin-panel__header">
        <h2 className="user-name">
          Welcome
          {` ${user.name}`}
        </h2>
        <div className="selecte-table">
          <Nav className="me-auto">
            <NavLink
              to="product"
              onClick={() => {
                if (category !== 'product') setData([]);
              }}
            >
              product
            </NavLink>
            <NavLink
              to="instruction"
              onClick={() => {
                if (category !== 'instruction') setData([]);
              }}
            >
              recipes
            </NavLink>
            <NavLink
              to="blog"
              onClick={() => {
                if (category !== 'blog') setData([]);
              }}
            >
              blog
            </NavLink>
            <NavLink
              to="order"
              onClick={() => {
                if (category !== 'order') setData([]);
              }}
            >
              orders
            </NavLink>
            {user.role === 'admin' && (
              <NavLink
                to="user"
                onClick={() => {
                  if (category !== 'user') setData([]);
                }}
              >
                users
              </NavLink>
            )}
            <Button variant="outline-light" onClick={signOut}>
              LOGOUT
            </Button>
          </Nav>
        </div>
        {category && (
          <h2>
            List of
              {` ${category}`}
          </h2>
        )}
        {manipulation && (
        <div className="manipulation">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search anything..."
              value={query}
              onChange={(e) => {
                setSearchParams(
                  getSearchWith(searchParams, {
                    query: e.target.value || null,
                  }),
                );
              }}
            />
          </div>
          <div className="checkbox-wrapper-22">
            <label className="switch" htmlFor="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                onChange={() => setArchived(!archived)}
              />
              <div className="slider round" />
            </label>
            <span className="switchText">Archived</span>
          </div>
        </div>
        )}
      </Container>
      <Container>
        {category === 'product'
            && (
            <Product
              nodes={visibleData}
              archived={archived}
              axiosPrivate={axiosPrivate}
              theme={theme}
              fileOptions={fileOptions}
              setManipulation={setManipulation}
            />
            )}
        {category === 'user'
            && (
            <User
              nodes={visibleData}
              archived={archived}
              axiosPrivate={axiosPrivate}
              theme={theme}
              fileOptions={fileOptions}
              setManipulation={setManipulation}
            />
            )}
        {category === 'instruction'
              && (
              <Instruction
                nodes={visibleData}
                archived={archived}
                axiosPrivate={axiosPrivate}
                theme={theme}
                fileOptions={fileOptions}
                setManipulation={setManipulation}
              />
              )}
        {category === 'blog'
              && (
              <Blog
                nodes={visibleData}
                archived={archived}
                axiosPrivate={axiosPrivate}
                theme={theme}
                fileOptions={fileOptions}
                setManipulation={setManipulation}
              />
              )}
        {category === 'order'
              && (
              <Order
                nodes={visibleData}
                archived={archived}
                axiosPrivate={axiosPrivate}
                theme={theme}
                fileOptions={fileOptions}
                setManipulation={setManipulation}
              />
              )}
        {loading && (
          <Spinner
            animation="border"
            variant="light"
            className="spinner"
          />
        )}
        {!loading && data.length === 0 && (
          <h2 className="text-white">Nothing found</h2>
        )}
      </Container>
    </div>
  );
}

export default AdminPanel;
