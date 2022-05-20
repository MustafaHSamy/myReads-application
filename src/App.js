import "./App.css";
import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Shelf from "./Shelf";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./SearchBar";
import Search from "./Search";
import PropTypes from "prop-types";

function App() {
  const [books, setBooks] = useState([]);
  const [shelvesBooks, setShelvesBooks] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    let value = e.target.value;
    setTimeout(() => setQuery(value), 100);
  };

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("back-btn")) {
      console.log("clearing query");
      e.target.value = "";
      setQuery("");
      setBooks([]);
    }
  });

  useEffect(() => {
    const getBooks = async () => {
      const allBooks = await BooksAPI.search(query.trim());
      const myBooks = await BooksAPI.getAll();
      if (allBooks === undefined || allBooks.items !== undefined) {
        setBooks([]);
      } else {
        for (const book of allBooks) {
          for (const myBook of myBooks) {
            if (book.id === myBook.id) {
              book.shelf = myBook.shelf;
            }
          }
        }
        setBooks(allBooks.filter((book) => book.imageLinks !== undefined));
      }
      setShelvesBooks(myBooks);
    };
    getBooks();
  }, [query]);

  const updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    book.shelf = shelf;
    const update = [...shelvesBooks.filter((b) => b.id !== book.id), book];
    setShelvesBooks(update);
  };

  document.addEventListener("click", (e) => {
    let shelf = e.target.id;
    if (
      shelf === "currentlyReading" ||
      shelf === "wantToRead" ||
      shelf === "read" ||
      shelf === "none"
    ) {
      async function manageBook() {
        const book = await BooksAPI.get(e.target.getAttribute("book"));
        updateShelf(book, shelf);
      }
      manageBook();
    }
  });

  return (
    <Routes>
      <Route
        exact
        path={"/"}
        element={
          <div>
            <div className="header">My Reads</div>
            <Shelf
              shelfBooks={shelvesBooks}
              sectionName="Currently Reading"
              contains="currentlyReading"
              id="currently-reading"
            />
            <Shelf
              shelfBooks={shelvesBooks}
              sectionName="Want to Read"
              contains="wantToRead"
              id="want-to-read"
            />
            <Shelf
              shelfBooks={shelvesBooks}
              sectionName="Read"
              contains="read"
              id="already-read"
            />
            <Link to={"/search"} className="add-books">
              +
            </Link>
          </div>
        }
      />
      <Route
        exact
        path="/search"
        element={
          <div>
            <SearchBar onChange={handleSearch} />
            <Search shelfBooks={books} id="search-page" query={query} />
          </div>
        }
      />
    </Routes>
  );
}

App.propTypes = {
  books: PropTypes.array,
  shelvesBooks: PropTypes.array,
  query: PropTypes.string,
  handleSearch: PropTypes.func,
  updateShelf: PropTypes.func,
};

export default App;
