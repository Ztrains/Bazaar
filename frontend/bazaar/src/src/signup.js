import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom'


export default class LoginSignup extends React.Component {
  logon = () => {
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
                  <a className="btn btn-primary" onClick={this.logon}>Submit</a>
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
