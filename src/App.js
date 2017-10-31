import React, { Component }from 'react';
import * as BooksAPI from './BooksAPI';
import ShelfsList from './components/ShelfsList';
import SearchBook from './components/SearchBook';
import { Route } from "react-router-dom";
import './App.css';

class BooksApp extends Component {

  state = {
    books: []
  };

  handleChangeShelf = (book: any, shelf: string) => {
    console.log("aaaa", shelf)
    BooksAPI.update(book, shelf).then(response => {
      this.getAllBooks();
    });
  };

  getAllBooks() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/"
          render={() =>
            <ShelfsList allBooks={this.state.books} />
          }/>
        <Route path="/search"
          render={() =>
            <SearchBook onShelfChange={this.handleChangeShelf} allBooks={this.state.books} />
          }/>
      </div>
    )
  }
}

export default BooksApp
