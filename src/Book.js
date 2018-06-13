import React from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends React.Component {

    state = {
        valueSelected: this.props.aBook.shelf
    }

    change = (event) => {
        let newValue = event.target.value;
        BooksAPI.update(this.props.aBook, newValue).then(() => {
            this.setState({ valueSelected: newValue });
            //Notify BookList of the changed shelf
            this.props.callBack();
        })
    }

   render () {  

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url(' + this.props.aBook.imageLinks.thumbnail + ')' }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.change} value={this.state.valueSelected}>
                                <option value="moveto" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                <div className="book-title">{this.props.aBook.title}</div>
                {this.props.aBook.authors !== undefined && this.props.aBook.authors.map((author) => (
                    <div className="book-authors" key={author}>{author}</div>
                ))}    
            </div>
        )
    }
}

export default Book