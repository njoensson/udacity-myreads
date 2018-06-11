import React from 'react'
import './App.css'
import Book from './Book'

class BookList extends React.Component {

  constructor(props) {
    super(props)

    //Bind callbacks to BookList
    this.updateFromFile = this.updateFromFile.bind(this);
  }

  
  updateFromFile() {
    this.props.callBack();
  }

  //Filter the bookList with a specific shelf-category
  getArrayForCategory (categoryID) {
    let returnArray = this.props.bookList.filter(book => book.shelf === categoryID);
    return returnArray;
  }

  //Render a shelf-category
  renderACategory(categoryName, categoryID) {
   if (this.props.bookList !== undefined) {
      if (this.getArrayForCategory(categoryID).length > 0 ) {
        return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{categoryName}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {this.getArrayForCategory(categoryID).map((book) => (
                <li key={book.id}>
                  <Book callBack={this.updateFromFile} aBook={book}/>
                </li>
              ))}
              </ol>
            </div>
          </div>
        )
      }
    }
  }

  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">    
          {this.renderACategory('Currently Reading', 'currentlyReading')}
          {this.renderACategory('Read', 'read')}
          {this.renderACategory('Want to Read', 'wantToRead')}
          {this.renderACategory('None', 'none')}
        </div>
      </div>
    )    
  }
}

export default BookList
