import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
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
    var tempObj = {
      username: this.state.username,
    };
    axios.post("http://localhost:8000/auth/signin", tempObj)
    .then(function(result) {
      console.log(result);
    });
    this.props.logInCallBack(this.state.username);
  }
  render() {
    return (
<<<<<<< HEAD
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
			       <button type="signin" class="signupbtn">Do not have an account? <font color="#000080"> Sign Up </font></button>
		      </Link>
		   </div>
	  </div>
=======
        <div class="container">
		         <h1>Sign In</h1>
                    <label for="loginUsername"><b>Email</b></label>
                    <input type="username" placeholder="Enter UserName" className="form-control" id="loginUsername" value={this.state.username} onChange={this.usernameHandle}/>
                  <label for="loginPass"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" className="form-control" id="loginPass" value={this.state.password} onChange={this.passHandle}/>
        	<div class="clearfix">
		  <Link to="/SignIn">
		  	<button type="button" class="cancelbtn">Cancel</button>
		  </Link>
		  <Link to={"/profile/" + this.state.username}>
			<button type="submit" class="signinbtn" onClick={this.logon}>Submit</button>
		  </Link>
		</div>
		<div class="container2">
		<Link to="/signup">
			<button type="signin" class="signupbtn">Don't have an account?<font color="#000080"> Sign Up </font></button>
		</Link>
		</div>
	</div>
>>>>>>> c14af860615c173c71ee9f6d36bc59396eda43b3
    );
  }
}
