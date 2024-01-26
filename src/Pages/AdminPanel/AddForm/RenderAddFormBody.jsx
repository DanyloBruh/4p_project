import React from 'react';

/* eslint-disable react/prop-types */
function RenderAddFormBody({ handleInputChange, category, formData }) {
  switch (category) {
    case 'user':
      return (
        <>
          <div className="form-element">
            <p>Name</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.name}
              name="name"
            />
          </div>
          <div className="form-element">
            <p>role</p>
            <select
              onChange={handleInputChange}
              value={formData.role}
              name="role"
            >
              <option>admin</option>
              <option>employee</option>
            </select>
          </div>
          <div className="form-element">
            <p>email</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.email}
              name="email"
            />
          </div>
          <div className="form-element">
            <p>password</p>
            <input
              type="password"
              onChange={handleInputChange}
              value={formData.password}
              name="password"
            />
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
            <p>Name</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.name}
              name="name"
            />
          </div>
          <div className="form-element">
            <p>weight</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.weight}
              name="weight"
            />
          </div>
          <div className="form-element">
            <p>description</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.description}
              name="description"
            />
          </div>
          <div className="form-element">
            <p>price</p>
            <input
              type="number"
              onChange={handleInputChange}
              value={formData.price}
              name="price"
            />
          </div>
          <div className="form-element">
            <p>ingredients</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.ingredients}
              name="ingredients"
            />
          </div>
          <div className="form-element">
            <p>image</p>
            <input type="file" onChange={handleInputChange} name="image" />
          </div>
        </>
      );
    case 'instruction':
      return (
        <>
          <div className="form-element">
            <p>Name</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.name}
              name="name"
            />
          </div>
          <div className="form-element">
            <p>difficulty</p>
            <select
              onChange={handleInputChange}
              value={formData.difficulty}
              name="difficulty"
            >
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
          </div>
          <div className="form-element">
            <p>time</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.time}
              name="time"
            />
          </div>
          <div className="form-element">
            <p>makes</p>
            <input
              type="number"
              onChange={handleInputChange}
              value={formData.makes}
              name="makes"
            />
          </div>
          <div className="form-element">
            <p>description</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.description}
              name="description"
            />
          </div>
          <div className="form-element">
            <p>ingredients</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.ingredients}
              name="ingredients"
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
            <p>image</p>
            <input type="file" onChange={handleInputChange} name="image" />
          </div>
        </>
      );
    default:
      return <div />;
  }
}

export default RenderAddFormBody;
