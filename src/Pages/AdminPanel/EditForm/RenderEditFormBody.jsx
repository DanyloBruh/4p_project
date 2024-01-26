import React from 'react';

/* eslint-disable react/prop-types */
function RenderEditFormBody({ handleInputChange, category, data }) {
  switch (category) {
    case 'user':
      return (
        <>
          <div className="form-element">
            <p>Name</p>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-element">
            <p>email</p>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleInputChange}
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
              value={data.name}
              name="name"
            />
          </div>
          <div className="form-element">
            <p>text</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={data.text}
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
              value={data.name}
              name="name"
            />
          </div>
          <div className="form-element">
            <p>weight</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={data.weight}
              name="weight"
            />
          </div>
          <div className="form-element">
            <p>description</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={data.description}
              name="description"
            />
          </div>
          <div className="form-element">
            <p>price</p>
            <input
              type="number"
              onChange={handleInputChange}
              value={data.price}
              name="price"
            />
          </div>
          <div className="form-element">
            <p>ingredients</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={data.ingredients}
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
              value={data.name}
              name="name"
            />
          </div>
          <div className="form-element">
            <p>difficulty</p>
            <select
              onChange={handleInputChange}
              value={data.difficulty}
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
              value={data.time}
              name="time"
            />
          </div>
          <div className="form-element">
            <p>makes</p>
            <input
              type="number"
              onChange={handleInputChange}
              value={data.makes}
              name="makes"
            />
          </div>
          <div className="form-element">
            <p>description</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={data.description}
              name="description"
            />
          </div>
          <div className="form-element">
            <p>ingredients</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={data.ingredients}
              name="ingredients"
            />
          </div>
          <div className="form-element">
            <p>text</p>
            <input
              type="text"
              onChange={handleInputChange}
              value={data.text}
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

export default RenderEditFormBody;
