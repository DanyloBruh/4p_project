import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addUser } from '../../../redux/userSlice';
import './AddForm.scss';

function AddForm() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addUser({ name, role }));
  };

  return (
    <div className="add-form">
      <div className="form-bg">
        <h3>Add user</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <p>Name</p>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-element">
            <p>Role</p>
            <input
              type="text"
              id="role"
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <br />
          <Button variant="outline-light">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
