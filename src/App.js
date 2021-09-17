import React, { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import SearchPage from "./pages/SearchPage";
const App = () => {
  const fetch = async () => {
    let data = await BooksAPI.getAll();
    setbooks(data);
  };
  const [books, setbooks] = useState([]);
  useEffect(() => {
    fetch();
  }, []);
  const handleShelfChange = (nBook, shelf) => {
    let newBooks;
    if (books.includes(nBook)) {
      newBooks = books.map((book) => {
        if (book.id === nBook.id) book.shelf = shelf;
        return book;
      });
    } else {
      nBook.shelf = shelf;
      newBooks = [...books, nBook];
    }
    BooksAPI.update(nBook, shelf);
    setbooks(newBooks);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <HomePage books={books} handleShelfChange={handleShelfChange} />
            )}
          />
          <Route
            path="/search"
            component={() => (
              <SearchPage handleShelfChange={handleShelfChange} books={books} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
