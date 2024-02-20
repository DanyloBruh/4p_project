/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { FieldArray, Formik } from 'formik';
import React, { useMemo } from 'react';
import {
  Button, Container, FloatingLabel, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import ToastNotification from '../../../Components/Toast/Toast';
import { postDataConfig } from '../../../Helper/requests';
import useAxiosPrivateImages from '../../../Hooks/useAxiosPrivateWithImages';
import BlogTextEditor from '../../../Components/BlogTextEditor/BlogTextEditor';
import { handleAddImage, handleDeleteImages } from './blogUtilst';
import './blog.scss';

function AddBlog({ setData, fileOptions, close }) {
  const userId = useSelector((state) => state.auth.auth.user.id);
  const axiosPrivateConfig = useAxiosPrivateImages();

  const initialState = useMemo(
    () => ({
      name: '',
      text: '',
      Images: [{ image: '' }],
      displayType: '',
    }),
    [],
  );
  const schema = useMemo(
    () => Yup.object().shape({
      name: Yup.string()
        .min(2, 'Title must be minimum 2')
        .max(100, 'Title must not be more than 100 characters')
        .required('Title is required')
        .matches(/^[^"]*$/, 'Name cannot contain double quotes'),
      text: Yup.string().required('Text is required'),
      Images: Yup.array()
        .of(
          Yup.mixed()
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
        ),
      displayType: Yup.string()
        .required('DisplayType is required')
        .oneOf(
          ['firstPage', 'featured', 'default'],
          'Select the correct displayType',
        ),
    }),
    [],
  );

  const handleSubmitForm = (values) => {
    const req = {
      userId,
      ...values,
    };

    if (req.text) req.text = req.text.replace(/"/g, "'");

    postDataConfig('blog', axiosPrivateConfig, req)
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
    <div className="add-edit-form-bg">
      <div className="add-edit-form-blog-position">
        <Container className="add-edit-form">
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
                <Form.Label>Add product</Form.Label>

                <Form.Group className="form-element">
                  <FloatingLabel controlId="floatingInput" label="Enter title">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Title"
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
                <h4 style={{ color: '#fff' }}>Text</h4>
                <Form.Group className="form-element text-element">
                  <BlogTextEditor setFormData={setValues} formData={values} />
                  {errors.text && touched.text ? (
                    <div style={{ color: '#DC3545' }}>{errors.text}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="form-element">
                  <Form.Label>Images</Form.Label>
                  <Form.Group className="control-element">
                    <FieldArray className="rendered-content" name="Images">
                      {() => values.Images.map((item, i) => (
                        <>
                          <Form.Group
                              // eslint-disable-next-line react/no-array-index-key
                            key={`Images${i}`}
                            className="rendered-content "
                          >
                            <Form.Control
                              type="file"
                              name={`Images.${i}.image`}
                              onChange={(e) => setFieldValue(
                                `Images[${i}]`,
                                e.currentTarget.files[0],
                              )}
                              isValid={touched.Images && !errors.Images?.[i]}
                              isInvalid={touched.Images && errors.Images?.[i]}
                            />
                            {values.Images.length > 1 && (
                            <Button
                              variant="outline-light"
                              onClick={() => handleDeleteImages(i, values, setValues)}
                            >
                              remove
                            </Button>
                            )}
                          </Form.Group>
                          {item.name ? (
                            <img
                              src={URL.createObjectURL(item)}
                              alt="add img"
                            />
                          ) : null}
                          <Form.Control.Feedback type="invalid">
                            {errors.Images && errors.Images[i]}
                          </Form.Control.Feedback>
                        </>
                      ))}
                    </FieldArray>
                  </Form.Group>
                  <Button
                    variant="outline-light"
                    onClick={() => handleAddImage(values, setValues)}
                  >
                    click to add new Image
                  </Button>
                </Form.Group>
                <Form.Group className="form-element">
                  <Form.Select
                    name="displayType"
                    value={values.displayType}
                    onChange={handleChange}
                    isValid={touched.displayType && !errors.displayType}
                    isInvalid={touched.displayType && errors.displayType}
                    autoComplete="off"
                  >
                    <option>choose where you want to display the blog</option>
                    <option>firstPage</option>
                    <option>featured</option>
                    <option>default</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.displayType}
                  </Form.Control.Feedback>
                </Form.Group>

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
        </Container>
      </div>
    </div>
  );
}

export default AddBlog;
