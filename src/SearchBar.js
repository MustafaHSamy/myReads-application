import { Link } from "react-router-dom";

const SearchBar = ({ onChange }) => {
  return (
    <div className="search-container">
      <Link to={"/"} className="back-btn">
        🡰
      </Link>
      <input
        onChange={onChange}
        type="text"
        placeholder="Search for books or authors"
        className="search-bar"
      ></input>
    </div>
  );
};

export default SearchBar;
