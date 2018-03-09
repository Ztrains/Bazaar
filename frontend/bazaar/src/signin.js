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
        alert("username or password is incorrect");
        return false;
      }
      else {
      _this.props.logInCallBack(result.data.username, _this.state.accessToken, _this.state.email);
      history.push('/profile/' + result.data.username);
    }
    });
  }
  googleFailure = (responce) => {
    alert('Sign in failed or canceled. Please try again');
    return;
  }



  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col s2"></div>
            <div className="col s8 z-depth-6">
              <div className="center">
                <h1 id="fancytext">Sign In</h1>
                <h3 id="signintext">Sign in with your Google account</h3>
              </div>
              <div className="container" id="signin">
                      <GoogleLogin
                        clientId="262029223990-abrrj5s77qqus5biigr0j4c0fmkqs0ta.apps.googleusercontent.com"
                        buttonText="Sign In with Google"
                        onSuccess={this.googSuccess}
                        onFailure={this.googFailure}
                      />
                    <Link to="/signup">
                      <button type="signin" className="waves-effect waves-light btn">Dont have an account?<font color="#000080"> <b>Sign Up</b> </font></button>
                    </Link>
              </div>
                  {/* <br></br><br></br><br></br><br></br> */}
            </div>
            <div className="col s2"></div>
          </div>
	      </div>
      );
  }
}
