/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */

/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable operator-linebreak */

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

function EditInstruction({ item, setData, fileOptions, close }) {
  const UserId = useSelector((state) => state.auth.auth.user.id);
  const axiosPrivateConfig = useAxiosPrivateImages();

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
          .required('Name is required'),

        difficulty: Yup.string()
          .required('Difficulty is required')
          .oneOf(
            ['Very easy', 'Easy', 'Medium', 'Hard', 'Very hard'],
            'Select the correct difficulty',
          ),
        time: Yup.string().required('Time is required'),
        makes: Yup.number('Makes must be a number')
          .required('Makes is required')
          .positive('Makes must be positive'),
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
    console.log(values);
    // eslint-disable-next-line no-param-reassign
    values.ingredients = values.ingredients
      .map((ingredient) => ingredient.ingredient)
      .join(' | ');
    // eslint-disable-next-line no-param-reassign
    values.text = values.text.map((step) => step.text).join(' | ');

    const request = removeUnchangedFields(item, values);

    editDataConfig('instruction', item.id, axiosPrivateConfig, {
      ...request,
      UserId,
    })
      .then(() => {
        ToastNotification('success', 'Successfully updated!');
        setData((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.id === item.id) {
              return { ...values, id: item.id };
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
                <Button onClick={() => close()}>
                  <IconContext.Provider value={iconProviderValue}>
                    <IoMdClose />
                  </IconContext.Provider>
                </Button>
              </Form.Label>

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
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter time"

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
                    {() => {
                      console.log(typeof values.ingredients);
                      return values.ingredients.map((itemIng, i) => (
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
                            value={itemIng.ingredient}
                            onChange={handleChange}
                            autoComplete="off"
                          />

                          {values.ingredients.length > 1 && (
                            <Button
                              variant="outline-light"
                              onClick={() =>
                                handleDeleteIngredient(i, values, setValues)
                              }
                            >
                              remove
                            </Button>
                          )}
                          <Form.Control.Feedback type="invalid">
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
                    {() =>
                      values.text.map((itemIng, i) => {
                        console.log(itemIng);
                        return (
                          <Form.Group
                            key={`text${i}`}
                            className="rendered-content"
                          >
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
                                onClick={() =>
                                  handleDeleteStep(i, values, setValues)
                                }
                              >
                                remove
                              </Button>
                            )}
                            <Form.Control.Feedback type="invalid">
                              {errors.text &&
                                errors.text[i] &&
                                errors.text[i].text}
                            </Form.Control.Feedback>
                          </Form.Group>
                        );
                      })
                    }
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
                  <img src={URL.createObjectURL(values.Image)} alt="edit img" />
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

export default EditInstruction;
