/* eslint-disable */

import React, { useState, useEffect } from 'react';

import { Container, Nav } from 'react-bootstrap';

import Table from 'react-bootstrap/Table';

import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { fetchUsers } from '../../redux/userSlice';

import './AdminPanel.scss';

import editIcon from '../../Assets/editicon.png';
import deleteIcon from '../../Assets/deleteicon.png';

function AdminPanel() {
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const location = useLocation();

  const RenderTableHeader = function () {
    switch (location.pathname) {
      case '/admin/product':
        return (
          <>
            <th>name</th>
            <th>description</th>
            <th>weight</th>
            <th>price</th>
            <th>ingridients</th>
            <th>
              <img src={editIcon} alt="edit icon" />
            </th>
            <th>
              <img src={deleteIcon} alt="delete icon" />
            </th>
          </>
        );
      case '/admin/recipes':
        return (
          <>
            <th>name</th>
            <th>difficulty</th>
            <th>time</th>
            <th>makes</th>
            <th>description</th>
            <th>ingredients</th>
            <th>text</th>
            <th>
              <img src={editIcon} alt="edit icon" />
            </th>
            <th>
              <img src={deleteIcon} alt="delete icon" />
            </th>
          </>
        );
      case '/admin/blog':
        return (
          <>
            <th>name</th>
            <th>text</th>
            <th>
              <img src={editIcon} alt="edit icon" />
            </th>
            <th>
              <img src={deleteIcon} alt="delete icon" />
            </th>
          </>
        );
      case '/admin/orders':
        return (
          <>
            <th>name</th>
            <th>phoneNumber</th>
            <th>adress</th>
            <th>comment</th>
            <th>paymentType</th>
            <th>deliveryType</th>
            <th>totalAmount</th>
            <th>status</th>
            <th>
              <img src={editIcon} alt="edit icon" />
            </th>
            <th>
              <img src={deleteIcon} alt="delete icon" />
            </th>
          </>
        );
      case '/admin/users':
        return (
          <>
            <th>name</th>
            <th>email</th>
            <th>password</th>
            <th>role</th>
            <th>
              <img src={editIcon} alt="edit icon" />
            </th>
            <th>
              <img src={deleteIcon} alt="delete icon" />
            </th>
          </>
        );
      default:
        return <div style={{ background: 'none' }}></div>;
    }
  };

  const RenderSortBy = function () {
    switch (location.pathname) {
      case '/admin/product':
        return (
          <>
            <option>name</option>
            <option>description</option>
            <option>weight</option>
            <option>price</option>
            <option>ingredients</option>
          </>
        );
      case '/admin/recipes':
        return (
          <>
            <option>name</option>
            <option>difficulty</option>
            <option>time</option>
            <option>makes</option>
            <option>description</option>
            <option>ingredients</option>
            <option>text</option>
          </>
        );
      case '/admin/blog':
        return (
          <>
            <option>name</option>
            <option>text</option>
          </>
        );
      case '/admin/orders':
        return (
          <>
            <option>name</option>
            <option>adress</option>
            <option>comment</option>
            <option>paymentType</option>
            <option>deliveryType</option>
            <option>totalAmount</option>
            <option>status</option>
          </>
        );
      case '/admin/users':
        return (
          <>
            <option>name</option>
            <option>email</option>
            <option>password</option>
            <option>role</option>
          </>
        );
      default:
        return <div style={{ background: 'none' }}></div>;
    }
  };

  return (
    <div className="admin-panel">
      <Container className="admin-panel__header">
        <div className="selecte-table">
          <Nav className="me-auto">
            <NavLink to="product">product</NavLink>
            <NavLink to="recipes">recipes</NavLink>
            <NavLink to="blog">blog</NavLink>
            <NavLink to="orders">orders</NavLink>
            <NavLink to="users">users</NavLink>
          </Nav>
        </div>
        <h2>List of product</h2>
        <div className="manipulation">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search anything..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="dropdown"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <RenderSortBy />
          </select>
        </div>
      </Container>
      <Container className="admin-panel__body">
        <Table>
          <thead>
            <tr>
              <RenderTableHeader />
            </tr>
          </thead>
          {user.loading && <div>Loading...</div>}
          {!user.loading && user.error ? (
            <div>
              Error:
              {user.error}
            </div>
          ) : null}
          {!user.loading && user.users.length ? (
            <tbody>
              {user.users.map((el) => (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.description}</td>
                  <td>{el.weight}</td>
                  <td>{el.price}</td>
                  <td>
                    <button type="button" className="button-edit"></button>
                  </td>
                  <td>
                    <button type="button" className="button-delete"></button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </Table>
        <Link to="/addform" className="table-button">
          ADD
        </Link>
      </Container>
    </div>
  );
}

export default AdminPanel;
