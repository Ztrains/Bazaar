import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navbar.js';
import RecipeViwer from './recipeViewer.js';
import RecipeEntry from './recipeEntry.js';
import SignIn from './signin.js';
import SignUp from './signup.js';
import Account from './account.js';
import RecipePage from './recipePage.js';
import SearchPage from './search.js';
import ViewRecipe from './viewRecipe.js';
import ShoppingList from './shoppingList.js'
import Home from './home.js';
import CreateRecipe from './createRecipe.js';
import Calendar from './calendar.js';
import history from './history.js';
import {Router, Switch} from 'react-router-dom';
import {Route, Redirect} from 'react-router';

export default class App extends React.Component {
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
        <Router history={history}>
          <div>
            <NavBar loggedInState={this.state.loggedIn} currUser={this.state.loggedInUser}/>
              <Switch>
                <Route exact path={"/"} component={Home} />
		            <Route path={"/signin"} render={()=><SignIn logInCallBack={this.loggingIn} />}/>
                <Route path={"/signup"} render={()=><SignUp logInCallBack={this.loggingIn} />}/>
                <Route path={"/profile/:username"} component={Account} />
                <Route path={"/search/:terms"} component={SearchPage}/>
                <Route path={"/recipes"} render={(props)=><RecipeViwer/>}/>
                <Route path={"/recipeEntry"} component={RecipeEntry} />
                <Route path={'/create'} component={CreateRecipe} />
                <Route path={'/recipe/:id'} component={ViewRecipe} />
                <Route path={'/:username/list'} component={ShoppingList} />
                <Route path={'/calendar'} component={Calendar}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
