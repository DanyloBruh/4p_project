import './SearchBar.scss';
import React from 'react';

function SearchBar() {
  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="form">
            <i className="fa fa-search" />
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search recipe..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
