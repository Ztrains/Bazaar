import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';


export default class LoginSignup extends React.Component {
  logon = (event) => {
    this.props.logInCallBack();
  }
  render() {
    return (
            <div class="container">
		<h1>Sign In</h1>
                    <label for="loginEmail"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" className="form-control" id="loginEmail" placeholder="Enter Email" />
                  <label for="loginPass"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" className="form-control" id="loginPass" placeholder="Enter Password" />
        	<div class="clearfix">
		  <Link to="/SignIn">
		  	<button type="button" class="cancelbtn">Cancel</button>
		  </Link>
		  <Link to="/profile">
			<button type="submit" class="signinbtn" onClick={this.logon}>Submit</button>
		  </Link>
		</div>
		<div class="container2"> 
		<Link to="/signup">
			<button type="signin" class="signupbtn">Don't have an account? <font color="#000080"> Sign Up </font></button>
		</Link>
		</div>	
	</div>
    );
  }
}
