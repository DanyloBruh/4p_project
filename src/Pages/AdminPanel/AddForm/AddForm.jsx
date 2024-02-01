import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddForm.scss';
import RenderAddFormBody from './RenderAddFormBody';
import { postData, postDataConfig } from '../../../Helper/requests';
import {
  validateUser,
  validateBlog,
  validateInstruction,
  validateProduct,
} from '../ValidationFunctions';

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
  const [errorMsg, setErrorMsg] = useState('');
  let isValidated = true;

  const handleInputChange = (e) => {
    if (e.target && e.target.files) {
      const uploadFile = e.target.files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: uploadFile,
      }));
    } else if (e.target) {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        text: e,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === 'blog') {
      formData.text = formData.text.replace(/"/g, "'");
      // console.log(formData.text);
    }
    switch (category) {
      case 'user':
        setErrorMsg(validateUser(formData).msg);
        isValidated = validateUser(formData).isValidated;
        break;
      case 'product':
        setErrorMsg(validateProduct(formData).msg);
        isValidated = validateProduct(formData).isValidated;
        break;
      case 'blog':
        setErrorMsg(validateBlog(formData).msg);
        isValidated = validateBlog(formData).isValidated;
        break;
      case 'instruction':
        setErrorMsg(validateInstruction(formData).msg);
        isValidated = validateInstruction(formData).isValidated;
        break;
      default:
        setErrorMsg('');
    }

    if (!isValidated) return;
    const response = {
      userId: '2dc855a1-6c19-40fa-bf15-31005ed3013e',
      ...formData,
    };
    if (category !== 'user') {
      postDataConfig(category, response);
      navigate(`/admin/${category}`);
    } else {
      postData(category, response);
      navigate(`/admin/${category}`);
    }
  };

  return (
    <div className="add-form">
      <div className={category !== 'blog' ? 'form-bg' : 'form-bg blog'}>
        <h3>
          Add
          {` ${category}`}
        </h3>
        <Form noValidate>
          <RenderAddFormBody
            handleInputChange={handleInputChange}
            category={category}
            formData={formData}
            setFormData={setFormData}
          />
          <br />
          {isValidated && errorMsg !== '' && <p>{`${errorMsg}`}</p>}
          <Button variant="outline-light" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddForm;
