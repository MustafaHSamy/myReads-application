import Book from "./Book";

const Search = ({ shelfBooks, query, id }) => {
  return (
    <section id="searchPage" className="container-fluid p-3 row gy-5">
      {shelfBooks.length !== 0 && (
        <h1 className="col-12 text-center">
          searching for{" "}
          <strong>
            <em>{query}</em>
          </strong>
        </h1>
      )}
      {shelfBooks.length === 0 && query !== "" && (
        <h2 className="col-12 text-center">
          {" "}
          No results for{" "}
          <strong>
            <em>{query}</em>
          </strong>
        </h2>
      )}
      {shelfBooks.map((book) => {
        return (
          <Book
            key={book.id}
            book={book}
            className="col-md-4 col-sm-5 text-center position-relative"
          />
        );
      })}
    </section>
  );
};

export default Search;
