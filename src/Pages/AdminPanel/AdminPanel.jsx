/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
import React, { useState, useEffect } from 'react';

/* eslint-disable object-curly-newline */
import { Button, Container, Nav, Spinner } from 'react-bootstrap';

import Table from 'react-bootstrap/Table';

import { useSelector } from 'react-redux';
/* eslint-disable object-curly-newline */
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getDataByCategory, deleteData } from '../../Helper/requests';

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

function AdminPanel() {
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.auth.user);

  // const accepted = false;

  const location = useLocation();
  const category = location.pathname.split('/')[2];
  const page = location.pathname.split('/')[1];
  // eslint-disable-next-line no-undef
  const socket = new WebSocket('ws://localhost:3005');

  useEffect(() => {
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const order = JSON.parse(event.data);
      ToastNotification('info', 'A new order has been created');
      setData((d) => [order, ...d]);
    };
  }, []);

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

  const handleDelete = () => {
    deleteData(category, deleteId, axiosPrivate)
      .then(
        setData((prevState) =>
          prevState.filter((item) => item.id !== deleteId),
        ),
      )
      .then(setShow(false));
  };

  const openConfirmDeleteModal = (deleteItemId) => {
    setShow(true);
    setDeleteId(deleteItemId);
  };

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
      return <AddForm data={data} setData={setData} />;
    case 'edit':
      return <EditForm data={data} setData={setData} />;
    default:
      return <tbody />;
  }
}

export default AdminPanel;
