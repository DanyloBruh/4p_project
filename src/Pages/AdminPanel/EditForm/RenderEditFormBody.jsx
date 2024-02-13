import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import BlogTextEditor from '../../../Components/BlogTextEditor/BlogTextEditor';

/* eslint-disable react/prop-types */
function RenderEditFormBody({
  handleInputChange,
  category,
  data,
  setData,
  ingredients,
  setIngredients,
  steps,
  setSteps,
  images,
  setImages,
}) {
  console.log(data);
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
    // const { name } = e.target;
    const value = e.target.files[0];
    const newImages = [...images];
    newImages[i] = { images: value, timestamp: new Date().getTime() };
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

  // console.log(URL.createObjectURL(images[2].images));

  // {data.image && data.image.id ? (
  //   <img
  //     src={`data:image/png;base64,${data.image.imageData}`}
  //     alt="edit img"
  //   />
  // ) : (
  //   // <img src={URL.createObjectURL(data.image)} alt="edit img" />
  //   <img
  //     src={`data:image/png;base64,${data.Image.imageData}`}
  //     alt="edit img"
  //   />
  // )}

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
                value={data.name}
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
              value={data.role}
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
                value={data.email}
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
                value={data.password}
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
                value={data.name}
                name="name"
                placeholder="Title"
                autoComplete="off"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <p>text</p>

            <BlogTextEditor
              setFormData={setData}
              formData={data}
              content={data.text}
            />
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
                  {image.images.imageData ? (
                    <img
                      key={image.imageName}
                      src={`data:image/png;base64,${image.images.imageData}`}
                      alt={image.imageName}
                    />
                  ) : (
                    <img
                      key={image.imageName}
                      src={image.images && URL.createObjectURL(image.images)}
                      alt={image.imageName}
                    />
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
              value={data.displayType}
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
                value={data.name}
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
                value={data.weight}
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
                value={data.price}
                name="price"
                autoComplete="off"
                placeholder="product name"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={5}
              type="text"
              onChange={handleInputChange}
              value={data.description}
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
              value={data.ingredients}
              name="ingredients"
            />
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="file"
              onChange={handleInputChange}
              name="Image"
            />
            {data.Image && !data.Image.id ? (
              <img src={URL.createObjectURL(data.Image)} alt="edit img" />
            ) : (
              <img
                src={`data:image/png;base64,${data.Image.imageData}`}
                alt="edit img"
              />
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
                value={data.name}
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
              value={data.difficulty}
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
                value={data.time}
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
                value={data.makes}
                name="makes"
                autoComplete="off"
                placeholder="time"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={2}
              type="text"
              onChange={handleInputChange}
              value={data.description}
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
                    value={ingredient.ingredient}
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
                  <Form.Control
                    required
                    rows={3}
                    as="textarea"
                    type="text"
                    onChange={(e) => handleStep(e, i)}
                    name="text"
                    autoComplete="off"
                    value={step.text}
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
              name="Image"
            />
            {data.Image && !data.Image.id ? (
              <img src={URL.createObjectURL(data.Image)} alt="edit img" />
            ) : (
              <img
                src={`data:image/png;base64,${data.Image.imageData}`}
                alt="edit img"
              />
            )}
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Check // prettier-ignore
              type="switch"
              label="Add this recipe to the carousel"
              name="carrousel"
              onChange={handleInputChange}
              checked={data.carrousel}
            />
          </Form.Group>
        </>
      );
    case 'order':
      return (
        <>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                onChange={handleInputChange}
                value={data.name}
                name="name"
                autoComplete="off"
                placeholder="product name"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Phone number"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                onChange={handleInputChange}
                value={data.phoneNamber}
                name="phoneNamber"
                autoComplete="off"
                placeholder="phoneNamber"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                onChange={handleInputChange}
                value={data.adress}
                name="adress"
                autoComplete="off"
                placeholder="adress"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Comment"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                onChange={handleInputChange}
                value={data.comment}
                name="comment"
                autoComplete="off"
                placeholder="comment"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Select
              required
              onChange={handleInputChange}
              value={data.paymentType}
              name="paymentType"
            >
              <option>Сhoose a payment type from the select menu</option>
              <option>card</option>
              <option>cash</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Select
              required
              onChange={handleInputChange}
              value={data.deliveryType}
              name="deliveryType"
            >
              <option>Сhoose a delivery type from the select menu</option>
              <option>self</option>
              <option>courier</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Total amount"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                onChange={handleInputChange}
                value={data.totalAmount}
                name="totalAmount"
                autoComplete="off"
                placeholder="totalAmount"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Select
              required
              onChange={handleInputChange}
              value={data.status}
              name="deliveryType"
            >
              <option>Сhoose a order status from the select menu</option>
              <option>ordered, not processed</option>
              <option>ordered, processed</option>
              <option>courier on the way</option>
              <option>delivered</option>
              <option>requires processing</option>
            </Form.Select>
          </Form.Group>
        </>
      );
    default:
      return <div />;
  }
}

export default RenderEditFormBody;
