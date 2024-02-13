import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import BlogTextEditor from '../../../Components/BlogTextEditor/BlogTextEditor';

/* eslint-disable react/prop-types */
function RenderAddFormBody({
  handleInputChange,
  category,
  formData,
  setFormData,
  ingredients,
  setIngredients,
  steps,
  setSteps,
  images,
  setImages,
}) {
  const handleIngredient = (e, i) => {
    const { name, value } = e.target;
    /* eslint-disable prefer-const */
    let newIngredients = [...ingredients];
    newIngredients[i][name] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        ingredient: '',
        timestamp: new Date().getTime(),
      },
    ]);
  };

  const handleDelete = (i) => {
    let deleteIngredient = [...ingredients];
    deleteIngredient.splice(i, 1);
    setIngredients(deleteIngredient);
  };

  const handleStep = (e, i) => {
    const { name, value } = e.target;
    /* eslint-disable prefer-const */
    let newSteps = [...steps];
    newSteps[i][name] = value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        text: '',
        timestamp: new Date().getTime(),
      },
    ]);
  };

  const handleDeleteStep = (i) => {
    let deleteStep = [...steps];
    deleteStep.splice(i, 1);
    setSteps(deleteStep);
  };

  const handleImage = (e, i) => {
    const { name } = e.target;
    const value = e.target.files[0];
    /* eslint-disable prefer-const */
    let newImages = [...images];
    newImages[i][name] = value;
    setImages(newImages);
  };

  const handleAddImage = () => {
    setImages([
      ...images,
      {
        images: '',
        timestamp: new Date().getTime(),
      },
    ]);
  };

  const handleDeleteImages = (i) => {
    let deleteImages = [...images];
    deleteImages.splice(i, 1);
    setImages(deleteImages);
  };

  switch (category) {
    case 'user':
      return (
        <>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter user name"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                onChange={handleInputChange}
                value={formData.name}
                name="name"
                autoComplete="off"
                placeholder="user name"
              />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Select
              required
              aria-label="Default select example"
              onChange={handleInputChange}
              value={formData.role}
              name="role"
            >
              <option>Сhoose a role from the select menu</option>
              <option>admin</option>
              <option>employee</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter email"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                onChange={handleInputChange}
                value={formData.email}
                name="email"
                autoComplete="off"
                placeholder="email"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter password"
              className="mb-3"
            >
              <Form.Control
                required
                type="password"
                onChange={handleInputChange}
                value={formData.password}
                name="password"
                placeholder="password"
              />
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
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                onChange={handleInputChange}
                value={formData.name}
                name="name"
                placeholder="Title"
                autoComplete="off"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <p>text</p>

            <BlogTextEditor setFormData={setFormData} formData={formData} />
          </Form.Group>
          <Form.Group className="form-element images">
            <Form.Label>Images</Form.Label>
            <Form.Group className="control-element">
              {images.map((image, i) => (
                <>
                  <Form.Group
                    className="rendered-content images"
                    key={image.id}
                  >
                    <Form.Control
                      required
                      type="file"
                      name="images"
                      onChange={(e) => handleImage(e, i)}
                    />
                    <Button
                      variant="outline-light"
                      onClick={() => handleDeleteImages(i)}
                    >
                      remove
                    </Button>
                  </Form.Group>
                  {image.images ? (
                    <img
                      key={image.timestamp}
                      src={URL.createObjectURL(image.images)}
                      alt="add img"
                    />
                  ) : (
                    <img alt="" />
                  )}
                </>
              ))}
            </Form.Group>
            <Button variant="outline-light" onClick={handleAddImage}>
              click to add new Image
            </Button>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Select
              required
              aria-label="Default select example"
              onChange={handleInputChange}
              value={formData.displayType}
              name="displayType"
            >
              <option>choose where you want to display the blog</option>
              <option>firstPage</option>
              <option>featured</option>
              <option>default</option>
            </Form.Select>
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
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                onChange={handleInputChange}
                value={formData.name}
                name="name"
                autoComplete="off"
                placeholder="product name"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter weight"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                onChange={handleInputChange}
                value={formData.weight}
                name="weight"
                autoComplete="off"
                placeholder="weight"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter price"
              className="mb-3"
            >
              <Form.Control
                required
                type="number"
                onChange={handleInputChange}
                value={formData.price}
                name="price"
                autoComplete="off"
                placeholder="product name"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Description</Form.Label>
            <TextareaAutosize
              rows={5}
              minRows={5}
              className="form-control"
              required
              type="text"
              onChange={handleInputChange}
              value={formData.description}
              name="description"
            />
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={5}
              type="text"
              onChange={handleInputChange}
              value={formData.ingredients}
              name="ingredients"
            />
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="file"
              onChange={handleInputChange}
              name="image"
            />
            {formData.image ? (
              <img src={URL.createObjectURL(formData.image)} alt="add img" />
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
              className="mb-3"
            >
              <Form.Control
                type="text"
                required
                onChange={handleInputChange}
                value={formData.name}
                name="name"
                autoComplete="off"
                placeholder="instruction name"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Select
              required
              aria-label="Default select example"
              onChange={handleInputChange}
              value={formData.difficulty}
              name="difficulty"
            >
              <option>Сhoose a difficulty from the select menu</option>
              <option>Very easy</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
              <option>Very hard</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter time"
              className="mb-3"
            >
              <Form.Control
                type="text"
                required
                onChange={handleInputChange}
                value={formData.time}
                name="time"
                autoComplete="off"
                placeholder="time"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter makes"
              className="mb-3"
            >
              <Form.Control
                required
                type="number"
                onChange={handleInputChange}
                value={formData.makes}
                name="makes"
                autoComplete="off"
                placeholder="time"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Description</Form.Label>
            <TextareaAutosize
              rows={5}
              minRows={5}
              className="form-control"
              required
              type="text"
              onChange={handleInputChange}
              value={formData.description}
              name="description"
            />
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Ingredients</Form.Label>
            <Form.Group className="control-element">
              {ingredients.map((ingredient, i) => (
                <Form.Group
                  className="rendered-content"
                  key={ingredient.timestamp}
                >
                  <Form.Control
                    required
                    type="text"
                    onChange={(e) => handleIngredient(e, i)}
                    name="ingredient"
                    autoComplete="off"
                  />
                  <Button
                    variant="outline-light"
                    onClick={() => handleDelete(i)}
                  >
                    remove
                  </Button>
                </Form.Group>
              ))}
            </Form.Group>
            <Button variant="outline-light" onClick={handleAddIngredient}>
              click to add new Ingredient
            </Button>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Steps</Form.Label>
            <Form.Group className="control-element">
              {steps.map((step, i) => (
                <Form.Group className="rendered-content" key={step.timestamp}>
                  <TextareaAutosize
                    rows={5}
                    minRows={2}
                    className="form-control"
                    required
                    type="text"
                    onChange={(e) => handleStep(e, i)}
                    name="text"
                  />
                  <Button
                    variant="outline-light"
                    onClick={() => handleDeleteStep(i)}
                  >
                    remove
                  </Button>
                </Form.Group>
              ))}
            </Form.Group>
            <Button variant="outline-light" onClick={handleAddStep}>
              click to add new Step
            </Button>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="file"
              onChange={handleInputChange}
              name="image"
            />
            {formData.image ? (
              <img src={URL.createObjectURL(formData.image)} alt="add img" />
            ) : (
              <img alt="" />
            )}
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Check // prettier-ignore
              type="switch"
              label="Add this recipe to the carousel"
              name="carrousel"
              onChange={handleInputChange}
              checked={formData.carrousel}
            />
          </Form.Group>
        </>
      );
    default:
      return <div />;
  }
}

export default RenderAddFormBody;
