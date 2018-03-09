import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import history from './history.js';
import GoogleLogin from 'react-google-login';
import {Card} from 'react-materialize'


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
    console.log(responce);

    this.setState({userObj: responce.profileObj});
    this.setState({accessTok: responce.accessToken});

    if (this.state.username < 1) {
      alert("Username field must be filled");
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
        console.log(result);
        if (result.message == "user not found") {
          alert("username is already in database. Please try again");
          return false;
        }
        else {
        _this.props.logInCallBack(_this.state.username, _this.state.accessTok, _this.state.userObj.email);
        history.push('/profile/' + _this.state.username);
      }
      });
  }
    //logon();
  }
  googFailure = (responce) => {
    alert('Failure to authenticate with Google. Please try again.');
    return;
  }

  render() {

    return (
      <div className="container">
          <div className="card-content">
  		    <h1 id="fancytext">Sign Up</h1>
          <br></br>
          <label id="usernameH"><b>Username</b></label>
          <input type="username" placeholder="Enter Username" className="form-control" id="username" placeholder="Enter Username" value={this.state.username} onChange={this.usernameHandle}/>
          <p id="warning">By creating an account you agree to our Terms and Privacy.</p>
            <div className="container2" id="signup">
              <GoogleLogin
                clientId="262029223990-abrrj5s77qqus5biigr0j4c0fmkqs0ta.apps.googleusercontent.com"
                buttonText="Sign Up with Google"
                id="googleBtn"
                onSuccess={this.googSuccess}
                onFailure={this.googFailure}
                />
            </div>

            <Link to="/signin">
  		  	     <button type="button" className="cancelbtn">Cancel</button>
  		      </Link>
            <br></br><br></br><br></br>
        </div>
      </div>
    );
  }
}
