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

function EditBlog({
  item, setData, fileOptions, close,
}) {
  const userId = useSelector((state) => state.auth.auth.user.id);
  const axiosPrivateConfig = useAxiosPrivateImages();

  const initialState = useMemo(() => ({
    name: item.name,
    text: item.text,
    Images: item.Images,
    displayType: item.displayType,
  }), []);
  const schema = useMemo(
    () => Yup.object().shape({
      name: Yup.string()
        .min(2, 'Title must be minimum 2')
        .max(100, 'Title must not be more than 100 characters')
        .required('Title is required')
        .matches(/^[^"]*$/, 'Title cannot contain double quotes'),
      text: Yup.string(),
      Images: Yup.array()
        .of(
          Yup.mixed()
            .test(
              'fileSize',
              'Image too large',
              (value) => {
                if (!value.size) return true;
                return value.size <= fileOptions.fileSize;
              },
            )
            .test(
              'fileFormat',
              'Unsupported format',
              (value) => {
                if (!value.type) return true;
                return fileOptions.supportedFormats.includes(value.type);
              },
            ),
        ),
      displayType: Yup.string()
        .oneOf(
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

  const handleSubmitForm = (values) => {
    console.log(item);
    if (values.Images) {
      // eslint-disable-next-line no-param-reassign
      values.Images = values.Images.map((image) => imageToFile(image));
    }
    const req = removeUnchangedFields(item, values);

    if (req.text) req.text = req.text.replace(/"/g, "'");
    editData('blog', item.id, axiosPrivateConfig, req)
      .then(() => {
        ToastNotification('success', 'Successfully updated!');
        setData((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.id === item.id) {
              return values;
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
                Edit blog
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
                  label="Enter title"
                  className="mb-3"
                >
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
              <Form.Group className="form-element">
                <p>text</p>

                <BlogTextEditor
                  setFormData={setValues}
                  formData={values}
                  content={values.text}
                />
                {errors.text && touched.text ? (
                  <div style={{ color: '#DC3545' }}>{errors.text}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="form-element images">
                <Form.Label>Images</Form.Label>
                <Form.Group className="control-element">
                  {values.Images.map((image, i) => (
                    <>
                      <Form.Group
                        className="rendered-content images"
                        key={image.id}
                      >
                        <Form.Control
                          type="file"
                          name="Images"
                          onChange={(e) => setFieldValue(`Images.[${i}]`, e.currentTarget.files[0])}
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
                        <Form.Control.Feedback type="invalid">
                          {errors.Images && errors.Images[i]}
                        </Form.Control.Feedback>
                      </Form.Group>
                      {image.imageData ? (
                        <img
                          key={image.imageName}
                          src={`data:image/png;base64,${image.imageData}`}
                          alt={image.imageName}
                        />
                      ) : (
                        image.image !== ''
                        && (
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
                <Button variant="outline-light" onClick={() => handleAddImage(values, setValues)}>
                  click to add new Image
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

export default EditBlog;
