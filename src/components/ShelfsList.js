import React, { Component }from 'react';
import BookShelf from './BookShelf';
import * as BooksAPI from '../BooksAPI';
import { Link } from "react-router-dom";
import '../App.css';
import ProgressBar from 'react-progress-bar-plus';
require('react-progress-bar-plus/lib/progress-bar.css');

class ShelfsList extends Component {

  state = {
    isLoading : false,
    percent : 0
  };

  handleChangeShelf = (bookId, e) => {
    this.setState({isLoading : true, percent : 0});
    let tempBooks = this.props.allBooks;
    const book = tempBooks.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: tempBooks
      });

      this.setState({isLoading : true, percent : 100});
    });
  };

  render() {
    return (
      <div className="list-books">

        {this.state.isLoading && ( <ProgressBar percent={this.state.percent} spinner={false} autoIncrement={true}/> )}

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              books={this.props.allBooks.filter( book => book.shelf === 'currentlyReading')}
              shelfTitle="Currently Reading"
              onShelfChange={this.handleChangeShelf}/>
            <BookShelf
              books={this.props.allBooks.filter( book => book.shelf === 'wantToRead')}
              shelfTitle="Want To Read"
              onShelfChange={this.handleChangeShelf}/>
            <BookShelf
              books={this.props.allBooks.filter( book => book.shelf === 'read')}
              shelfTitle="Read"
              onShelfChange={this.handleChangeShelf}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ShelfsList;
