/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { FieldArray, Formik } from 'formik';
import React, { useMemo } from 'react';
import {
  Button, Container, FloatingLabel, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';
import ToastNotification from '../../../Components/Toast/Toast';
import { postDataConfig } from '../../../Helper/requests';
import useAxiosPrivateImages from '../../../Hooks/useAxiosPrivateWithImages';
import BlogTextEditor from '../../../Components/BlogTextEditor/BlogTextEditor';
import { handleAddImage, handleDeleteImages } from './blogUtilst';

function AddBlog({ setData, fileOptions, close }) {
  const userId = useSelector((state) => state.auth.auth.user.id);
  const axiosPrivateConfig = useAxiosPrivateImages();

  const initialState = useMemo(() => ({
    name: '',
    text: '',
    Images: [{ image: '' }],
    displayType: '',
  }), []);
  const schema = useMemo(
    () => Yup.object().shape({
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
              (value) => !value || value.size <= fileOptions.fileSize,
            )
            .test(
              'fileFormat',
              'Unsupported format',
              (value) => !value || fileOptions.supportedFormats.includes(value.type),
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

  const iconProviderValue = useMemo(() => {
    const res = { color: 'white', size: '2em' };
    return res;
  }, []);

  const handleSubmitForm = (values) => {
    const req = {
      userId,
      ...values,
    };

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
                Add product
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
              <Form.Group className="form-element">
                <p>text</p>
                <BlogTextEditor
                  setFormData={setValues}
                  formData={values}
                />
                {errors.text && touched.text ? (
                  <div className="validtaionText">{errors.text}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="form-element">
                <Form.Label>Images</Form.Label>
                <Form.Group className="control-element">
                  <FieldArray className="rendered-content" name="Images">
                    {() => values.Images.map((item, i) => (
                      <Form.Group
                        // eslint-disable-next-line react/no-array-index-key
                        key={`Images${i}`}
                        className="rendered-content"
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
                        {item.name ? (
                          <img src={URL.createObjectURL(item)} alt="add img" />
                        ) : (
                          <img alt="" />
                        )}
                        <Form.Control.Feedback type="invalid">
                          {errors.Images && errors.Images[i]}
                        </Form.Control.Feedback>
                      </Form.Group>
                    ))}
                  </FieldArray>
                </Form.Group>
                <Button variant="outline-light" onClick={() => handleAddImage(values, setValues)}>
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

export default AddBlog;
