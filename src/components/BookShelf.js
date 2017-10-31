import React, { Component }from 'react';
import Book from './Book';
import '../App.css';

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map( book => (
              <Book book={book} key={book.id} onShelfChange={this.props.onShelfChange}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
