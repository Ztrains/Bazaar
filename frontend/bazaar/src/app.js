import React from 'react';
import './index.css';
import NavBar from './navbar.js';
import axios from 'axios';
import RecipeEntry from './recipeEntry.js';
import SignIn from './signin.js';
import SignUp from './signup.js';
import Account from './account.js';
import SearchPage from './search.js';
import ViewRecipe from './viewRecipe.js';
import ShoppingList from './shoppingList.js'
import Home from './home.js';
import CreateRecipe from './createRecipe.js';
import Calendar from './calendar.js';
import history from './history.js';
import {Router, Switch} from 'react-router-dom';
import {Route} from 'react-router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      searchTerms: '',
      loggedInUser: '',
    };
  }
  componentDidMount() {
    var temp = window.sessionStorage.getItem('loggedInName');
    if (temp) {
      this.setState({
        loggedIn: true,
      });
      this.setState({loggedInUser: temp});
    }
  }
  loggingOut = () => {
    if (this.state.loggedInUser === '') {
      return;
    }
    /*this.setState({loggedIn: false});
    this.setState({loggedInUser: ''});*/
    var Obj = {
      username: window.sessionStorage.getItem('loggedInName'),
    };
    axios.post("https://bazaar-408.herokuapp.com/logout", Obj)
    .then(function(result) {
      console.log(result);
      window.Materialize.toast("Logout successfull", 1500);
    })
    .catch(function(error) {
      window.Materialize.toast("Logout unsuccessful", 1500);
    });
    //window.sessionStorage.removeItem('loggedInName');
    //window.sessionStorage.removeItem('token');
    history.push('/');
  }
  loggingIn = (user, token, email) => {
    this.setState({loggedInUser: user});
    this.setState({loggedIn: true});
    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('email', email);
    window.sessionStorage.setItem('loggedInName', this.state.loggedInUser);
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <NavBar loggedInState={this.state.loggedIn} currUser={this.state.loggedInUser} logOutCallback={this.loggingOut}/>
            <br/>
            <br/>
            <br/>
              <Switch>
                <Route exact path={"/"} component={Home} />
		            <Route path={"/signin"} render={()=><SignIn className="grey lighten-4" style={{height: '100vh'}} logInCallBack={this.loggingIn} />}/>
                <Route path={"/signup"} render={()=><SignUp className="grey lighten-4" style={{height: '100vh'}} logInCallBack={this.loggingIn} />}/>
                <Route path={"/profile/:username"} component={Account} />
                <Route path={"/search/:terms"} component={SearchPage}/>
                <Route path={"/recipeEntry"} component={RecipeEntry} />
                <Route path={'/create'} component={CreateRecipe} />
                <Route path={'/recipes/:id'} component={ViewRecipe} />
                <Route path={'/:username/list'} component={ShoppingList} />
                <Route path={'/calendar'} component={Calendar}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
