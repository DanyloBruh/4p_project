// import React, { useEffect, useState } from 'react';
import React from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
// import axios from 'axios';
import editIcon from '../../Assets/editicon.png';
import deleteIcon from '../../Assets/deleteicon.png';
import './AdminPanel.scss';

function AdminPanel() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3005/product/')
  //     .then((res) => setData(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="admin-panel">
      <Container className="admin-panel__header">
        <h2>List of product</h2>
        <div className="manipulation">
          <div className="search-bar">
            <input type="text" placeholder="Search anything..." />
          </div>
          <Dropdown>
            <Dropdown.Toggle>Sort by</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">name</Dropdown.Item>
              <Dropdown.Item href="#/action-2">description</Dropdown.Item>
              <Dropdown.Item href="#/action-3">weight</Dropdown.Item>
              <Dropdown.Item href="#/action-3">price</Dropdown.Item>
              <Dropdown.Item href="#/action-3">user name</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
      <Container className="admin-panel__body">
        <Table>
          <thead>
            <tr>
              <th>name</th>
              <th>description</th>
              <th>weight</th>
              <th>price</th>
              <th>user name</th>
              <th>
                <img src={editIcon} alt="edit icon" />
              </th>
              <th>
                <img src={deleteIcon} alt="delete icon" />
              </th>
            </tr>
          </thead>
          <tbody />
        </Table>
      </Container>
    </div>
  );
}

export default AdminPanel;
