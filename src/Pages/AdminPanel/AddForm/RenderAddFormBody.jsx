import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

/* eslint-disable react/prop-types */
function RenderAddFormBody({ handleInputChange, category, formData }) {
  switch (category) {
    case 'user':
      return (
        <>
          <div className="form-element">
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
          </div>
          <div className="form-element">
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
          </div>
          <div className="form-element">
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
          </div>
          <div className="form-element">
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
          </div>
        </>
      );
    case 'blog':
      return (
        <>
          <div className="form-element">
            <p>name</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.name}
              name="name"
            />
          </div>
          <div className="form-element">
            <p>text</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.text}
              name="text"
            />
          </div>
          <div className="form-element">
            <p>images</p>
            <input type="file" onChange={handleInputChange} name="images" />
          </div>
        </>
      );
    case 'product':
      return (
        <>
          <div className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter product name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={handleInputChange}
                value={formData.name}
                name="name"
                autoComplete="off"
                placeholder="product name"
              />
            </FloatingLabel>
          </div>
          <div className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter weight"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={handleInputChange}
                value={formData.weight}
                name="weight"
                autoComplete="off"
                placeholder="weight"
              />
            </FloatingLabel>
          </div>
          <div className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter price"
              className="mb-3"
            >
              <Form.Control
                type="number"
                onChange={handleInputChange}
                value={formData.price}
                name="price"
                autoComplete="off"
                placeholder="product name"
              />
            </FloatingLabel>
          </div>
          <div className="form-element">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              type="text"
              onChange={handleInputChange}
              value={formData.description}
              name="description"
            />
          </div>

          <div className="form-element">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              type="text"
              onChange={handleInputChange}
              value={formData.ingredients}
              name="ingredients"
            />
          </div>
          <div className="form-element">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleInputChange}
              name="image"
            />
          </div>
        </>
      );
    case 'instruction':
      return (
        <>
          <div className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter instruction name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={handleInputChange}
                value={formData.name}
                name="name"
                autoComplete="off"
                placeholder="instruction name"
              />
            </FloatingLabel>
          </div>
          <div className="form-element">
            <Form.Select
              aria-label="Default select example"
              onChange={handleInputChange}
              value={formData.difficulty}
              name="difficulty"
            >
              <option>Сhoose a difficulty from the select menu</option>
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </Form.Select>
          </div>
          <div className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter time"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={handleInputChange}
                value={formData.time}
                name="time"
                autoComplete="off"
                placeholder="time"
              />
            </FloatingLabel>
          </div>
          <div className="form-element">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter makes"
              className="mb-3"
            >
              <Form.Control
                type="number"
                onChange={handleInputChange}
                value={formData.makes}
                name="makes"
                autoComplete="off"
                placeholder="time"
              />
            </FloatingLabel>
          </div>
          <div className="form-element">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              type="text"
              onChange={handleInputChange}
              value={formData.description}
              name="description"
            />
          </div>
          <div className="form-element">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              onChange={handleInputChange}
              value={formData.ingredients}
              name="ingredients"
            />
          </div>
          <div className="form-element">
            <Form.Label>Instruction text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              onChange={handleInputChange}
              value={formData.text}
              name="text"
            />
          </div>
          <div className="form-element">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleInputChange}
              name="image"
            />
          </div>
        </>
      );
    default:
      return <div />;
  }
}

export default RenderAddFormBody;
