import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { FloatingLabel, Form } from 'react-bootstrap';
import BlogTextEditor from '../../../Components/BlogTextEditor/BlogTextEditor';

/* eslint-disable react/prop-types */
function RenderAddFormBody({ handleInputChange, category, formData }) {
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

            <BlogTextEditor
              text={formData.text}
              handleInputChange={handleInputChange}
            />
            {/* <input
              type="text"
              onChange={handleInputChange}
              value={formData.text}
              name="text"
            /> */}
          </Form.Group>
          <Form.Group className="form-element">
            <p>images</p>
            <input type="file" onChange={handleInputChange} name="images" />
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
            <Form.Control
              required
              as="textarea"
              rows={5}
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
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
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
            <Form.Control
              required
              as="textarea"
              rows={2}
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
              rows={3}
              type="text"
              onChange={handleInputChange}
              value={formData.ingredients}
              name="ingredients"
            />
          </Form.Group>
          <Form.Group className="form-element">
            <Form.Label>Instruction text</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              type="text"
              onChange={handleInputChange}
              value={formData.text}
              name="text"
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
          </Form.Group>
        </>
      );
    default:
      return <div />;
  }
}

export default RenderAddFormBody;
