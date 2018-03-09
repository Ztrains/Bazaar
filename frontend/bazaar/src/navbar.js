import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import history from './history.js';
import {Link, Router} from 'react-router-dom';
import {Navbar, NavItem, Row, Input, Icon} from 'react-materialize'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBoxValue: '',
    };
    this.handleChange = this.handleChange.bind(this);

  }
  componentDidMount() {
    console.log(this.props.currUser);
  }
  handleChange = (event) => {
    this.setState({
      searchBoxValue: event.target.value
    });
  }
  logUserOut = () => {
    this.props.logOutCallback();

  }
  search = () => {
    history.push('/search/' + this.state.searchBoxValue);
  }
  handleKey = (e) => {
    if (e.key == 'Enter') {
      history.push('/search/' + this.state.searchBoxValue);
    }
  }
  render() {
    let link = '';
    if (this.props.loggedInState === false) {
      link = <li><a href='/signin' id="loginButton"> Sign In </a></li>
    }
    if (this.props.loggedInState === true) {
      link = <div>
      <li><a href={"/" + this.props.currUser + "/list"}>Shopping List</a></li>
      <li><a href={"/calendar"}>Calendar</a></li>
      <li><a href={"/profile/" + this.props.currUser}>Profile</a></li>
      <li><a href="/create">Create a Recipe</a></li>
      <li><a onClick={this.logUserOut} id="logoutButton">Sign Out</a></li></div>
    }

    return (
      <div>
        <nav>
          <div className="nav-wrapper red accent-2">
          <ul id="nav-mobile" className="left">
            {link}
          </ul>
            <a href="/" className="brand-logo center">Bazaar</a>

            <form className="right">
                <div className="input-field">
                  <input id="search" type="search" placeholder="Search" value={this.state.searchBoxValue} onChange={this.handleChange} onKeyPress={this.handleKey} required />
                  <label className="label-icon" forName="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>

          </div>
        </nav>
      </div>
    );
  }
}
