import React from 'react';
import './index.css';
//import ReactDOM from 'react-dom';
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
    return(
      <div>
        <nav className="navbar fixed-top navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Bazaar</Link>
            <form className="form-inline">
              <input className="form-control" type="search" placeholder="" value={this.state.searchBoxValue} onChange={this.handleChange}/>
              <Link to={"/search/" + this.state.searchBoxValue}>
		<button type="button" class="btn btn-secondary">
			<span class="glyphicon glyphicon-search"></span> Search
		</button>
		</Link>
            </form>
            <div className="nav-item">
	    <div class="row">
              <Link className="nav-link" to="/signin"> <button type="button" class="btn btn-default"> {this.props.loggedInState ? "Sign Out" : "Sign In / Sign Up"} </button> </Link>
              <Link className="nav-link" to="/profile"> <button type="button" class="btn btn-info">{this.props.loggedInState ? "Profile" : " "} </button></Link>
	    </div>
	    </div>
        </nav>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}
