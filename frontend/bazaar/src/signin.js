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
      email: '',

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
    this.setState({email: responce.profileObj.email});
    var tempObj = {
      accessToken: this.state.accessToken,
      googleId: this.state.googleId,
      email: responce.profileObj.email,
    };
    var _this = this;
    axios.post("https://bazaar-408.herokuapp.com/auth/signin/", tempObj)
    .then(function(result) {
      console.log(result);
      if (result.data.message === "User not found") {
        window.Materialize.toast("username or password is incorrect", 1500);
        return false;
      }
      else {
      _this.props.logInCallBack(result.data.username, _this.state.accessToken, _this.state.email);
      history.push('/profile/' + result.data.username);
    }
    }).catch((err) => {
		  window.Materialize.toast("Failed. Try again", 1500);      
    });
  }
  googleFailure = (responce) => {
    window.Materialize.toast('Sign in failed or canceled. Please try again', 1500);
    return;
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col s2"></div>
            <div className="col s8 z-depth-6">
              <div className="card-panel">
                <div className="center card-action">
                  <h1><b>Sign In</b></h1>
                  <h4 className="condensed">Sign in with your Google account</h4>
                </div>
                <hr />
                <div className="container center card-content" id="signin">
                        <GoogleLogin
                          clientId="262029223990-abrrj5s77qqus5biigr0j4c0fmkqs0ta.apps.googleusercontent.com"
                          buttonText="Sign In with Google"
                          className="btn red darken-1"
                          id = "googleBtn"
                          onSuccess={this.googSuccess}
                          onFailure={this.googFailure}
                        />
                        <hr />
                      <Link to="/signup">
                        <a id="signUpBtn" type="signin" className="waves-effect waves-light btn red accent-2">Don't have an account? <b>Sign Up</b></a>
                      </Link>
                </div>
              </div>
            </div>
            <div className="col s2"></div>
          </div>
	      </div>
      );
  }
}
