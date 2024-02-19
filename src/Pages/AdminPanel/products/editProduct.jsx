/* eslint-disable no-unused-vars */

/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable operator-linebreak */

/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import TextareaAutosize from 'react-textarea-autosize';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';
import ToastNotification from '../../../Components/Toast/Toast';
import { editDataConfig } from '../../../Helper/requests';
import useAxiosPrivateImages from '../../../Hooks/useAxiosPrivateWithImages';
import { removeUnchangedFields } from '../adminUtils';

function EditProduct({ item, setData, fileOptions, close }) {
  const UserId = useSelector((state) => state.auth.auth.user.id);
  const axiosPrivateConfig = useAxiosPrivateImages();

  console.log(item);

  const initialState = useMemo(
    () => ({
      name: item.name,
      weight: item.weight,
      description: item.description,
      price: item.price,
      Image: item.Image,
      ingredients: item.ingredients,
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
          .required('Name is required'),
        weight: Yup.number('Weight must be a number').required(
          'Weight is required',
        ),
        description: Yup.string().required('Description is required'),
        price: Yup.number('Price must be a number').required(
          'Price is required',
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
        ingredients: Yup.string().required('Ingredients is required'),
      }),
    [],
  );

  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

  const handleSubmitForm = (values) => {
    const request = removeUnchangedFields(item, values);
    editDataConfig('product', item.id, axiosPrivateConfig, {
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
            setFieldValue,
          }) => (
            <form
              className="form"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <Form.Label>
                Edit product
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
                    type="number"
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
                    touched.description && errors.description
                      ? 'is-invalid'
                      : touched.description && !errors.description
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
                {values.Image && !values.Image.id ? (
                  <img src={URL.createObjectURL(values.Image)} alt="edit img" />
                ) : (
                  <img
                    src={`data:image/png;base64,${values.Image.imageData}`}
                    alt="edit img"
                  />
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

export default EditProduct;