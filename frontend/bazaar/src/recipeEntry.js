import React from 'react';
import './index.css';
import axios from 'axios';
import {Link, Router} from 'react-router-dom'

export default class recipeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: window.sessionStorage.getItem('loggedInName'),
    };
    this.addFavorite = this.addFavorite.bind(this);
  }
  addFavorite() {
    var newObj = {
      id: this.props.id,
      userEmail: this.state.currUser,
    }

    //add to database
  }
  render() {
    return(
      <div className="container flex">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="container4">
              <h5 className="card-title"><Link to={'/recipe/' + this.props.id}><b>{this.props.name}</b></Link>
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
