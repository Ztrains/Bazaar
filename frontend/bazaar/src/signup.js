import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';


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
    axios.get("https://bazaar-408.herokuapp.com/auth/google/")
    .then(function(results) {
      console.log(results);
    });
  }
  logon = (event) => {
    if (this.state.firstPass != this.state.secondPass) {
      alert("Passwords do not match");
      return false
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
      }
      axios.post("http://localhost:8000/auth/signup", tempObj)
      .then(function(result) {
        console.log(result);
      });
    this.props.logInCallBack(this.state.username);
  }
}
  render() {
    return (
            <div class="container">
		<h1>Sign Up</h1>
                    <label for="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" className="form-control" id="username" placeholder="Enter Username" value={this.state.username} onChange={this.usernameHandle}/>
                    <label for="loginEmail"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" className="form-control" id="loginEmail" placeholder="Enter Email" value={this.state.email} onChange={this.eMailHandle}/>
                  <label for="loginPass"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" className="form-control" id="loginPass" placeholder="Enter Password" value={this.state.firstPass} onChange={this.firstPassHandle}/>
        	  <label for="loginPass"><b>Enter Password Again</b></label>
                  <input type="password" placeholder="Repeat Password" className="form-control" id="loginPass" placeholder="Enter Password" value={this.state.secondPass} onChange={this.secondPassHandle}/>

		<p>By creating an account you agree to our Terms and Privacy.</p>
		<div class="clearfix">
		  <Link to="/signin">
		  	<button type="button" class="cancelbtn">Cancel</button>
		  </Link>

       <button type="button" className="cancelbtn" onClick={this.googin}>Google Signin</button>

		  <Link to={"/profile/" + this.state.username}>
			<button type="submit" class="signinbtn" onClick={this.logon}>Sign Up</button>
		  </Link>
		</div>
	</div>
    );
  }
}
