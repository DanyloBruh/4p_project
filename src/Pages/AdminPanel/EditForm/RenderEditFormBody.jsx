import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import BlogTextEditor from '../../../Components/BlogTextEditor/BlogTextEditor';

/* eslint-disable react/prop-types */
function RenderEditFormBody({ handleInputChange, category, data }) {
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
              text={data.text}
              handleInputChange={handleInputChange}
            />
            {/* <input
            type="text"
            onChange={handleInputChange}
            value={data.text}
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
            <Form.Control
              required
              as="textarea"
              rows={3}
              type="text"
              onChange={handleInputChange}
              value={data.ingredients}
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
              value={data.text}
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

export default RenderEditFormBody;
