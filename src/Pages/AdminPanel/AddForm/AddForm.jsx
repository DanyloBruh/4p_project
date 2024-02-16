/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */

import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './AddForm.scss';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import RenderAddFormBody from './RenderAddFormBody';
import { postData, postDataConfig } from '../../../Helper/requests';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import useAxiosPrivateImages from '../../../Hooks/useAxiosPrivateWithImages';
import ToastNotification from '../../../Components/Toast/Toast';

/* eslint-disable react/prop-types */
function AddForm({ setData }) {
  const category = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const axiosPrivateConfig = useAxiosPrivateImages();
  const userId = useSelector((state) => state.auth.auth.user.id);
  const [schema, setSchema] = useState({});

  let initialState = {};

  const regexes = {
    regexUserName: '^[A-Za-z]{1,20} [A-Za-z]{1,20}',
    regexUserEmail: /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/,
    regexProductName: '^[A-Za-z]{1,20}',
    regexDoubleQuotes: '".*"',
  };
  const FILE_SIZE = 5242880;
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

  switch (category) {
    case 'user':
      initialState = {
        name: '',
        role: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
      break;
    case 'blog':
      initialState = {
        name: '',
        text: '',
        Images: [{ image: '' }],
        displayType: '',
      };
      break;
    case 'product':
      initialState = {
        name: '',
        weight: '',
        description: '',
        price: '',
        Image: '',
        ingredients: '',
      };
      break;
    case 'instruction':
      initialState = {
        name: '',
        difficulty: '',
        time: '',
        makes: '',
        description: '',
        ingredients: [{ ingredient: '' }],
        text: [{ text: '' }],
        Image: '',
        carrousel: false,
      };
      break;
    default:
      initialState = {};
  }

  useEffect(() => {
    switch (category) {
      case 'user':
        setSchema(
          Yup.object().shape({
            name: Yup.string()
              .min(2, 'Name must be minimum 2')
              .max(100, 'Name must not be more than 100 characters')
              .required('Name is required')
              .matches(
                regexes.regexUserName,
                'Username must be in the format Name Surname',
              ),
            role: Yup.string()
              .required('Role is required')
              .oneOf(['admin', 'employee'], 'Role is required'),
            email: Yup.string()
              .matches(regexes.regexUserEmail, 'Invalid email')
              .required('Email is required'),
            password: Yup.string()
              .required('Password is required')
              .min(6, 'Password must be 6 characters long')
              .matches(/[0-9]/, 'Password requires a number')
              .matches(/[a-z]/, 'Password requires a lowercase letter')
              .matches(/[A-Z]/, 'Password requires an uppercase letter')
              .matches(/[^\w]/, 'Password requires a symbol'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password')], 'Mismatched passwords')
              .required('Please confirm your password'),
          }),
        );
        break;
      case 'product':
        setSchema(
          Yup.object().shape({
            name: Yup.string()
              .min(2, 'Name must be minimum 2')
              .max(100, 'Name must not be more than 100 characters')
              .matches(
                regexes.regexProductName,
                'Product name must not contain numbers',
              )
              .required('Name is required'),
            weight: Yup.number('Weight must be a number').required(
              'Weight is required',
            ),
            description: Yup.string().required('Description is required'),
            price: Yup.number('Price must be a number').required(
              'Price is required',
            ),
            Image: Yup.mixed()
              .required('A Image is required')
              .test(
                'fileSize',
                'Image too large',
                (value) => value && value.size <= FILE_SIZE,
              )
              .test(
                'fileFormat',
                'Unsupported Format',
                (value) => value && SUPPORTED_FORMATS.includes(value.type),
              ),
            ingredients: Yup.string().required('Ingredients is required'),
          }),
        );
        break;
      case 'instruction':
        setSchema(
          Yup.object().shape({
            name: Yup.string()
              .min(2, 'Name must be minimum 2')
              .max(100, 'Name must not be more than 100 characters')
              .required('Name is required'),

            difficulty: Yup.string()
              .required('Difficulty is required')
              .oneOf(
                ['Very easy', 'Easy', 'Medium', 'Hard', 'Very hard'],
                'Select the correct difficulty',
              ),
            time: Yup.string().required('Time is required'),
            makes: Yup.number('Makes must be a number').required(
              'Makes is required',
            ),
            description: Yup.string().required('Description is required'),
            ingredients: Yup.array().of(
              Yup.object().shape({
                ingredient: Yup.string().required('Ingredient required'),
              }),
            ),
            // ingredients: Yup.string().required(),
            text: Yup.array().of(
              Yup.object().shape({
                text: Yup.string().required('Step required'),
              }),
            ),
            Image: Yup.mixed()
              .required('A Image is required')
              .test(
                'fileSize',
                'Image too large',
                (value) => value && value.size <= FILE_SIZE,
              )
              .test(
                'fileFormat',
                'Unsupported Format',
                (value) => value && SUPPORTED_FORMATS.includes(value.type),
              ),
          }),
        );
        break;

      case 'blog':
        setSchema(
          Yup.object().shape({
            name: Yup.string()
              .min(2, 'Title must be minimum 2')
              .max(100, 'Title must not be more than 100 characters')
              .required('Title is required'),
            text: Yup.string().required('Text is required'),
            Images: Yup.array()
              .required('At least one image is required')
              .of(
                Yup.mixed()
                  .test(
                    'fileSize',
                    'Image too large',
                    (value) => !value || value.size <= FILE_SIZE,
                  )
                  .test(
                    'fileFormat',
                    'Unsupported format',
                    (value) => !value || SUPPORTED_FORMATS.includes(value.type),
                  ),
              ),
            displayType: Yup.string()
              .required('DisplayType is required')
              .oneOf(
                ['firstPage', 'featured', 'default'],
                'Select the correct displayType',
              ),
          }),
        );
        break;
      default:
        initialState = {};
    }
  }, []);

  const [formData, setFormData] = useState(initialState);

  const [ingredientsArray, setIngredients] = useState([
    {
      ingredient: '',
      timestamp: new Date().getTime(),
    },
  ]);
  const [stepsArray, setSteps] = useState([
    {
      text: '',
      timestamp: new Date().getTime(),
    },
  ]);
  const [imagesArray, setImages] = useState([
    {
      images: null,
      timestamp: new Date().getTime(),
    },
  ]);

  const handleInputChange = (e) => {
    if (e.target && e.target.files) {
      const uploadFile = e.target.files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: uploadFile,
      }));
    } else if (e.target) {
      const { name, value } = e.target;
      if (name === 'carrousel') {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: e.target.checked,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        text: e,
      }));
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    // if (category === 'blog') {
    //   values.text = values.text.replace(/"/g, "'");
    // }

    let newState;
    let ingredients;
    let text;
    let Images;

    switch (category) {
      case 'instruction':
        ingredients = values.ingredients
          .map((ingredient) => ingredient.ingredient)
          .join(' | ');

        text = values.text.map((step) => step.text).join(' | ');
        newState = { ...values, ingredients, text };
        break;
      case 'blog':
        Images = [...values.Images];
        newState = { ...values, Images };
        break;
      default:
        newState = { ...values };
    }

    const response = {
      userId,
      ...newState,
    };

    console.log('response add', response);

    if (category !== 'user') {
      postDataConfig(category, axiosPrivateConfig, response)
        .then((result) => {
          ToastNotification('success', 'Successfully created!');
          setData((prevState) => [...prevState, result]);
          navigate(`/admin/${category}`);
        })
        .catch((err) => {
          ToastNotification(
            'error',
            `Something went wrong! (${err.response.data.message})`,
          );
        });
    } else {
      postData(category, axiosPrivate, response)
        .then((result) => {
          ToastNotification('success', 'Successfully created!');
          setData((prevState) => [...prevState, result]);
          navigate(`/admin/${category}`);
        })
        .catch((err) => {
          ToastNotification(
            'error',
            `Something went wrong! (${err.response.data.message})`,
          );
        });
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
        <Formik
          initialValues={initialState}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleSubmit,
            values,
            setValues,
            handleChange,
            touched,
            setFieldValue,
          }) => (
            <form
              className="form"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
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
                setFormData={setFormData}
                ingredients={ingredientsArray}
                setIngredients={setIngredients}
                steps={stepsArray}
                setSteps={setSteps}
                images={imagesArray}
                setImages={setImages}
                errors={errors}
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                touched={touched}
                setFieldValue={setFieldValue}
              />
              <br />
              <Button
                type="submit"
                variant="outline-light"
                className="button__submit"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default AddForm;
