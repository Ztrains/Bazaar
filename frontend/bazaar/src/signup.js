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
		<h1>Sign Up</h1>
                    <label for="loginEmail"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" className="form-control" id="loginEmail" placeholder="Enter Email" />
                  <label for="loginPass"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" className="form-control" id="loginPass" placeholder="Enter Password" />
        	  <label for="loginPass"><b>Enter Password Again</b></label>
                  <input type="password" placeholder="Repeat Password" className="form-control" id="loginPass" placeholder="Enter Password" />
        	
		<p>By creating an account you agree to our Terms and Privacy.</p>	
		<div class="clearfix">
		  <Link to="/signin">
		  	<button type="button" class="cancelbtn">Cancel</button>
		  </Link>
		  <Link to="/profile">
			<button type="submit" class="signinbtn" onClick={this.logon}>Sign Up</button>
		  </Link>
		</div>
	</div>
    );
  }
}
