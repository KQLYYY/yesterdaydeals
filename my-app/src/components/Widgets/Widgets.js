import React, { Component } from 'react'
import Widget from '../Widget/Widget';
import '../../materialize.css';

export class Widgets extends Component {
  render() {
    return (
      <div >
        <div className="row">
          <div className="col s6 ">
            <Widget uniqueID = "2" contentType="svg"/> 
          </div>
          <div className="col s6 m6">
            <Widget uniqueID = "234f" contentType="svg"/> 
          </div>
          <div className="col s6 offset-s6">
            <Widget uniqueID = "343" contentType="table"/> 
          </div>
          <div className="col s6">
            <Widget uniqueID = "3" contentType="text"/> 
          </div>

        </div>
      </div>
    )
  }
}

export default Widgets
