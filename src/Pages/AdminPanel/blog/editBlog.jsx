/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */

/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import {
  Button, Container, FloatingLabel, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import TextareaAutosize from 'react-textarea-autosize';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';
import ToastNotification from '../../../Components/Toast/Toast';
import { editData, postDataConfig } from '../../../Helper/requests';
import useAxiosPrivateImages from '../../../Hooks/useAxiosPrivateWithImages';
import BlogTextEditor from '../../../Components/BlogTextEditor/BlogTextEditor';
import { handleAddImage, handleDeleteImages } from './blogUtilst';
import { removeUnchangedFields } from '../adminUtils';
import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';

function EditBlog({
  item, setData, fileOptions, close,
}) {
  const axiosPrivateConfig = useAxiosPrivateImages();
  const axiosPrivate = useAxiosPrivate();

  const initialState = useMemo(
    () => ({
      name: item.name,
      text: item.text,
      Images: item.Images,
      displayType: item.displayType,
    }),
    [],
  );
  const schema = useMemo(
    () => Yup.object().shape({
      name: Yup.string()
        .min(2, 'Title must be minimum 2')
        .max(100, 'Title must not be more than 100 characters')
        .required('Title is required')
        .matches(/^[^"]*$/, 'Title cannot contain double quotes'),
      text: Yup.string(),
      Images: Yup.array().of(
        Yup.mixed()
          .test('fileSize', 'Image too large', (value) => {
            if (!value.size) return true;
            return value.size <= fileOptions.fileSize;
          })
          .test('fileFormat', 'Unsupported format', (value) => {
            if (!value.type) return true;
            return fileOptions.supportedFormats.includes(value.type);
          }),
      ),
      displayType: Yup.string().oneOf(
        ['firstPage', 'featured', 'default'],
        'Select the correct displayType',
      ),
    }),
    [],
  );

  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

  const imageToFile = useCallback((imageObj) => {
    const sliceSize = 512;
    if (!imageObj.id) return imageObj;
    const byteCharacters = atob(imageObj.imageData);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: imageObj.imageType });
    const file = new File([blob], imageObj.imageName, {
      type: imageObj.imageType,
    });

    return file;
  }, []);

  const equlePhotos = useCallback((files1, files2) => {
    if (files1.length !== files2.length) {
      return false;
    }
    for (let i = 0; i < files1.length; i += 1) {
      if (files1[i].type !== files2[i].type
        || files1[i].name !== files2[i].name
        || files1[i].size !== files2[i].size) {
        return false;
      }
    }
    return true;
  }, []);
  const handleSubmitForm = (values) => {
    if (values.Images) {
      // eslint-disable-next-line no-param-reassign
      values.Images = values.Images.map(imageToFile).filter((image) => image.name);
    }
    const req = removeUnchangedFields(item, values);
    let ax;
    const files1 = item.Images.map(imageToFile);
    const files2 = req.Images;
    if (values.Images.length === 0 && equlePhotos(files1, files2)) {
      delete req.Images;
      ax = axiosPrivate;
    } else {
      ax = axiosPrivateConfig;
    }

    if (Object.keys(req).length === 0) {
      ToastNotification(
        'error',
        'You haven\'t changed anything',
      );

      return;
    }
    if (req.text) req.text = req.text.replace(/"/g, "'");
    editData('blog', item.id, ax, req)
      .then(() => {
        ToastNotification('success', 'Successfully updated!');
        setData((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.id === item.id) {
              return {
                ...item,
                ...req,
              };
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
                <Form.Label>Edit blog</Form.Label>

                <Form.Group className="form-element">
                  <FloatingLabel controlId="floatingInput" label="Enter title">
                    <Form.Control
                      required
                      type="text"
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      placeholder="Title"
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && errors.name}
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Group className="form-element text-element">
                  <BlogTextEditor
                    setFormData={setValues}
                    formData={values}
                    content={values.text}
                  />
                  {errors.text && touched.text ? (
                    <div style={{ color: '#DC3545' }}>{errors.text}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="form-element form-element-add images">
                  <Form.Label>Images</Form.Label>
                  <Form.Group className="control-element">
                    {values.Images.map((image, i) => (
                      <>
                        <Form.Group
                          className="rendered-content images"
                          key={image.id}
                        >
                          <div className="d-flex">
                            <Form.Control
                              type="file"
                              name="Images"
                              onChange={(e) => setFieldValue(
                                `Images.[${i}]`,
                                e.currentTarget.files[0],
                              )}
                              isValid={touched.Images && !errors.Images?.[i]}
                              isInvalid={touched.Images && errors.Images?.[i]}
                            />
                            {values.Images.length > 1 && (
                              <Button
                                variant="outline-light"
                                className="ml-3 rounded-0"
                                onClick={() => handleDeleteImages(i, values, setValues)}
                              >
                                remove
                              </Button>
                            )}
                          </div>
                        </Form.Group>
                        {image.imageData ? (
                          <img
                            key={image.imageName}
                            src={`data:image/png;base64,${image.imageData}`}
                            alt={image.imageName}
                          />
                        ) : (
                          image.image !== '' && (
                            <img
                              key={image.imageName}
                              src={URL.createObjectURL(image)}
                              alt={image.imageName}
                            />
                          )
                        )}
                      </>
                    ))}
                  </Form.Group>
                  <Button
                    variant="outline-light"
                    onClick={() => handleAddImage(values, setValues)}
                  >
                    Click to add new image
                  </Button>
                </Form.Group>
                <Form.Group className="form-element">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={values.displayType}
                    isValid={touched.displayType && !errors.displayType}
                    isInvalid={touched.displayType && errors.displayType}
                    name="displayType"
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

export default EditBlog;
