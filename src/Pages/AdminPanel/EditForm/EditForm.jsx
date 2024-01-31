import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './EditForm.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RenderEditFormBody from './RenderEditFormBody';
import {
  editData,
  editDataConfig,
  getDataByCategoryId,
} from '../../../Helper/requests';

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

  useEffect(() => {
    console.log('API');
    getDataByCategoryId(category, id).then(setData);
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
    } else {
      const { name, value } = e.target;
      setData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const response = Object.fromEntries(
      Object.entries(data)
        .filter(([key]) => Object.keys(initialState).includes(key))
        .map(([key, value]) => [key, value]),
    );

    console.log(response);

    if (category !== 'user') {
      editDataConfig(category, id, response);
      navigate(`/admin/${category}`);
    } else {
      editData(category, id, response);
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
