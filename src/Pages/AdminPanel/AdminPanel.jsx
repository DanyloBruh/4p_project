import React, { useState, useEffect } from 'react';

import { Container, Nav } from 'react-bootstrap';

import Table from 'react-bootstrap/Table';

import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { getDataByCategory } from '../../Helper/requests';

import './AdminPanel.scss';
import RenderTableBody from './TableRenderComponent/RenderTableBody';
import RenderTableSortBy from './TableRenderComponent/RenderTableSortBy';
import RenderTableHeader from './TableRenderComponent/RenderTableHeader';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';

function AdminPanel() {
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');

  const [data, setData] = useState([]);

  const orders = useSelector((state) => state.orderData.data);

  const location = useLocation();
  const category = location.pathname.split('/')[2];

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (category) {
      getDataByCategory(category, axiosPrivate).then(setData);
    }
  }, [category, '']);

  return (
    <div className="admin-panel">
      <Container className="admin-panel__header">
        <div className="selecte-table">
          <Nav className="me-auto">
            <NavLink to="product">product</NavLink>
            <NavLink to="instruction">recipes</NavLink>
            <NavLink to="blog">blog</NavLink>
            <NavLink to="order">orders</NavLink>
            <NavLink to="user">users</NavLink>
          </Nav>
        </div>
        {category ? (
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
        ) : (
          <h2 className="">Choose category ^</h2>
        )}
      </Container>
      <Container className="admin-panel__body">
        <Table>
          <thead>
            <tr>
              <RenderTableHeader category={category} data={data} />
            </tr>
          </thead>
          {category ? (
            <RenderTableBody
              category={category}
              data={data}
              setData={setData}
              orders={orders}
            />
          ) : (
            <tbody />
          )}
        </Table>
        {category ? (
          <Link to={`/addform/${category}`} className="table-button">
            ADD
          </Link>
        ) : (
          <div />
        )}
      </Container>
    </div>
  );
}

export default AdminPanel;
