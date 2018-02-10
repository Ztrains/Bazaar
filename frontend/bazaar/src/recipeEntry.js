import React from 'react';
import './index.css'

export default class recipeEntry extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="container flex">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="card">
              <h5 className="card-title">{this.props.name} <button className="btn btn-danger float-md-right" id="rdelbut">Delete</button></h5>
              <p className="card-text">sjkdhfksjdhflskhfsdhlfkjhfl</p>
              <a href="#" className="card-link"> Add to favorites</a>
              <a href="#" className="card-link"> Add to List</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
