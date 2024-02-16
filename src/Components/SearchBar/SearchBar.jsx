/* eslint-disable react/prop-types */
import './SearchBar.scss';
import React from 'react';

function SearchBar({ handleChange, value }) {
  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="form">
            <i className="fa fa-search" />
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search..."
              value={value}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
