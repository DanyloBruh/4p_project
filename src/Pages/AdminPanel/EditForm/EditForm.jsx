import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import '../AddForm/AddForm.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RenderEditFormBody from './RenderEditFormBody';
import {
  editData,
  editDataConfig,
  getDataByCategoryId,
} from '../../../Helper/requests';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

import {
  validateUser,
  validateBlog,
  validateInstruction,
  validateProduct,
} from '../ValidationFunctions';

function EditForm() {
  const category = useLocation().pathname.split('/')[2];
  const { id } = useParams();
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const [errorMsg, setErrorMsg] = useState('');
  let isValidated = true;

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

  const [data, setData] = useState(initialState);

  useEffect(() => {
    getDataByCategoryId(category, id, axiosPrivate).then(setData);
  }, []);

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

    switch (category) {
      case 'user':
        setErrorMsg(validateUser(data).msg);
        isValidated = validateUser(data).isValidated;
        break;
      case 'product':
        setErrorMsg(validateProduct(data).msg);
        isValidated = validateProduct(data).isValidated;
        break;
      case 'blog':
        setErrorMsg(validateBlog(data).msg);
        isValidated = validateBlog(data).isValidated;
        break;
      case 'instruction':
        setErrorMsg(validateInstruction(data).msg);
        isValidated = validateInstruction(data).isValidated;
        break;
      default:
        setErrorMsg('');
    }

    if (!isValidated) return;

    if (category !== 'user') {
      editDataConfig(category, id, axiosPrivate, response);
      navigate(`/admin/${category}`);
    } else {
      editData(category, id, axiosPrivate, response);
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
          {isValidated && errorMsg !== '' && <p>{`${errorMsg}`}</p>}
          <Button variant="outline-light" onClick={handleUpdate}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
