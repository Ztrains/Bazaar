import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <nav className="navbar fixed-top navbar-dark bg-primary">
          <a className="navbar-brand" href="/">Bazaar</a>
          <form className="form-inline">
            <input className="form-control" type="search" placeholder="Search" />
          </form>
          <div className="nav-item">
            <a className="nav-link" >{this.props.loggedInState ? "Sign Out" : "Sign In / Sign Up"} </a>
          </div>
      </nav>
    );
  }
}
