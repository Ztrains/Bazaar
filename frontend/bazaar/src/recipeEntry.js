import React from 'react';
//import './index.css';
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
            <div className="card">


              <div className="card-stacked">
                <div className="card-content">
                  <h3 className="card-title"><Link to={'/recipe/' + this.props.id}><b>{this.props.name}</b></Link></h3>
                  <p>{this.props.description}</p>
                </div>
                <div className="card-action">
                  <button className="btn btn-success float-md-right" onClick={this.addFavorite}> Add to favorites</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
