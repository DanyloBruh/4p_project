/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import React, { useState, useEffect, useMemo } from 'react';

/* eslint-disable object-curly-newline */
import { Button, Container, Nav, Spinner } from 'react-bootstrap';

import Table from 'react-bootstrap/Table';

import { useSelector } from 'react-redux';
/* eslint-disable object-curly-newline */
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';
import {
  getDataByCategory,
  deleteData,
  getDataByCategoryId,
} from '../../Helper/requests';

import './AdminPanel.scss';
import RenderTableBody from './TableRenderComponent/RenderTableBody';
import RenderTableSortBy from './TableRenderComponent/RenderTableSortBy';
import RenderTableHeader from './TableRenderComponent/RenderTableHeader';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import useLogout from '../../Hooks/useLogout';
import AddForm from './AddForm/AddForm';
import EditForm from './EditForm/EditForm';
import DeleteConfirmModel from '../../Components/DeleteConfirmModel/DeleteConfirmModel';
import ToastNotification from '../../Components/Toast/Toast';
import getSearchWith from '../../Helper/searchHelper';

function AdminPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.auth.user);

  // const accepted = false;

  const location = useLocation();
  const category = location.pathname.split('/')[2];
  const page = location.pathname.split('/')[1];
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    if (category === 'order') {
      // eslint-disable-next-line no-undef
      const socket = new WebSocket('ws://localhost:3005');
      socket.onopen = () => {
        console.log('Connected to WebSocket server');
      };

      socket.onmessage = (event) => {
        const id = JSON.parse(event.data);
        getDataByCategoryId('order', id, axiosPrivate).then((order) => {
          ToastNotification('info', 'A new order has been created');
          setData((d) => [order, ...d]);
        });
      };
    }
  }, [category]);

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    if (category) {
      getDataByCategory(category, axiosPrivate).then(setData);
    } else {
      navigate('product');
    }
  }, [category]);

  const handleDelete = () => {
    deleteData(category, deleteId, axiosPrivate)
      .then(
        setData((prevState) =>
          prevState.filter((item) => item.id !== deleteId),
        ),
      )
      .then(setShow(false));
  };

  const visibleData = useMemo(() => {
    if (data) {
      let dataBuffer = [...data];

      const isData = (value) => new Date(value).getTime() > 0;

      const isNumeric = (value) => /^-?\d+$/.test(value);

      if (query) {
        dataBuffer = dataBuffer.filter((obj) =>
          Object.keys(obj).some((key) => {
            if (typeof obj[key] === 'string') {
              const aValue = obj[key].toLowerCase();
              const bValue = query.toLowerCase();
              return aValue.includes(bValue);
            }

            return false;
          }),
        );
      }

      if (sort) {
        if (sort !== 'none') {
          dataBuffer = dataBuffer.sort((a, b) => {
            if (isNumeric(a[sort]) && isNumeric(b[sort])) {
              return +a[sort] - +b[sort];
            }
            if (isData(a[sort]) && isData(b[sort])) {
              const aValue = new Date(a[sort]).valueOf();
              const bValue = new Date(b[sort]).valueOf();
              return aValue > bValue;
            }

            if (sort === 'carrousel') {
              if (a[sort] === true) {
                return -1;
              }

              return 1;
            }
            if (sort === 'show place') {
              if (a.displayType === 'firstPage') {
                return -1;
              }

              if (a.displayType === 'featured') {
                return -1;
              }

              return 1;
            }
            if (!a[sort] || !b[sort]) {
              return 0;
            }
            const aValue = a[sort].toLowerCase();
            const bValue = b[sort].toLowerCase();
            return aValue.localeCompare(bValue);
          });
        }
      }

      return dataBuffer;
    }

    return [];
  }, [query, sort, data]);

  const openConfirmDeleteModal = (deleteItemId) => {
    setShow(true);
    setDeleteId(deleteItemId);
  };

  console.log(data);

  switch (page) {
    case 'admin':
      return (
        <>
          <ToastContainer />
          <DeleteConfirmModel
            show={show}
            setShow={setShow}
            handleDelete={handleDelete}
            category={category}
          />
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
                  <NavLink
                    to="user"
                    onClick={() => {
                      if (category !== 'user') setData([]);
                    }}
                  >
                    users
                  </NavLink>
                  <Button variant="outline-light" onClick={signOut}>
                    LOGOUT
                  </Button>
                </Nav>
              </div>
              {category && (
                <>
                  <h2>
                    List of
                    {` ${category}`}
                  </h2>
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
                    <Link to={`/addform/${category}`} className="table-button">
                      {`ADD NEW ${category.toUpperCase()}`}
                    </Link>

                    {/* eslint-disable-next-line */}
                    <select
                      className="dropdown"
                      value={sort}
                      onChange={(e) => {
                        setSearchParams(
                          getSearchWith(searchParams, {
                            sort: e.target.value || null,
                          }),
                        );
                      }}
                    >
                      <RenderTableSortBy category={category} />
                    </select>
                  </div>
                </>
              )}
            </Container>
            <Container
              className={classNames('admin-panel__body', {
                orderTable: category === 'order',
              })}
            >
              {visibleData && visibleData.length !== 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <RenderTableHeader
                        category={category}
                        data={visibleData}
                      />
                    </tr>
                  </thead>
                  <RenderTableBody
                    category={category}
                    data={visibleData}
                    openConfirmDeleteModal={openConfirmDeleteModal}
                  />
                </Table>
              ) : (
                <Spinner
                  animation="border"
                  variant="light"
                  className="spinner"
                />
              )}
            </Container>
          </div>
        </>
      );
    case 'addform':
      return <AddForm setData={setData} />;
    case 'edit':
      return <EditForm data={data} setData={setData} />;
    default:
      return <tbody />;
  }
}

export default AdminPanel;
