/* eslint-disable react/prop-types */
import './SearchBar.scss';
import React from 'react';

function SearchBar({ handleChange, value }) {
  return (
    <div className="row w-100 height d-flex justify-content-center align-items-center">
      <div className="col-md-6 mt-0 p-0">
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
  );
}

export default SearchBar;
