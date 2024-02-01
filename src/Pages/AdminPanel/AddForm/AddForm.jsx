import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddForm.scss';
import RenderAddFormBody from './RenderAddFormBody';
import { postData, postDataConfig } from '../../../Helper/requests';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

function AddForm() {
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
  console.log(formData, isValidated);

  const validateUser = () => {
    // name validation
    if (formData.name === '') {
      isValidated = false;
      return 'Name is required';
    }
    if (!formData.name.match('^[A-Za-z]{1,20} [A-Za-z]{1,20}')) {
      isValidated = false;
      return 'Name is not valid';
    }
    // role validation
    if (formData.role === '') {
      isValidated = false;
      return 'Role is required';
    }
    if (formData.role !== 'admin' && formData.role !== 'employee') {
      isValidated = false;
      return 'Role is not valid';
    }
    // email validation
    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    if (formData.email === '') {
      isValidated = false;
      return 'Email is required';
    }
    if (!emailPattern.test(formData.email)) {
      isValidated = false;
      return 'Email is not valid';
    }
    // pasword validation
    if (formData.password === '') {
      isValidated = false;
      return 'Password is required';
    }
    if (formData.password.length < 6) {
      isValidated = false;
      return 'At least 6 characters';
    }
    isValidated = true;
    return 'validation for user complete';
  };

  const validateBlog = () => {
    if (formData.name === '') {
      isValidated = false;
      return 'Name is required';
    }
    if (formData.text === '') {
      isValidated = false;
      return 'Text is required';
    }
    if (formData.text.match('["]')) {
      isValidated = false;
      return 'Text must not contain double quotes';
    }
    if (formData.images === '') {
      isValidated = false;
      return 'Image is required';
    }
    isValidated = true;
    return 'validation for blog complete';
  };

  const validateInstruction = () => {
    if (formData.name === '') {
      isValidated = false;
      return 'Name is required';
    }

    if (formData.difficulty === '') {
      isValidated = false;
      return 'Difficulty is required';
    }
    if (
      /* eslint-disable operator-linebreak */
      formData.difficulty !== 'easy' &&
      formData.difficulty !== 'medium' &&
      formData.difficulty !== 'hard'
    ) {
      isValidated = false;
      return 'Difficulty is not valid';
    }

    if (formData.time === '') {
      isValidated = false;
      return 'Time is required';
    }

    if (formData.makes === '') {
      isValidated = false;
      return 'Makes is required';
    }

    if (formData.description === '') {
      isValidated = false;
      return 'Description is required';
    }
    if (formData.description.match('["]')) {
      isValidated = false;
      return 'Description must not contain double quotes';
    }

    if (formData.ingredients === '') {
      isValidated = false;
      return 'Ingredients is required';
    }
    if (formData.ingredients.match('["]')) {
      isValidated = false;
      return 'Ingredients must not contain double quotes';
    }

    if (formData.text === '') {
      isValidated = false;
      return 'Text is required';
    }
    if (formData.text.match('["]')) {
      isValidated = false;
      return 'Text must not contain double quotes';
    }
    if (formData.image === '') {
      isValidated = false;
      return 'Image is required';
    }
    isValidated = true;
    return 'validation for instruction complete';
  };

  const validateProduct = () => {
    if (formData.name === '') {
      isValidated = false;
      return 'Name is required';
    }
    if (!formData.name.match('^[A-Za-z]{1,20}')) {
      isValidated = false;
      return 'Name is not valid';
    }

    if (formData.weight === '') {
      isValidated = false;
      return 'Weight is required';
    }

    if (formData.price === '') {
      isValidated = false;
      return 'Price is required';
    }

    if (formData.description === '') {
      isValidated = false;
      return 'Description is required';
    }
    if (formData.description.match('["]')) {
      isValidated = false;
      return 'Description must not contain double quotes';
    }

    if (formData.ingredients === '') {
      isValidated = false;
      return 'Ingredients is required';
    }
    if (formData.ingredients.match('["]')) {
      isValidated = false;
      return 'Ingredients must not contain double quotes';
    }
    if (formData.image === '') {
      isValidated = false;
      return 'Image is required';
    }
    isValidated = true;
    return 'validation for product complete';
  };

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
    switch (category) {
      case 'user':
        setErrorMsg(validateUser());
        break;
      case 'product':
        setErrorMsg(validateProduct());
        break;
      case 'blog':
        setErrorMsg(validateBlog());
        break;
      case 'instruction':
        setErrorMsg(validateInstruction());
        break;
      default:
        setErrorMsg('');
    }
    console.log(errorMsg, isValidated);
    if (!isValidated) return;
    const response = {
      userId: '2dc855a1-6c19-40fa-bf15-31005ed3013e',
      ...formData,
    };
    if (category !== 'user') {
      postDataConfig(category, axiosPrivate, response);
      navigate(`/admin/${category}`);
    } else {
      postData(category, axiosPrivate, response);
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
          {isValidated && errorMsg !== '' && <p>{`${errorMsg}`}</p>}
          <Button variant="outline-light" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
