import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import history from './history.js';


export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      email: '',
      firstPass: '',
      secondPass: '',
      username: ''
    }
    this.eMailHandle = this.eMailHandle.bind(this);
    this.firstPassHandle = this.firstPassHandle.bind(this);
    this.secondPassHandle = this.secondPassHandle.bind(this);
    this.usernameHandle = this.usernameHandle.bind(this);
  }
  usernameHandle(event) {
    this.setState({
      username: event.target.value,
    });
  }
  eMailHandle(event) {
    this.setState({
      email: event.target.value,
    });
  }
  firstPassHandle(event) {
    this.setState({
      firstPass: event.target.value,
    });
  }
    secondPassHandle(event) {
      this.setState({
        secondPass: event.target.value,
      });
  }
  googin() {
    axios.get("https://bazaar-408.herokuapp.com/auth/google/", { method: 'GET',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': 'https://bazaar-408.herokuapp.com',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin'})
    .then(function(results) {
      console.log(results);
    });
  }
  logon = (event) => {
    if (this.state.firstPass != this.state.secondPass) {
      alert("Passwords do not match");
      return false
    }
    else if (this.state.username < 1) {
      alert("Username field must be filled");
    }
    else if (this.state.email < 1) {
      alert("An email address must be entered");
    }
    else if (this.state.firstPass < 1 || this.state.secondPass < 1) {
      alert("Both password fields must be filled in and match");
    }
    else {
      console.log(this.state.username);
      console.log(this.state.email);
      console.log(this.state.firstPass);
      console.log(this.state.secondPass);
      var tempObj = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.firstPass
      };
      var _this = this
      axios.post("http://localhost:8000/auth/signup", tempObj)
      .then(function(result) {
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
}
  render() {
    return (
            <div className="container">
		<h1 id="title">Sign Up</h1>
                    <label id="username"><b>Username</b></label>
                    <input type="username" placeholder="Enter Username" className="form-control" id="username" placeholder="Enter Username" value={this.state.username} onChange={this.usernameHandle}/>
                    <label id="loginEmail"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" className="form-control" id="loginEmail" placeholder="Enter Email" value={this.state.email} onChange={this.eMailHandle}/>
                  <label id="loginPass"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" className="form-control" id="loginPass" placeholder="Enter Password" value={this.state.firstPass} onChange={this.firstPassHandle}/>
        	  <label id="loginPass"><b>Enter Password Again</b></label>
                  <input type="password" placeholder="Repeat Password" className="form-control" id="loginPass" placeholder="Enter Password" value={this.state.secondPass} onChange={this.secondPassHandle}/>

		<p id="warning">By creating an account you agree to our Terms and Privacy.</p>
		<div className="clearfix">
		  <Link to="/signin">
		  	<button type="button" className="cancelbtn">Cancel</button>
		  </Link>


			<button type="submit" className="signinbtn" onClick={this.logon}>Sign Up</button>

		</div>
    <div className="signUpClass">
      <button type="button" className="googlebtn" onClick={this.googin}>Google Sign Up</button>
    </div>
  </div>
    );
  }
}
