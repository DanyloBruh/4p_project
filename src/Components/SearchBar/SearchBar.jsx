import "./SearchBar.scss";

function SearchBar() {
  return (
    <div class="container">
      <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-6">
          <div class="form">
            <i class="fa fa-search"></i>
            <input
              type="text"
              class="form-control form-input"
              placeholder="Search recipe..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
