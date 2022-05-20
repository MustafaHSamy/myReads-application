import PropTypes from "prop-types";

const OptionsList = ({ bookShelf, book }) => {
  return (
    <div className="options-container">
      <button className="option" id="currentlyReading" book={book.id}>
        {bookShelf === "currentlyReading" && <span>✓</span>} Currently reading
      </button>

      <button className="option" id="wantToRead" book={book.id}>
        {bookShelf === "wantToRead" && <span> ✓</span>} Want to read
      </button>

      <button className="option" id="read" book={book.id}>
        {bookShelf === "read" && <span> ✓</span>} Read
      </button>
      <button className="option" id="none" book={book.id}>
        {bookShelf === undefined && <span> ✓</span>} None
      </button>
    </div>
  );
};

OptionsList.propTypes = {
  book: PropTypes.object,
  bookShelf: PropTypes.string,
};

export default OptionsList;
