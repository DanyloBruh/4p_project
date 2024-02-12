import React, { useId, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import '../AddForm/AddForm.scss';
/* eslint-disable object-curly-newline */
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import RenderEditFormBody from './RenderEditFormBody';
import { editData, editDataConfig } from '../../../Helper/requests';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import {
  validateUser,
  validateBlog,
  validateInstruction,
  validateProduct,
} from '../ValidationFunctions';
import useAxiosPrivateImages from '../../../Hooks/useAxiosPrivateWithImages';

/* eslint-disable react/prop-types */
function EditForm({ data, setData }) {
  const category = useLocation().pathname.split('/')[2];
  const { id } = useParams();
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const axiosPrivateConfig = useAxiosPrivateImages();

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
        Images: [],
        displayType: '',
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
        carrousel: '',
      };
      break;
    default:
      initialState = {};
  }

  const [editedData, setEditedData] = useState(data.find((el) => el.id === id));

  console.log(editedData);

  let inputIngredientsArray = [];
  let inputStepsArray = [];
  let inputImagesArray = [];

  switch (category) {
    case 'product':
      inputIngredientsArray = editedData.ingredients
        .split(' | ')
        .map((item) => ({ ingredient: item, timestamp: useId() }));
      break;
    case 'instruction':
      inputIngredientsArray = editedData.ingredients
        .split(' | ')
        .map((item) => ({ ingredient: item, timestamp: useId() }));

      inputStepsArray = editedData.text
        .split(' | ')
        .map((item) => ({ text: item, timestamp: useId() }));
      break;
    case 'blog':
      inputImagesArray = editedData.Images;
      break;
    default:
      inputIngredientsArray = [];
      inputStepsArray = [];
      inputImagesArray = [];
  }

  const [ingredientsArray, setIngredients] = useState(inputIngredientsArray);
  const [stepsArray, setSteps] = useState(inputStepsArray);
  const [imagesArray, setImages] = useState(inputImagesArray);

  const handleInputChange = (e) => {
    if (e.target && e.target.files) {
      const uploadFile = e.target.files[0];
      setEditedData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: uploadFile,
      }));
    } else if (e.target) {
      const { name, value } = e.target;
      if (name === 'carrousel') {
        setEditedData((prevFormData) => ({
          ...prevFormData,
          [name]: e.target.checked,
        }));
      } else {
        setEditedData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else {
      setEditedData((prevFormData) => ({
        ...prevFormData,
        text: e,
      }));
    }
  };

  /* eslint-disable arrow-body-style */
  const replaceItem = (idForReplace, newItem) => {
    setData((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === idForReplace) {
          return newItem;
        }
        return item;
      });
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

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

    const ingredients = ingredientsArray
      .map((ingredient) => ingredient.ingredient)
      .join(' | ');
    const text = stepsArray.map((step) => step.text).join(' | ');

    let newState;

    switch (category) {
      case 'product':
        newState = { ...editedData, ingredients };
        break;
      case 'instruction':
        newState = { ...editedData, ingredients, text };
        break;
      case 'blog':
        newState = { ...editedData, ...imagesArray };
        break;
      default:
        newState = { ...editedData };
    }

    const response = Object.fromEntries(
      Object.entries(newState)
        .filter(([key]) => Object.keys(initialState).includes(key))
        .map(([key, value]) => [key, value]),
    );

    if (category !== 'user') {
      editDataConfig(category, id, axiosPrivateConfig, response).then(
        replaceItem(id, { ...response, id }),
      );
      navigate(`/admin/${category}`);
    } else {
      editData(category, id, axiosPrivate, response).then(
        replaceItem(id, { ...response, id }),
      );
      navigate(`/admin/${category}`);
    }
  };

  return (
    <div className="add-edit-form">
      <Container
        className={
          category !== 'blog'
            ? 'add-edit-form__body'
            : 'add-edit-form__body blog'
        }
      >
        <Form noValidate className="form">
          <Form.Label>
            Edit
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

          <RenderEditFormBody
            handleInputChange={handleInputChange}
            category={category}
            data={editedData}
            setData={setEditedData}
            ingredients={ingredientsArray}
            setIngredients={setIngredients}
            steps={stepsArray}
            setSteps={setSteps}
            images={imagesArray}
            setImages={setImages}
          />
          <br />
          {isValidated && errorMsg !== '' && <p>{`${errorMsg}`}</p>}
          <Button
            variant="outline-light"
            className="button__submit"
            onClick={handleUpdate}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EditForm;
