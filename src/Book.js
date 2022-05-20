import { useState } from "react";
import OptionsList from "./OptionsList";
// import OptionsList from "./OptionsList";

const Book = ({ className, book }) => {
  const [options, setOptions] = useState("invisible");
  const handleSowhingOptions = () => {
    setTimeout(() => {
      if (options === "visible") {
        setOptions("invisible");
      } else {
        setOptions("visible");
      }
    }, 0);
  };

  document.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("option") &&
      !e.target.classList.contains("options-container")
    ) {
      setOptions("invisible");
    }
  });

  return (
    <div className={className}>
      <div className="img-container">
        <button className="book-button" onClick={handleSowhingOptions}>
          &#9660;
        </button>
        {options === "visible" && (
          <OptionsList bookShelf={book.shelf} book={book} />
        )}

        {book.imageLinks !== undefined && (
          <img
            alt={book.title}
            src={book.imageLinks.thumbnail}
            className="book-image"
          ></img>
        )}
      </div>
      <p className="book-info">
        <strong>{book.title}</strong> <br></br>
        by {book.authors}
      </p>
    </div>
  );
};

export default Book;
