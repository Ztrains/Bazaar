import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import history from './history.js';

import axios from 'axios';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.usernameHandle = this.usernameHandle.bind(this);
    this.passHandle = this.passHandle.bind(this);
  }
  usernameHandle(event) {
    this.setState({
      username: event.target.value,
    });
  }
   passHandle(event) {
    this.setState({
      password: event.target.value,
    });
  }
  logon = (event) => {

    console.log(this.state.username);
    if (this.state.username.length < 1 || this.state.password.length < 1) {
      alert("Input fields were not filled out");
      return false;
    }
    var tempObj = {
      username: this.state.username,

    };
    var _this = this;
    axios.post("https://bazaar-408.herokuapp.com/auth/signin/", tempObj)
    .then(function(result) {
      console.log(result);
      if (result.data.message == "user not found") {
        alert("username or password is incorrect");
        return false;
      }
      else {
      _this.props.logInCallBack(_this.state.username);
      history.push('/profile/' + _this.state.username);
    }
    });

  }
  render() {
    return (
        <div className="container">
		       <h1>Sign In</h1>
           <label id="loginUsername"><b>Email</b></label>
           <input type="username" placeholder="Enter UserName" className="form-control" id="loginUsername" value={this.state.username} onChange={this.usernameHandle}/>
           <label id="loginPass"><b>Password</b></label>
           <input type="password" placeholder="Enter Password" className="form-control" id="loginPass" value={this.state.password} onChange={this.passHandle}/>
        	 <div className="clearfix">
		         <Link to="/SignIn">
		  	        <button type="button" className="cancelbtn">Cancel</button>
		              </Link>

			           <button type="submit" id="okButton" className="signinbtn" onClick={this.logon}>Submit</button>

		       </div>
		       <div className="container2">
		          <Link to="/signup">
			           <button type="signin" className="signupbtn">Dont have an account?<font color="#000080"> Sign Up </font></button>
		          </Link>
	         </div>
	      </div>
      );
  }
}
