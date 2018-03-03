import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import {Link, Router} from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBoxValue: '',
    };
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    this.setState({
      searchBoxValue: event.target.value
    });


  }

  render() {
    let link = '';
    if (this.props.loggedInState === true) {
      link = <span><Link className="nav-link" to={"/" + this.props.currUser + "/list"}><button type="button" id='listButton' className="btn btn-secondary" >My List</button></Link>
      <Link className="nav-link" to={"/" + this.state.currUser + "/calendar"}><button type="button" id='calendarButton' className="btn btn-secondary" >My Calendar</button></Link>
      <Link className="nav-link" to={"/profile/" + this.props.currUser}> <button type="button" id="profileButton" className="btn btn-info">{this.props.loggedInState ? "Profile" : ""} </button></Link></span>
    }

    return(
      <div>
        <nav className="navbar fixed-top navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Bazaar</Link>
            <form className="form-inline">
              <input className="form-control" id='searchInput' type="search" placeholder="" value={this.state.searchBoxValue} onChange={this.handleChange}/>
              {this.state.searchBoxValue.length > 0 ? (<Link to={"/search/" + this.state.searchBoxValue}>
              		            <button type="button" id='searchButton' className="btn btn-secondary" >Search</button>
              		           </Link>) : (<div id="noButton"></div>)}
            </form>
            <div className="nav-item">
	             <div className="row">
                  {link}
                  <Link className="nav-link"  to="/signin" id="loginButton"> {this.props.loggedInState ? "Sign Out" : "Sign In / Sign Up"} </Link>
	             </div>
	          </div>
        </nav>
      </div>
    );
  }
}
