import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import history from './history.js';
import GoogleLogin from 'react-google-login';

import axios from 'axios';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      googleId: '',

    }
    //this.usernameHandle = this.usernameHandle.bind(this);
    //this.passHandle = this.passHandle.bind(this);
  }

   /*passHandle(event) {
    this.setState({
      password: event.target.value,
    });
  }*/

  googSuccess = (responce) => {
    console.log(responce);
    console.log(responce.profileObj);
    this.setState({googleId: responce.googleId});
    this.setState({accessToken: responce.accessToken});
    var tempObj = {
      accessToken: this.state.accessToken,
      googleId: this.state.googleId,
      email: responce.profileObj.email,
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
      _this.props.logInCallBack(result.data.username, _this.state.accessToken);
      history.push('/profile/' + result.data.username);
    }
    });
  }




  render() {
    return (
        <div className="container">
		       <h1>Sign In</h1>
           <h3>This website uses google to handle authentication. To Use the site, you must first have a google account. Then you can link your google account to Bazaar</h3>
        	 <div className="clearfix">
		         <Link to="/">
		  	        <button type="button" className="cancelbtn">Cancel</button>
		              </Link>
                  <GoogleLogin
                    clientId="262029223990-abrrj5s77qqus5biigr0j4c0fmkqs0ta.apps.googleusercontent.com"
                    buttonText="Sign In with Google"
                    onSuccess={this.googSuccess}
                    onFailure={this.googSuccess}
                  />

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
