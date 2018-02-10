import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <nav className="navbar fixed-top navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">Bazaar</Link>
          <form className="form-inline">
            <input className="form-control" type="search" placeholder="Search" />
          </form>
          <div className="nav-item">
            <Link className="nav-link" to="/signin">{this.props.loggedInState ? "Sign Out" : "Sign In / Sign Up"} </Link>
          </div>
      </nav>
    );
  }
}
