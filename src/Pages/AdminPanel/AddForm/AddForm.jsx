import React from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddForm.scss';

function AddForm() {
  const category = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/admin/${category}`);
  };

  return (
    <div className="add-form">
      <div className="form-bg">
        <h3>
          Add
          {` ${category}`}
        </h3>
        <form>
          <div className="form-element">
            <p>Name</p>
            <input type="text" />
          </div>
          <div className="form-element">
            <p>description</p>
            <input type="text" />
          </div>
          <div className="form-element">
            <p>weight</p>
            <input type="text" />
          </div>
          <div className="form-element">
            <p>price</p>
            <input type="number" />
          </div>
          <div className="form-element">
            <p>ingredients</p>
            <input type="text" />
          </div>
          <br />
          <Button variant="outline-light" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
