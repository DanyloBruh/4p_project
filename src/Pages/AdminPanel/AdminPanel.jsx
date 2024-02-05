import React, { useState, useEffect } from 'react';

/* eslint-disable object-curly-newline */
import { Button, Container, Nav, Spinner } from 'react-bootstrap';

import Table from 'react-bootstrap/Table';

import { useSelector } from 'react-redux';
/* eslint-disable object-curly-newline */
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getDataByCategory } from '../../Helper/requests';

import './AdminPanel.scss';
import RenderTableBody from './TableRenderComponent/RenderTableBody';
import RenderTableSortBy from './TableRenderComponent/RenderTableSortBy';
import RenderTableHeader from './TableRenderComponent/RenderTableHeader';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import useLogout from '../../Hooks/useLogout';
import AddForm from './AddForm/AddForm';
import EditForm from './EditForm/EditForm';

function AdminPanel() {
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');

  const [data, setData] = useState([]);
  const orders = useSelector((state) => state.orderData.data);

  const location = useLocation();
  const category = location.pathname.split('/')[2];
  const page = location.pathname.split('/')[1];

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const logout = useLogout();

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

  switch (page) {
    case 'admin':
      return (
        <div className="admin-panel">
          <Container className="admin-panel__header">
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
                    if (category !== 'order') setData([]);
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
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Link to={`/addform/${category}`} className="table-button">
                    {`ADD NEW ${category.toUpperCase()}`}
                  </Link>

                  {/* eslint-disable-next-line */}
                  <select
                    className="dropdown"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                  >
                    <RenderTableSortBy category={category} />
                  </select>
                </div>
              </>
            )}
          </Container>
          <Container className="admin-panel__body">
            {data && data.length !== 0 ? (
              <Table>
                <thead>
                  <tr>
                    <RenderTableHeader category={category} data={data} />
                  </tr>
                </thead>
                <RenderTableBody
                  category={category}
                  data={data}
                  setData={setData}
                  orders={orders}
                />
              </Table>
            ) : (
              <Spinner animation="border" variant="light" className="spinner" />
            )}
          </Container>
        </div>
      );
    case 'addform':
      return <AddForm data={data} setData={setData} />;
    case 'edit':
      return <EditForm data={data} />;
    default:
      return <tbody />;
  }
}

export default AdminPanel;
