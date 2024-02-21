/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
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
import { getDataByCategory, getDataByCategoryId } from '../../Helper/requests';
import Product from './products/product';
import useLogout from '../../Hooks/useLogout';
import getSearchWith from '../../Helper/searchHelper';
import User from './user/user';
import Instruction from './instructions/instruction';
import Blog from './blog/blog';
import Order from './order/order';
import './AdminPanel.scss';
import ToastNotification from '../../Components/Toast/Toast';

function AdminPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const query = searchParams.get('query') || '';
  const [loading, setLoading] = useState(false);
  const [archived, setArchived] = useState(false);
  const location = useLocation();
  const category = location.pathname.split('/')[2];

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  ${
          category === 'product'
            ? '20%  100px 100px repeat(2, 30%) 78px 88px 78px'
            : category === 'user'
              ? '40% 150px 40% 78px 88px 78px'
              : category === 'blog'
                ? '30% auto 50% 78px 88px 78px'
                : category === 'instruction'
                  ? '25% 130px repeat(3, auto) repeat(3, 25%) 78px 88px 78px'
                  : category === 'order'
                    ? 'auto auto 25% 25% 230px repeat(4, auto) 78px 88px 78px'
                    : ''
        } 
         
      `,
      BaseCell: `
      &:nth-last-of-type(1) {
        right: 0px;
      }
      &:nth-last-of-type(2) {
        right: 78px;
      }
      &:nth-last-of-type(3) {
        right: 166px;
      }
    `,
    },
  ]);

  const fileOptions = useMemo(
    () => ({
      fileSize: 5242880,
      supportedFormats: ['image/jpg', 'image/jpeg', 'image/png'],
    }),
    [],
  );

  const user = useSelector((state) => state.auth.auth.user);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const socket = new WebSocket('ws://localhost:3005');
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const id = JSON.parse(event.data);
      if (category === 'order') {
        getDataByCategoryId('order', id, axiosPrivate).then((order) => {
          ToastNotification('info', 'A new order has been created');
          setData((d) => [order, ...d]);
        });
      }
    };
  }, []);

  const logout = useLogout();

  const signOut = useCallback(async () => {
    await logout();
    navigate('/login');
  }, []);

  useEffect(() => {
    if (category) {
      setLoading(true);
      getDataByCategory(category, axiosPrivate, archived)
        .then((d) => {
          setData(d.reverse());
        })
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
    <>
      <ToastContainer />
      <div className="admin-panel">
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
        </Container>
        {loading
         ? (
           <Spinner animation="border" variant="light" className="spinner" />
        )
      : (
        <>
          {category === 'product' && (
          <Product
            nodes={visibleData}
            archived={archived}
            theme={theme}
            fileOptions={fileOptions}
          />
        )}
          {category === 'user' && (
          <User
            nodes={visibleData}
            archived={archived}
            theme={theme}
            fileOptions={fileOptions}
          />
        )}
          {category === 'instruction' && (
          <Instruction
            nodes={visibleData}
            archived={archived}
            theme={theme}
            fileOptions={fileOptions}
          />
        )}
          {category === 'blog' && (
          <Blog
            nodes={visibleData}
            archived={archived}
            theme={theme}
            fileOptions={fileOptions}
          />
        )}
          {category === 'order' && (
          <Order
            nodes={visibleData.reverse()}
            archived={archived}
            theme={theme}
            fileOptions={fileOptions}
          />
        )}
        </>
      )}
      </div>
    </>
  );
}

export default AdminPanel;
