import React, { Component } from 'react';
import './App.css';
import Widget from './components/Widget/Widget';
import Widgets from './components/Widgets/Widgets'

class App extends Component {
  render() {
    return (
      <div className="App">
       <Widget uniqueID = "1" contentType="table"/> 
       <Widget uniqueID = "2" contentType="table"/> 
       <Widget uniqueID = "3" contentType="table"/> 
       <Widget uniqueID = "4" contentType="svg"/> 
       <Widget uniqueID = "5" contentType="text"/>  
       <Widgets/> 
      </div>
    );
  }
}

export default App;
