import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route } from 'react-router-dom'
import LoginSignUp from './components/LoginSignUp';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
          <Route exact path='/loginsignup' component={LoginSignUp}/>
        </main>
        
      </div>
    );
  }
}

export default App;
