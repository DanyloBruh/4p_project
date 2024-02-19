/* eslint-disable dot-notation */
/* eslint-disable no-nested-ternary */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */

import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { FieldArray } from 'formik';
import BlogTextEditor from '../../../Components/BlogTextEditor/BlogTextEditor';
// import PreviewFile from '../../../Components/PreviewFile/PreviewFile';

/* eslint-disable react/prop-types */
function RenderAddFormBody({
  // handleInputChange,
  category,
  // formData,
  // setFormData,
  // ingredients,
  // setIngredients,
  // steps,
  // setSteps,
  // images,
  // setImages,
  errors,
  values,
  setValues,
  handleChange,
  touched,
  setFieldValue,
}) {
  const handleAddIngredient = () => {
    const newIngredient = [...values.ingredients];
    newIngredient.push({ ingredient: '' });
    setValues({ ...values, ingredients: newIngredient });
  };

  const handleDelete = (i) => {
    const deleteIngredient = [...values.ingredients];
    deleteIngredient.splice(i, 1);
    setValues({ ...values, ingredients: deleteIngredient });
  };

  const handleAddStep = () => {
    const newStep = [...values.text];
    newStep.push({ text: '' });
    setValues({ ...values, text: newStep });
  };

  const handleDeleteStep = (i) => {
    const deleteStep = [...values.text];
    deleteStep.splice(i, 1);
    setValues({ ...values, text: deleteStep });
  };

  const handleAddImage = () => {
    const newImage = [...values.Images];
    newImage.push({ image: '' });
    setValues({ ...values, Images: newImage });
  };

  const handleDeleteImages = (i) => {
    const deleteImages = [...values.Images];
    deleteImages.splice(i, 1);
    setValues({ ...values, Images: deleteImages });
  };

  switch (category) {
    case 'user':
      return (
        <>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter user name"

            >
              <Form.Control
                type="text"
                name="name"
                placeholder="user name"
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
              name="role"
              value={values.role}
              onChange={handleChange}
              isValid={touched.role && !errors.role}
              isInvalid={touched.role && errors.role}
              autoComplete="off"
            >
              <option>Сhoose a role from the select menu</option>
              <option>admin</option>
              <option>employee</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.role}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter email"

            >
              <Form.Control
                type="text"
                name="email"
                placeholder="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && errors.email}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter password"

            >
              <Form.Control
                type="password"
                name="password"
                placeholder="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Confirm password"

            >
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={touched.confirmPassword && errors.confirmPassword}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </>
      );
    case 'blog':
      return (
        <>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter title"

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
                {() =>
                  values.Images.map((item, i) => (
                    <Form.Group
                      key={`Images${i}`}
                      className="rendered-content"
                    >
                      <Form.Control
                        type="file"
                        name={`Images.${i}.image`}
                        onChange={(e) =>
                          setFieldValue(
                            `Images[${i}]`,
                            e.currentTarget.files[0],
                          )
                          }
                        isValid={touched.Images && !errors.Images?.[i]}
                        isInvalid={touched.Images && errors.Images?.[i]}
                      />
                      {values.Images.length > 1 && (
                      <Button
                        variant="outline-light"
                        onClick={() => handleDeleteImages(i)}
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
                  ))
                }
              </FieldArray>
            </Form.Group>
            <Button variant="outline-light" onClick={handleAddImage}>
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
        </>
      );
    case 'product':
      return (
        <>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter product name"

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
        </>
      );
    case 'instruction':
      return (
        <>
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
                {() =>
                  values.ingredients.map((item, i) => (
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
                        onClick={() => handleDelete(i)}
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
                  ))
                }
              </FieldArray>
            </Form.Group>
            <Button variant="outline-light" onClick={handleAddIngredient}>
              click to add new Ingredient
            </Button>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Steps</Form.Label>
            <Form.Group className="control-element">
              <FieldArray className="rendered-content" name="steps">
                {() =>
                  values.text.map((item, i) => {
                    console.log(i);
                    return (
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
                            onClick={() => handleDeleteStep(i)}
                          >
                            remove
                          </Button>
                        )}
                        <Form.Control.Feedback type="invalid">
                          {errors.text && errors.text[i] && errors.text[i].text}
                        </Form.Control.Feedback>
                      </Form.Group>
                    );
                  })
                }
              </FieldArray>
            </Form.Group>
            <Button variant="outline-light" onClick={handleAddStep}>
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
        </>
      );
    default:
      return <div />;
  }
}

export default RenderAddFormBody;
