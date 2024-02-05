/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AddForm.scss';
import RenderAddFormBody from './RenderAddFormBody';
import { postData, postDataConfig } from '../../../Helper/requests';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import {
  validateUser,
  validateBlog,
  validateInstruction,
  validateProduct,
} from '../ValidationFunctions';

/* eslint-disable react/prop-types */
function AddForm({ setData }) {
  const category = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

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
  const [ingredients, setIngredients] = useState([
    {
      ingredient: '',
      timestamp: new Date().getTime(),
    },
  ]);
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
    console.log(formData, ingredients);
    setData((prevState) => [...prevState, formData]);

    if (category !== 'user') {
      postDataConfig(category, axiosPrivate, response);
      navigate(`/admin/${category}`);
    } else {
      postData(category, axiosPrivate, response);
      navigate(`/admin/${category}`);
    }
  };

  return (
    <div className="add-edit-form">
      <Container className="add-edit-form__body">
        <Form noValidate className="form">
          <Form.Label>
            Add
            {` ${category}`}
            <Link to={`/admin/${category}`}>
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.1659 35.9052C39.6413 36.4195 39.8992 37.0978 39.8856 37.7979C39.872 38.4981 39.5879 39.1659 39.0928 39.6612C38.5978 40.1566 37.9303 40.4411 37.2301 40.4552C36.5299 40.4693 35.8515 40.2119 35.3369 39.7368L25.0001 29.4L14.6632 39.7368C14.4155 40.0048 14.1161 40.22 13.7832 40.3695C13.4502 40.519 13.0905 40.5997 12.7256 40.6068C12.3607 40.6139 11.9981 40.5473 11.6596 40.4108C11.3211 40.2744 11.0136 40.071 10.7556 39.8128C10.4976 39.5546 10.2945 39.247 10.1582 38.9084C10.022 38.5698 9.95561 38.2072 9.96295 37.8423C9.9703 37.4774 10.0513 37.1177 10.201 36.7849C10.3507 36.452 10.5661 36.1528 10.8343 35.9052L21.1711 25.5684L10.8343 15.2368C10.5661 14.9893 10.3507 14.6901 10.201 14.3572C10.0513 14.0244 9.9703 13.6647 9.96295 13.2998C9.95561 12.9349 10.022 12.5723 10.1582 12.2337C10.2945 11.8951 10.4976 11.5874 10.7556 11.3293C11.0136 11.0711 11.3211 10.8677 11.6596 10.7313C11.9981 10.5948 12.3607 10.5281 12.7256 10.5352C13.0905 10.5423 13.4502 10.6231 13.7832 10.7726C14.1161 10.922 14.4155 11.1373 14.6632 11.4052L25.0001 21.7395L35.3369 11.4026C35.8515 10.9276 36.5299 10.6701 37.2301 10.6842C37.9303 10.6983 38.5978 10.9828 39.0928 11.4782C39.5879 11.9736 39.872 12.6413 39.8856 13.3415C39.8992 14.0417 39.6413 14.72 39.1659 15.2342L28.829 25.5684L39.1659 35.9052Z"
                  fill="#8D8D8D"
                />
              </svg>
            </Link>
          </Form.Label>

          <RenderAddFormBody
            handleInputChange={handleInputChange}
            category={category}
            formData={formData}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <br />
          {isValidated && errorMsg !== '' && <p>{`${errorMsg}`}</p>}
          <Button
            variant="outline-light"
            className="button__submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddForm;
