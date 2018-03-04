import React from 'react';
import './index.css'

export default class recipeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.addFavorite = this.addFavorite.bind(this);
  }
  addFavorite() {

    //add to database
  }
  render() {
    return(
      <div className="container flex">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="container4">
              <h5 className="card-title"><b>{this.props.name}</b>
              <br></br><br></br>
              <p className="card-text">This is a description of the recipe.</p>
              <br></br>
              <button className="btn btn-success float-md-right" onClick={this.addFavorite}> Add to favorites</button>
              <br></br><br></br>
              <button className="btn btn-danger float-md-right" id="rdelbut">Delete</button></h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
