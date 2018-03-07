import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import NavBar from './navbar.js';
import RecipeViwer from './recipeViewer.js';
import RecipeEntry from './recipeEntry.js';
import SignIn from './signin.js';
import SignUp from './signup.js';
import Account from './account.js';
import RecipePage from './recipePage.js';
import SearchPage from './search.js'
import {BrowserRouter, Switch} from 'react-router-dom';
import {Route, Redirect} from 'react-router';
import App from './app.js'

/*export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false,searchTerms: '', loggedInUser: ''};
  }
  loggingIn = (user) => {
    this.setState({loggedInUser: user});
    console.log(this.state.loggedIn);
    this.setState({loggedIn: true});
    console.log(this.state.loggedIn);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavBar loggedInState={this.state.loggedIn} currUser={this.state.loggedInUser}/>
              <Switch>
                <Route exact path={"/"} component={SignIn} />
		            <Route path={"/signin"} render={()=><SignIn logInCallBack={this.loggingIn} />}/>
                <Route path={"/signup"} render={()=><SignUp logInCallBack={this.loggingIn} />}/>
                <Route path={"/profile/:username"} component={Account} />
                <Route path={"/search/:terms"} component={SearchPage}/>
                <Route path={"/recipes"} render={(props)=><RecipeViwer/>}/>
                <Route path={"/recipeEntry"} component={RecipeEntry} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}*/



ReactDOM.render(

  <App />,
  document.getElementById('root')
);
