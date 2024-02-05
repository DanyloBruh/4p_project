import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../AddForm/AddForm.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RenderEditFormBody from './RenderEditFormBody';
import { editData, editDataConfig } from '../../../Helper/requests';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import {
  validateUser,
  validateBlog,
  validateInstruction,
  validateProduct,
} from '../ValidationFunctions';

/* eslint-disable react/prop-types */
function EditForm({ data }) {
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

  const [editedData, setEditedData] = useState(data.find((el) => el.id === id));

  // useEffect(() => {
  //   getDataByCategoryId(category, id, axiosPrivate).then(setData);
  // }, []);
  console.log('data', data);
  console.log('edited', editedData);

  const handleInputChange = (e) => {
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      console.log({ ...uploadFile });
      setEditedData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: uploadFile,
      }));
    } else {
      const { name, value } = e.target;
      setEditedData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const response = Object.fromEntries(
      Object.entries(editedData)
        .filter(([key]) => Object.keys(initialState).includes(key))
        .map(([key, value]) => [key, value]),
    );

    switch (category) {
      case 'user':
        setErrorMsg(validateUser(editedData).msg);
        isValidated = validateUser(editedData).isValidated;
        break;
      case 'product':
        setErrorMsg(validateProduct(editedData).msg);
        isValidated = validateProduct(editedData).isValidated;
        break;
      case 'blog':
        setErrorMsg(validateBlog(editedData).msg);
        isValidated = validateBlog(editedData).isValidated;
        break;
      case 'instruction':
        setErrorMsg(validateInstruction(editedData).msg);
        isValidated = validateInstruction(editedData).isValidated;
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
            data={editedData}
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
