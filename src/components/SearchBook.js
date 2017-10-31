import React, { Component }from 'react';
import { Link } from "react-router-dom";
import * as BooksAPI from '../BooksAPI';
import ProgressBar from 'react-progress-bar-plus';
import sortBy from 'sort-by';
import '../App.css';
require('react-progress-bar-plus/lib/progress-bar.css');

class SearchBooks extends Component {

  state = {
    query: "",
    books : [],
    isLoading : false,
    percent : 0
  };

  updateQuery = (query) => {
    this.setState({ query: query })
    if(query){
      this.setState({isLoading : true, percent : 0});
      this.searchBooks(query)
    }else{
      this.setState({ books: [] })
    }
  }

  cleanQuery = () => {
    this.setState({ query: '' })
  }

  updateBooks = (books) => {
    const validatedBooks = books.map(book => {
      book.shelf = "none";
      this.props.allBooks.forEach(bookExistent => {
        if (book.id === bookExistent.id) {
          book.shelf = bookExistent.shelf;
        }
      });
      return book;
    });
    this.setState({
      books: validatedBooks
    });
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 20).then(
      response => {
       if (response.error) {
         this.setState({
           books: []
         });
         this.setState({isLoading : true, percent : 100})
       } else {
         this.updateBooks(response);
         this.setState({isLoading : true, percent : 100})
       }
     },
     error => {
       console.log("error ocurred");
       this.setState({isLoading : true, percent : 100})
     }
   );
  }

  updateBookOnSearch = (book, shelf) => {
    let tempBooks = this.state.books;
    const bookToUpdate = tempBooks.filter(t => t.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      books: tempBooks
    });
    this.props.onShelfChange(book, shelf);
  }

  render() {

    const { books, isLoading, percent } = this.state

    books.sort(sortBy('title'))

    return (
      <div className="search-books">

        {isLoading && ( <ProgressBar percent={percent} spinner={false} autoIncrement={true}/> )}

        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book =>
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}/>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={e => this.updateBookOnSearch(book, e.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors &&
                  <div className="book-authors">
                    {book.authors[0]}
                  </div>}
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
