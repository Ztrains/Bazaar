import React from 'react';
import "./index.css";
import axios from 'axios';
import history from './history.js';
import GoogleLogin from 'react-google-login';


export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      email: '',
      accessTok: '',
      username: '',
      google: '',
      userObj: {},
    }

    this.usernameHandle = this.usernameHandle.bind(this);
  }
  usernameHandle(event) {
    this.setState({
      username: event.target.value,
    });
  }


  googSuccess = (responce) => {

    this.setState({userObj: responce.profileObj});
    this.setState({accessTok: responce.accessToken});

    if (this.state.username < 1) {
      window.Materialize.toast("Username field must be filled", 1500);
      return;
    }

    else {
      var tempObj = {
        username: this.state.username,
        accessToken: this.state.accessTok,
        userObj: this.state.userObj,
      };
      var _this = this
      axios.post("https://bazaar-408.herokuapp.com/auth/signup/", tempObj)
      .then(function(result) {
        if (result.message === "user not found") {
          window.Materialize.toast("username is already in database. Please try again", 1500);
          return false;
        }
        else {
        _this.props.logInCallBack(_this.state.username, _this.state.accessTok, _this.state.userObj.email);
        history.push('/profile/' + _this.state.username);
      }
      }).catch((err) => {
		    window.Materialize.toast("Failed. Try again", 1500);
      });
  }
    //logon();
  }
  googFailure = (responce) => {
    window.Materialize.toast('Failure to authenticate with Google. Please try again.', 1500);
    return;
  }

  render() {

    return (
      <div className="container">
      <div className="row">
        <div className="col s2"></div>
          <div className="col s8">
            <div className="card-panel">
              <div className="center card-action">
                <h1><b>Sign Up</b></h1>
                <h4 className="condensed">Sign up with your Google account</h4>
              </div>
              <br />
              <div className="card-content">
                <div className="row">
                  <div className="col s3"></div>
                  <div className="col s6">
                    <div className="input-field">
                      <input type="text" id="username" value={this.state.username} onChange={this.usernameHandle}/>
                      <label>Username</label>
                    </div>
                  </div>
                  <div className="col s3"></div>
                </div>

                <div className="container center">
                  <GoogleLogin
                    clientId="262029223990-abrrj5s77qqus5biigr0j4c0fmkqs0ta.apps.googleusercontent.com"
                    buttonText="Sign Up with Google"
                    className="btn red darken-1"
                    id = "googleBtn"
                    onSuccess={this.googSuccess}
                    onFailure={this.googFailure}
                    />
                  <hr />
                    <a type="button" href='/signin' className="waves-effect waves-light btn red accent-2">Go Back</a>

                </div>
                </div>
              </div>
            </div>
            <div className="col s2"></div>
          </div>
      </div>
    );
  }
}
