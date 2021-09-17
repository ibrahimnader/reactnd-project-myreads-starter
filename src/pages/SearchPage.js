import React, { useState } from "react";
import Book from "../components/Book";
import * as BooksAPI from "../BooksAPI";
import { useHistory } from "react-router";

const SearchPage = ({ handleShelfChange, books }) => {
  const [searchBooks, setsearchBooks] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const history = useHistory();

  const handleSearch = async (e) => {
    if (searchTerm !== "") {
      let data = await BooksAPI.search(searchTerm);
      if (data.error) {
        setsearchBooks([]);
      } else {
        data = data.map((book) => {
          let idx = books.findIndex((b) => b.id === book.id);
          if (idx > -1) {
            book.shelf = books[idx].shelf;
          }
          return book;
        });
      }
      setsearchBooks(data);
    } else {
      setsearchBooks([]);
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => history.push("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => {
              setsearchTerm(e.target.value);
            }}
            onKeyUp={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchBooks.length > 0 &&
            searchBooks.map((book) => (
              <Book
                book={book}
                handleShelfChange={handleShelfChange}
                key={book.id}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
