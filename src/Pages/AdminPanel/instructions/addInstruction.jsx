/* eslint-disable no-unused-vars */

/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { FieldArray, Formik } from 'formik';
import React, { useMemo } from 'react';
import {
  Button, Container, FloatingLabel, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import TextareaAutosize from 'react-textarea-autosize';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';
import ToastNotification from '../../../Components/Toast/Toast';
import { postDataConfig } from '../../../Helper/requests';
import useAxiosPrivateImages from '../../../Hooks/useAxiosPrivateWithImages';
import {
  handleAddIngredient, handleAddStep, handleDeleteIngredient, handleDeleteStep,
} from './instructionsUtils';

function AddInstruction({ setData, fileOptions, close }) {
  const userId = useSelector((state) => state.auth.auth.user.id);
  const axiosPrivateConfig = useAxiosPrivateImages();

  const initialState = useMemo(() => ({
    name: '',
    difficulty: '',
    time: '',
    makes: '',
    description: '',
    ingredients: [{ ingredient: '' }],
    text: [{ text: '' }],
    Image: '',
    carrousel: false,
  }), []);
  const schema = useMemo(
    () => Yup.object().shape({
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
          (value) => value && value.size <= fileOptions.fileSize,
        )
        .test(
          'fileFormat',
          'Unsupported Format',
          (value) => value && fileOptions.supportedFormats.includes(value.type),
        ),
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
    values.text = values.text
      .map((text) => text.text)
      .join(' | ');
    const req = {
      userId,
      ...values,
    };

    postDataConfig('instruction', axiosPrivateConfig, req)
      .then((result) => {
        ToastNotification('success', 'Successfully created!');
        setData((state) => ({
          nodes: [...state.nodes, result],
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
    <div className="add-edit-form">
      <Container>
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
              <Form.Label>
                Add instruction
                <Button
                  onClick={() => close()}
                >
                  <IconContext.Provider value={iconProviderValue}>
                    <IoMdClose />
                  </IconContext.Provider>
                </Button>
              </Form.Label>

              <Form.Group className="form-element">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter instruction name"
                  className="mb-3"
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
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter time"
                  className="mb-3"
                >
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
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter makes"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
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
                    {() => values.ingredients.map((item, i) => (
                      <Form.Group
                        key={`ingredients${i}`}
                        className="rendered-content"
                      >
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
                          value={item.ingredient}
                          onChange={handleChange}
                          autoComplete="off"
                        />

                        {values.ingredients.length > 1 && (
                        <Button
                          variant="outline-light"
                          onClick={() => handleDeleteIngredient(i, values, setValues)}
                        >
                          remove
                        </Button>
                        )}
                        <Form.Control.Feedback type="invalid">
                          {errors.ingredients
                            && errors.ingredients[i]
                            && errors.ingredients[i].ingredient}
                        </Form.Control.Feedback>
                      </Form.Group>
                    ))}
                  </FieldArray>
                </Form.Group>
                <Button variant="outline-light" onClick={() => handleAddIngredient(values, setValues)}>
                  click to add new Ingredient
                </Button>
              </Form.Group>
              <Form.Group className="form-element">
                <Form.Label>Steps</Form.Label>
                <Form.Group className="control-element">
                  <FieldArray className="rendered-content" name="steps">
                    {() => values.text.map((item, i) => (
                      <Form.Group key={`text${i}`} className="rendered-content">
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
                          value={item.text}
                          onChange={handleChange}
                          autoComplete="off"
                        />

                        {values.text.length > 1 && (
                          <Button
                            variant="outline-light"
                            onClick={() => handleDeleteStep(i, values, setValues)}
                          >
                            remove
                          </Button>
                        )}
                        <Form.Control.Feedback type="invalid">
                          {errors.text && errors.text[i] && errors.text[i].text}
                        </Form.Control.Feedback>
                      </Form.Group>
                    ))}
                  </FieldArray>
                </Form.Group>
                <Button variant="outline-light" onClick={() => handleAddStep(values, setValues)}>
                  click to add new Step
                </Button>
              </Form.Group>
              <Form.Group className="form-element">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="Image"
                  onChange={(e) => setFieldValue('Image', e.currentTarget.files[0])}
                  isValid={touched.Image && !errors.Image}
                  isInvalid={touched.Image && errors.Image}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Image}
                </Form.Control.Feedback>
                {values.Image ? (
                  <img src={URL.createObjectURL(values.Image)} alt="add img" />
                ) : (
                  <img alt="" />
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

export default AddInstruction;
