import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import './AddForm.scss';

function AddForm() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const category = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('id: ', uuidv4(), formData);
    axios.post('http://localhost:3005/user/', { id: uuidv4(), ...formData });
    navigate(`/admin/${category}`);
  };

  return (
    <div className="add-form">
      <div className="form-bg">
        <h3>
          Add
          {` ${category}`}
        </h3>
        <form>
          <div className="form-element">
            <p>Name</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.name}
              name="name"
            />
          </div>
          <div className="form-element">
            <p>role</p>
            <select
              onChange={handleInputChange}
              value={formData.role}
              name="role"
            >
              <option>admin</option>
              <option>employee</option>
            </select>
          </div>
          <div className="form-element">
            <p>email</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.email}
              name="email"
            />
          </div>
          <div className="form-element">
            <p>password</p>
            <input
              type="password"
              onChange={handleInputChange}
              value={formData.password}
              name="password"
            />
          </div>
          <br />
          <Button variant="outline-light" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
