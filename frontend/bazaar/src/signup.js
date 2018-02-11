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
      <div className="row">

            <div className="span6">
              <form className="form-signin">
                <div className="form-group">
                  <label for="loginEmail">Email Address</label>
                  <input type="email" className="form-control" id="loginEmail" placeholder="Enter Email" />
                  <label for="loginPass">Password</label>
                  <input type="password" className="form-control" id="loginPass" placeholder="Enter Password" />
                  <Link to="/user" className="btn btn-primary" onClick={this.logon}>Submit</Link>
                </div>
              </form>
            </div>
            <div> className="span6">
              <form className="form-signin">
                <div className="form-group">
                  <label for="signupEmail">Email Address</label>
                  <input type="email" className="form-control" id="signupEmail" placeholder="Enter Email" />
                  <label for="signupPass">Password</label>
                  <input type="password" className="form-control" id="signupPass" placeholder="Enter Password" />
                  <label for="signupPassConfPass">Password</label>
                  <input type="password" className="form-control" id="signupPassConf" placeholder="Confirm Password" />
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>

      </div>
    );
  }
}
