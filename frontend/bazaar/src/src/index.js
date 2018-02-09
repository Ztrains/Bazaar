import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navbar.js';
import RecipeViwer from './recipes.js';
import RecipeEntry from './recipeEntry.js';
import SignUp from './signup.js';
import Account from './account.js';
import RecipePage from './recipePage.js';
import {BrowserRouter, Switch} from 'react-router-dom';
import {Route} from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false,};
  }
  loggingIn = () => {
    console.log(this.state.loggedIn);
    this.setState({loggedIn: true});
    console.log(this.state.loggedIn);
  }
  render() {
    return (
      <div>
        <NavBar loggedInState={this.state.loggedIn}/>
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={SignUp} />
            <Route path={"/signin"} render={()=><SignUp logInCallBack={this.loggingIn} />}/>
            <Route path={"/user"} component={Account} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(

  <App />,
  document.getElementById('root')
);
