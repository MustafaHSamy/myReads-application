import Book from "./Book";

const Shelf = ({ sectionName, shelfBooks, contains, id }) => {
  return (
    <section id={id} className="container-fluid p-3 row gy-5">
      <h1 className="col-12 shelf-head">{sectionName}</h1>

      {shelfBooks.length === 0 && (
        <h2 className="mb-5 text-center">No books here yet!</h2>
      )}
      {shelfBooks
        .filter((book) => book.shelf === contains)
        .map((book) => {
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

export default Shelf;
