/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */

import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import TextareaAutosize from 'react-textarea-autosize';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';
import ToastNotification from '../../../Components/Toast/Toast';
import { postDataConfig } from '../../../Helper/requests';
import useAxiosPrivateImages from '../../../Hooks/useAxiosPrivateWithImages';

function AddProduct({ setData, fileOptions, close }) {
  const userId = useSelector((state) => state.auth.auth.user.id);
  const axiosPrivateConfig = useAxiosPrivateImages();

  const initialState = useMemo(
    () => ({
      name: '',
      weight: '',
      description: '',
      price: '',
      Image: '',
      ingredients: '',
    }),
    [],
  );
  const schema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string()
          .min(2, 'Name must be minimum 2')
          .max(100, 'Name must not be more than 100 characters')
          .matches('^[A-Za-z]{1,20}', 'Product name must not contain numbers')
          .matches(/^[^"]*$/, 'Name cannot contain double quotes')
          .required('Name is required'),
        weight: Yup.number()
          .typeError('Weight must be a number')
          .required('Weight is required')
          .positive('Weight must be positive'),
        description: Yup.string()
          .required('Description is required')
          .matches(/^[^"]*$/, 'Description cannot contain double quotes'),
        price: Yup.number()
          .typeError('Price must be a number')
          .required('Price is required')
          .positive('Price must be positive'),
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
            (value) =>
              value && fileOptions.supportedFormats.includes(value.type),
          ),
        ingredients: Yup.string()
          .required('Ingredients is required')
          .matches(/^[^"]*$/, 'Ingredients cannot contain double quotes'),
      }),
    [],
  );

  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

  const handleSubmitForm = (values) => {
    const req = {
      userId,
      ...values,
    };

    postDataConfig('product', axiosPrivateConfig, req)
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
            setFieldValue,
          }) => (
            <form
              className="form"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <Form.Label>
                Add product
                <Button onClick={() => close()}>
                  <IconContext.Provider value={iconProviderValue}>
                    <IoMdClose />
                  </IconContext.Provider>
                </Button>
              </Form.Label>

              <Form.Group className="form-element">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter product name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="product name"
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
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter weight"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="weight"
                    placeholder="weight"
                    value={values.weight}
                    onChange={handleChange}
                    isValid={touched.weight && !errors.weight}
                    isInvalid={touched.weight && errors.weight}
                    autoComplete="off"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.weight}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="form-element">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter price"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="price"
                    placeholder="price"
                    value={values.price}
                    onChange={handleChange}
                    isValid={touched.price && !errors.price}
                    isInvalid={touched.price && errors.price}
                    autoComplete="off"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
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
                <TextareaAutosize
                  name="ingredients"
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
                  value={values.ingredients}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ingredients}
                </Form.Control.Feedback>
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
                {values.Image ? (
                  <img src={URL.createObjectURL(values.Image)} alt="add img" />
                ) : (
                  <img alt="" />
                )}
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

export default AddProduct;
