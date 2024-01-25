import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AddForm.scss';

function AddForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  console.log(name, email, password, role);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/admin/users');
    console.log('event');
  };

  return (
    <div className="add-form">
      <div className="form-bg">
        <h3>Add user</h3>
        <form>
          <div className="form-element">
            <p>Name</p>
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-element">
            <p>email</p>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-element">
            <p>password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-element">
            <p>Role</p>
            <input type="text" onChange={(e) => setRole(e.target.value)} />
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
