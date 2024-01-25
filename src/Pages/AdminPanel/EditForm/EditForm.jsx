import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './EditForm.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditForm() {
  const { id } = useParams();
  const { users } = useSelector((state) => state.user);
  const currentUser = users.filter((user) => user.id === id);
  /* eslint-disable object-curly-newline */
  const { name, email, password, role } = currentUser[0];

  const [currentName, setName] = useState(name);
  const [currentEmail, setEmail] = useState(email);
  const [currentPassword, setPassword] = useState(password);
  const [currentRole, setRole] = useState(role);
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    navigate('/admin/users');
  };

  return (
    <div className="add-form">
      <div className="form-bg">
        <h3>Edit user</h3>
        <form>
          <div className="form-element">
            <p>Name</p>
            <input
              type="text"
              value={currentName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-element">
            <p>email</p>
            <input
              type="text"
              value={currentEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-element">
            <p>password</p>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-element">
            <p>Role</p>
            <input
              type="text"
              value={currentRole}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <br />
          <Button variant="outline-light" onClick={handleUpdate}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
