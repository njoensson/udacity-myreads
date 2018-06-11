import React from 'react'
import BookList from './BookList'
import SearchList from './SearchList'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {

  state = {
    bookList: []
  }

  constructor(props) {
    super(props)

    //Bind callbacks to BooksApp
    this.updateFromFile = this.updateFromFile.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((bookList) => {
      this.setState({bookList})
    })
  }


  //Populate list from DB
  updateFromFile() {
    BooksAPI.getAll().then((bookList) => {
      this.setState({bookList})
    })
  }

  render () {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList bookList={this.state.bookList} callBack={this.updateFromFile}/>
        )} />
        <Route exact path='/' render={() => (
          <div className="open-search">
            <a href='/search'>Add a book</a>
          </div>
        )} />
        <Route path='/search' render={() => (
           <SearchList/>
        )} />  
      </div>
    )    
  }
}

export default BooksApp
