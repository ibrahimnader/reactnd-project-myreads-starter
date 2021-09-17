import React from "react";
import { useHistory } from "react-router";
import BookShelf from "../components/BookShelf";

const HomePage = ({ books, handleShelfChange }) => {
  const history = useHistory();
  const reading = books.filter((book) => book.shelf === "currentlyReading");
  const want = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");
  return (
    <div>
      <BookShelf
        title="Currently Reading"
        books={reading}
        handleShelfChange={handleShelfChange}
      />
      <BookShelf
        title="Want To Read"
        books={want}
        handleShelfChange={handleShelfChange}
      />
      <BookShelf
        title="Read"
        books={read}
        handleShelfChange={handleShelfChange}
      />
      <div className="open-search">
        <button onClick={() => history.push("/search")}>Add a book</button>
      </div>
    </div>
  );
};

export default HomePage;
