import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './EditForm.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import RenderEditFormBody from './RenderEditFormBody';

function EditForm() {
  const category = useLocation().pathname.split('/')[2];
  const { id } = useParams();
  const navigate = useNavigate();

  let initialState = {};

  switch (category) {
    case 'user':
      initialState = {
        name: '',
        email: '',
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

  const [data, setData] = useState(initialState);
  const [editedData, setEditedData] = useState(initialState);

  console.log('editedData', editedData);

  useEffect(() => {
    console.log('API');
    axios
      .get(`http://localhost:3005/${category}/${id}`)
      .then((res) => setData(res.data))
      .catch((er) => console.log(er));
  }, []);

  console.log('data', data);

  const handleInputChange = (e) => {
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      console.log({ ...uploadFile });
      setData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: uploadFile,
      }));
      setEditedData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: uploadFile,
      }));
    } else {
      const { name, value } = e.target;
      setData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setEditedData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const response = {
      ...editedData,
    };
    if (!response.role) {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios
        .patch(`http://localhost:3005/${category}/${id}`, response, config)
        .then((res) => console.log(res))
        .catch((er) => console.log(er));
      navigate(`/admin/${category}`);
    } else {
      axios
        .patch(`http://localhost:3005/${category}/${id}`, response)
        .then((res) => console.log(res))
        .catch((er) => console.log(er));
      navigate(`/admin/${category}`);
    }
  };

  return (
    <div className="add-form">
      <div className="form-bg">
        <h3>
          Edit
          {` ${category}`}
        </h3>
        <form>
          <RenderEditFormBody
            handleInputChange={handleInputChange}
            category={category}
            data={data}
          />
          <br />
          <Button variant="outline-light" onClick={handleUpdate}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
