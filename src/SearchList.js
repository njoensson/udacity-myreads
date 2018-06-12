import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import './App.css'

class SearchList extends React.Component {

    state = {
        bookListFromSearch: [],
        bookListMyReads: []
    }

    constructor(props) {
        super(props)
    
        //Bind callbacks to SearchList
        this.updateFromSearch = this.updateFromSearch.bind(this);
    }

    componentDidMount() {
        BooksAPI.getAll().then((bookList) => {
            this.setState({bookListMyReads: bookList})
        })
    }

    change = (event) => {
        let searchString = event.target.value;
        let emptySearchResult = [];
        
        BooksAPI.search(searchString).then((result) => {
            if (result !== undefined && result.length > 0) {
                let returnResult = this.fixMissingElementsinJSON(result);
                returnResult = this.checkIfSearchResultExistInMyReads(result);
                this.setState({bookListFromSearch: returnResult});
            }
            else {
                this.setState({bookListFromSearch: emptySearchResult});
            }
        })
    }

    //Iterate over the JSON file and fix missing authors, thumbnails and set category to none
    fixMissingElementsinJSON (result) {
        result.map((resultElement) => {
            if("authors" in resultElement) {}
            else {
                resultElement.authors = ['']; 
            }
            if("imageLinks" in resultElement) {}
            else {
                resultElement.imageLinks = {smallThumbNail: '', thumbnail: ''};
            }
            if("shelf" in result) {}
            else {
                resultElement.shelf = 'none';
            }
        })
        return result;
    }

    //Iterate over the search results and check if any books exists in MyReads, then update category
    checkIfSearchResultExistInMyReads(searchResult) {
        this.state.bookListMyReads.map((myBook) => {
                searchResult.map((searchBook) => {
                    if (myBook.id === searchBook.id) {
                        searchBook.shelf = myBook.shelf;
                    }
                })
        })
        return searchResult;
    }

    updateFromSearch(){
        //callback function expected, do nothing in this context
    }

    render () {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" href='/'>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder='Search by title or author' onChange={this.change}/>
                    </div>
                </div>
                <BookList bookList={this.state.bookListFromSearch} callBack={this.updateFromSearch} />
            </div>
        )            
    }
}

export default SearchList