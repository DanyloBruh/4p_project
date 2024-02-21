/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */

/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */

/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { FieldArray, Formik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import TextareaAutosize from 'react-textarea-autosize';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';
import ToastNotification from '../../../Components/Toast/Toast';
import { editDataConfig, postDataConfig } from '../../../Helper/requests';
import useAxiosPrivateImages from '../../../Hooks/useAxiosPrivateWithImages';
import {
  handleAddIngredient,
  handleAddStep,
  handleDeleteIngredient,
  handleDeleteStep,
} from './instructionsUtils';
import { removeUnchangedFields } from '../adminUtils';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

function EditInstruction({ item, setData, fileOptions, close }) {
  const axiosPrivateConfig = useAxiosPrivateImages();
  const axiosPrivate = useAxiosPrivate();

  const ingredientsParse = useCallback(
    (str) => str?.split(' | ')?.map((a, i) => ({ ingredient: a, index: i })),
    [],
  );
  const textParse = useCallback(
    (str) => str?.split(' | ')?.map((a, i) => ({ text: a, index: i })),
    [],
  );
  const initialState = useMemo(
    () => ({
      name: item.name,
      difficulty: item.difficulty,
      time: item.time,
      makes: item.makes,
      description: item.description,
      ingredients: ingredientsParse(item.ingredients),
      text: textParse(item.text),
      Image: item.Image,
      carrousel: item.carrousel,
    }),
    [],
  );
  const schema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string()
          .min(2, 'Name must be minimum 2')
          .max(100, 'Name must not be more than 100 characters')
          .matches(/^[^"]*$/, 'Name cannot contain double quotes')
          .required('Name is required'),

        difficulty: Yup.string()
          .required('Difficulty is required')
          .oneOf(
            ['Very easy', 'Easy', 'Medium', 'Hard', 'Very hard'],
            'Select the correct difficulty',
          ),
        time: Yup.string()
          .required('Time is required')
          .matches(/^[^"]*$/, 'Time cannot contain double quotes'),
        makes: Yup.number()
          .typeError('Makes must be a number')
          .required('Makes is required')
          .positive('Makes must be positive'),
        description: Yup.string()
          .required('Description is required')
          .matches(/^[^"]*$/, 'Description cannot contain double quotes'),
        ingredients: Yup.array().of(
          Yup.object().shape({
            ingredient: Yup.string()
              .required('Ingredient required')
              .matches(/^[^"]*$/, 'Ingredient cannot contain double quotes'),
          }),
        ),
        // ingredients: Yup.string().required(),
        text: Yup.array().of(
          Yup.object().shape({
            text: Yup.string()
              .required('Step required')
              .matches(/^[^"]*$/, 'Step cannot contain double quotes'),
          }),
        ),
        Image: Yup.mixed()
          .test('fileSize', 'Image too large', (value) => {
            if (!value.size) return true;
            return value.size <= fileOptions.fileSize;
          })
          .test('fileFormat', 'Unsupported format', (value) => {
            if (!value.type) return true;
            return fileOptions.supportedFormats.includes(value.type);
          }),
      }),
    [],
  );

  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

  const handleSubmitForm = (values) => {
    // eslint-disable-next-line no-param-reassign
    values.ingredients = values.ingredients
      .map((ingredient) => ingredient.ingredient)
      .join(' | ');
    // eslint-disable-next-line no-param-reassign
    values.text = values.text.map((step) => step.text).join(' | ');

    let ax = axiosPrivateConfig;
    if (values.Image.type === item.Image.type
      || values.Image.name === item.Image.name
      || values.Image.size === item.Image.size) {
      ax = axiosPrivate;
      // eslint-disable-next-line no-param-reassign
      delete values.Image;
    }
    const request = removeUnchangedFields(item, values);

    if (Object.keys(request).length === 0) {
      ToastNotification(
        'error',
        'You haven\'t changed anything',
      );
      close();
      return;
    }
    editDataConfig('instruction', item.id, ax, {
      ...request,
    })
      .then(() => {
        ToastNotification('success', 'Successfully updated!');
        setData((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.id === item.id) {
              return { ...item, ...values };
            }
            return node;
          }),
        }));
      })
      .catch((err) => {
        ToastNotification(
          'error',
          `Something went wrong! (${err.response.data.message})`,
        );
      })
      .finally(() => {
        close();
      });
  };
  return (
    <div className="add-edit-form-bg">
      <div className="add-edit-form-position">
        <div className="add-edit-form">
          <button
            type="button"
            className="product-modal__card__close"
            onClick={() => close()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <path
                d="M39.1654 35.9052C39.6408 36.4195 39.8987 37.0978 39.8851 37.7979C39.8715 38.4981 39.5874 39.1659 39.0924 39.6612C38.5973 40.1566 37.9298 40.4411 37.2296 40.4552C36.5294 40.4693 35.851 40.2119 35.3364 39.7368L24.9996 29.4L14.6627 39.7368C14.415 40.0048 14.1157 40.22 13.7827 40.3695C13.4497 40.519 13.09 40.5997 12.7251 40.6068C12.3602 40.6139 11.9976 40.5473 11.6591 40.4108C11.3206 40.2744 11.0131 40.071 10.7552 39.8128C10.4972 39.5546 10.294 39.247 10.1578 38.9084C10.0215 38.5698 9.95512 38.2072 9.96246 37.8423C9.96981 37.4774 10.0508 37.1177 10.2005 36.7849C10.3502 36.452 10.5656 36.1528 10.8338 35.9052L21.1706 25.5684L10.8338 15.2368C10.5656 14.9893 10.3502 14.6901 10.2005 14.3572C10.0508 14.0244 9.96981 13.6647 9.96246 13.2998C9.95512 12.9349 10.0215 12.5723 10.1578 12.2337C10.294 11.8951 10.4972 11.5874 10.7552 11.3293C11.0131 11.0711 11.3206 10.8677 11.6591 10.7313C11.9976 10.5948 12.3602 10.5281 12.7251 10.5352C13.09 10.5423 13.4497 10.6231 13.7827 10.7726C14.1157 10.922 14.415 11.1373 14.6627 11.4052L24.9996 21.7395L35.3364 11.4026C35.851 10.9276 36.5294 10.6701 37.2296 10.6842C37.9298 10.6983 38.5973 10.9828 39.0924 11.4782C39.5874 11.9736 39.8715 12.6413 39.8851 13.3415C39.8987 14.0417 39.6408 14.72 39.1654 15.2342L28.8285 25.5684L39.1654 35.9052Z"
                fill="#8D8D8D"
              />
            </svg>
          </button>
          <Formik
            initialValues={initialState}
            validationSchema={schema}
            onSubmit={handleSubmitForm}
          >
            {({
              errors,
              handleSubmit,
              values,
              handleChange,
              touched,
              setValues,
              setFieldValue,
            }) => (
              <form
                className="form"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <Form.Label>Edit instruction</Form.Label>

                <Form.Group className="form-element">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Enter instruction name"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="instruction name"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && errors.name}
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-element">
                  <Form.Select
                    name="difficulty"
                    value={values.difficulty}
                    onChange={handleChange}
                    isValid={touched.difficulty && !errors.difficulty}
                    isInvalid={touched.difficulty && errors.difficulty}
                    autoComplete="off"
                  >
                    <option>Сhoose a difficulty from the select menu</option>
                    <option>Very easy</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                    <option>Very hard</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.difficulty}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-element">
                  <FloatingLabel controlId="floatingInput" label="Enter time">
                    <Form.Control
                      type="text"
                      name="time"
                      placeholder="time"
                      value={values.time}
                      onChange={handleChange}
                      isValid={touched.time && !errors.time}
                      isInvalid={touched.time && errors.time}
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.time}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-element">
                  <FloatingLabel controlId="floatingInput" label="Enter makes">
                    <Form.Control
                      type="text"
                      name="makes"
                      placeholder="makes"
                      value={values.makes}
                      onChange={handleChange}
                      isValid={touched.makes && !errors.makes}
                      isInvalid={touched.makes && errors.makes}
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.makes}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-element">
                  <Form.Label>Description</Form.Label>
                  <TextareaAutosize
                    name="description"
                    type="text"
                    rows={5}
                    minRows={5}
                    className={`form-control ${
                      touched.description && errors.description
                        ? 'is-invalid'
                        : touched.description && !errors.description
                          ? 'is-valid'
                          : ''
                    }`}
                    onChange={handleChange}
                    value={values.description}
                    autoComplete="off"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-element">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Group className="control-element">
                    <FieldArray className="rendered-content" name="ingredients">
                      {() => {
                        if (typeof values.ingredients === 'string') return;
                        return values.ingredients.map((itemIng, i) => (
                          <Form.Group
                            key={`ingredients${i}`}
                            className="rendered-content"
                          >
                            <div className="d-flex">
                              <TextareaAutosize
                                name={`ingredients.${i}.ingredient`}
                                type="text"
                                rows={5}
                                minRows={5}
                                className={`form-control ${
                                  touched.ingredients && errors.ingredients
                                    ? 'is-invalid'
                                    : touched.ingredients && !errors.ingredients
                                      ? 'is-valid'
                                      : ''
                                }`}
                                value={itemIng.ingredient}
                                onChange={handleChange}
                                autoComplete="off"
                              />

                              {values.ingredients.length > 1 && (
                                <Button
                                  variant="outline-light"
                                  className="mb-3 ml-3"
                                  onClick={() =>
                                    handleDeleteIngredient(i, values, setValues)
                                  }
                                >
                                  remove
                                </Button>
                              )}
                            </div>

                            <Form.Control.Feedback
                              type="invalid"
                              className={
                                touched.ingredients &&
                                errors.ingredients &&
                                errors.ingredients[i] &&
                                errors.ingredients[i].ingredient
                                  ? 'd-block'
                                  : ''
                              }
                            >
                              {errors.ingredients &&
                                errors.ingredients[i] &&
                                errors.ingredients[i].ingredient}
                            </Form.Control.Feedback>
                          </Form.Group>
                        ));
                      }}
                    </FieldArray>
                  </Form.Group>
                  <Button
                    variant="outline-light"
                    onClick={() => handleAddIngredient(values, setValues)}
                  >
                    click to add new Ingredient
                  </Button>
                </Form.Group>
                <Form.Group className="form-element">
                  <Form.Label>Steps</Form.Label>
                  <Form.Group className="control-element">
                    <FieldArray className="rendered-content" name="steps">
                      {() => {
                        if (typeof values.text === 'string') return;
                        return values.text.map((itemIng, i) => {
                          console.log(itemIng);
                          return (
                            <Form.Group
                              key={`text${i}`}
                              className="rendered-content"
                            >
                              <div className="d-flex">
                                <TextareaAutosize
                                  name={`text.${i}.text`}
                                  type="text"
                                  rows={5}
                                  minRows={5}
                                  className={`form-control ${
                                    touched.text && errors.text
                                      ? 'is-invalid'
                                      : touched.text && !errors.text
                                        ? 'is-valid'
                                        : ''
                                  }`}
                                  value={itemIng.text}
                                  onChange={handleChange}
                                  autoComplete="off"
                                />
                                {values.text.length > 1 && (
                                  <Button
                                    variant="outline-light"
                                    className="mb-3 ml-3"
                                    onClick={() =>
                                      handleDeleteStep(i, values, setValues)
                                    }
                                  >
                                    remove
                                  </Button>
                                )}
                              </div>

                              <Form.Control.Feedback
                                type="invalid"
                                className={
                                  touched.text &&
                                  errors.text &&
                                  errors.text[i] &&
                                  errors.text[i].text
                                    ? 'd-block'
                                    : ''
                                }
                              >
                                {errors.text &&
                                  errors.text[i] &&
                                  errors.text[i].text}
                              </Form.Control.Feedback>
                            </Form.Group>
                          );
                        });
                      }}
                    </FieldArray>
                  </Form.Group>
                  <Button
                    variant="outline-light"
                    onClick={() => handleAddStep(values, setValues)}
                  >
                    click to add new Step
                  </Button>
                </Form.Group>
                <Form.Group className="form-element">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="Image"
                    onChange={(e) =>
                      setFieldValue('Image', e.currentTarget.files[0])
                    }
                    isValid={touched.Image && !errors.Image}
                    isInvalid={touched.Image && errors.Image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Image}
                  </Form.Control.Feedback>
                  {values.Image && !values.Image.id ? (
                    <img
                      src={URL.createObjectURL(values.Image)}
                      alt="edit img"
                    />
                  ) : (
                    <img
                      src={`data:image/png;base64,${values.Image.imageData}`}
                      alt="edit img"
                    />
                  )}
                </Form.Group>
                <Form.Group className="form-element">
                  <Form.Check // prettier-ignore
                    type="switch"
                    label="Add this recipe to the carousel"
                    name="carrousel"
                    onChange={handleChange}
                    checked={values.carrousel}
                  />
                </Form.Group>

                <hr />
                <div className="btn-group">
                  <Button
                    type="button"
                    variant="outline-danger"
                    className="button__submit"
                    onClick={() => close()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="outline-light"
                    className="button__submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EditInstruction;
