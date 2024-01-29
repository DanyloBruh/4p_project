import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './AddForm.scss';
import RenderAddFormBody from './RenderAddFormBody';

function AddForm() {
  const category = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();

  let initialState = {};

  switch (category) {
    case 'user':
      initialState = {
        name: '',
        role: '',
        email: '',
        password: '',
      };
      break;
    case 'blog':
      initialState = {
        name: '',
        text: '',
        images: '',
      };
      break;
    case 'product':
      initialState = {
        name: '',
        weight: '',
        description: '',
        price: '',
        ingredients: '',
        image: '',
      };
      break;
    case 'instruction':
      initialState = {
        name: '',
        difficulty: '',
        time: '',
        makes: '',
        description: '',
        ingredients: '',
        text: '',
        image: '',
      };
      break;
    default:
      initialState = {};
  }

  const [formData, setFormData] = useState(initialState);
  console.log(formData);

  const handleInputChange = (e) => {
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      console.log({ ...uploadFile });
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: uploadFile,
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = {
      userId: '2dc855a1-6c19-40fa-bf15-31005ed3013e',
      ...formData,
    };
    if (!formData.role) {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      console.log(response);
      axios
        .post(`http://localhost:3005/${category}/`, response, config)
        .then((res) => console.log(res))
        .catch((er) => console.log(er));
      navigate(`/admin/${category}`);
    } else {
      console.log(response);
      axios
        .post(`http://localhost:3005/${category}/`, response)
        .then((res) => console.log(res))
        .catch((er) => console.log(er));
      navigate(`/admin/${category}`);
    }
  };

  return (
    <div className="add-form">
      <div className="form-bg">
        <h3>
          Add
          {` ${category}`}
        </h3>
        <form>
          <RenderAddFormBody
            handleInputChange={handleInputChange}
            category={category}
            formData={formData}
            setFormData={setFormData}
          />
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
