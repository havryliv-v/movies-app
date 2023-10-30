import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './components/Home/Home'
import MovieDetails from './components/MovieDetails/MovieDetails'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Footer from './components/Footer/Footer'



import './App.scss';

function App() {
  return (
    <div className="App">
      <Router >
        <Header>
        </Header>
        <div className="container">
          <Routes >
            <Route path='/' exact Component={Home} />
            <Route path='/movie/:imdbID' Component={MovieDetails} />
            <Route path="*" Component={PageNotFound} />
          </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
