import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'
import history from './history.js'
import RecipeEntry from './recipeEntry';
import {Form, Row, Select, Input, Button} from 'react-materialize'


export default class accountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      preferences: [],
      value: "",
      newName: '',
      email: '',
      phoneNum: '',
      userObj: {},
      emailDayPref: '',
      transportMethod: '',
      savedRecipes: [],
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.changeNameButtonActivate = this.changeNameButtonActivate.bind(this);
    this.changePhoneButtonActivate = this.changePhoneButtonActivate.bind(this);
    this.changeemailDayPref = this.changeemailDayPref.bind(this);
    this.changeTransportMethod = this.changeTransportMethod.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);

  }
  componentDidMount() {
    console.log(window.sessionStorage.getItem('token'));
    var Obj =  {
      accessToken: window.sessionStorage.getItem('token'),
    }
    var _this = this;
    axios.post("https://bazaar-408.herokuapp.com/profile/" + this.props.match.params.username, Obj)
    .then(function(results) {
        console.log(results);
        _this.setState({
          username: results.data.user.username,
          email: results.data.user.email,
          phoneNum: results.data.user.phoneNumber,
          emailDayPref: results.data.user.contact.frequency,
          transportMethod: results.data.user.contact.method,
          savedRecipes: results.data.user.savedRecipes,
          userObj: results.data.user,
        });
      })
      .catch((error) => {
        window.Materialize.toast("Failed. Try again", 1500);
      });
  }
  changeTransportMethod = (event) => {
    this.setState({transportMethod: event.target.value});
    //send to database
  }
  addPref = (event) => {
    console.log(event.target.value);
    this.setState({value: event.target.value});
    var newList = this.state.preferences;
    newList.push(this.state.value);
    this.setState({preferences: newList});

    var Obj = {
      prefs: this.state.preferences,
      accessToken: window.sessionStorage.getItem('token'),
      email: this.state.email,
    }
    //send to database
    axios.post("https://bazaar-408.herokuapp.com/profile/update_dish_prefs", Obj)
    .then(function(result) {
      window.Materialize.toast("Dish preferences successfully updated", 1500);
    })
    .catch((error) => {
      window.Materialize.toast("Failed. Try again", 1500);
    });
  };
  handleNameChange(event) {

    //console.log(event.target.value);
    this.setState({
      newName: event.target.value
    });
  }
  handlePhoneChange = (event) => {

    //console.log(event.target.value);
    this.setState({
      phoneNum: event.target.value
    });
  }
  
  changeNameButtonActivate() {
    if (this.state.newName === '' || this.state.newName === " ") {
      window.Materialize.toast("nothing has been written in input box", 1500);
      return false;
    }
    //send it to database
    var Obj = {
      username: this.state.newName,
      email: this.state.email,
      accessToken: window.sessionStorage.getItem('token'),
      oldUsername: this.state.username,
    }
    console.log(Obj);
    var _this = this;
    axios.post("https://bazaar-408.herokuapp.com/profile/update_username", Obj)
    .then(function(result) {
      console.log(result);
      if (result.message === "User Not Found") {
        window.Materialize.toast("User not found");
        return;
      }
      else {
        window.Materialize.toast("username successfully changed", 1500);
        window.sessionStorage.removeItem('loggedInName');
        window.sessionStorage.setItem('loggedInName', _this.state.newName);
        _this.setState({username: _this.state.newName});
        _this.setState({newName: ''});
        history.push('/profile/' + window.sessionStorage.getItem('loggedInName'));
      }
    })
    .catch((error) => {
      window.Materialize.toast("Failed. Try again");
    });
  }
  
  changePhoneButtonActivate = () => {
    if (this.state.phoneNum === '' || this.state.phoneNum === " ") {
      window.Materialize.toast("nothing has been written in input box", 1500);
      return false;
    }
    if (isNaN(this.state.phoneNum)) {
      window.Materialize.toast('Phone contains digits other than numbers. If you have dashes, please remove them', 1500);
      return;
    }
    if ( this.state.phoneNum.length != 10) {
      window.Materialize.toast('phone number contains too many or to little digits', 1500);
      return;
    }
    var temp = this.state.phoneNum;
    this.setState({
      phoneNum: temp,
    });
    //send it to database
    var Obj = {
      phoneNumber: this.state.phoneNum,
      email: this.state.email,
      accessToken: window.sessionStorage.getItem('token'),
      username: window.sessionStorage.getItem('loggedInName'),
    }
    var _this = this;
    axios.post("https://bazaar-408.herokuapp.com/profile/updatePhoneNumber", Obj)
    .then(function(result) {
      console.log(result);
      if (result.data.message == "User Not Found") {
        window.Materialize.toast("User not found", 1500);
        return;
      }
      else {
        window.Materialize.toast("username successfully changed", 1500);
      }
    })
    .catch((err) => {
      window.Materialize.toast("Failed. Try again", 1500);
    });
  }
  
  changeemailDayPref = (event) => {
    this.setState({emailDayPref: event.target.value});
    //send to database
  }

  deletePref = () => {
    var list = this.state.preferences;
    list.splice(list.length - 1, 1);
    this.setState({preferences: list});
    var Obj = {
      prefs: this.state.preferences,
      accessToken: window.sessionStorage.getItem('token'),
      email: this.state.email,
    }
    axios.post("https://bazaar-408.herokuapp.com/profile/update_dish_prefs", Obj)
    .then(function(result) {
      window.Materialize.toast("Dish preferences successfully updated", 1500);
    })
    .catch((err) => {
      window.Materialize.toast("Failed. Try again", 1500);
    });

  }

  removeFavorite(id) {
    var list = this.state.savedRecipes;
    /*if (list.length === 1) {
      this.setState({savedRecipes: [], });
    }
    else {*/
      console.log("in for loop");
      for(var i = 0; i < list.length; i++) {
        if (list[i].recipeID === id) {
          list.splice(i, 1);
          this.setState({savedRecipes: list});
          break;
        }
      }
    //}
    console.log(this.state.savedRecipes);
    var Obj = {
      savedRecipes: this.state.savedRecipes,
      userEmail: window.sessionStorage.getItem('email'),
      accessToken: window.sessionStorage.getItem('token'),
    }
    axios.post("https://bazaar-408.herokuapp.com/recipes/remove", Obj)
    .then(function(result) {
      console.log(result);
      window.Materialize.toast('Recipe successfully removed', 1500);
    })
    .catch((err) => {
      window.Materialize.toast("Failed. Try again", 1500);
    });
  }

  render() {
    let defaultMessage = "";
    if (this.state.savedRecipes.length === 0) {
      defaultMessage = <p>You currently do not have any favorites.</p>
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card-panel">
              <div className="card-action center">
                <h1>Settings for <b>{this.state.username}</b></h1>
              </div>
              <hr />
              <br />
              <div className="container">
                <div className="card-content">
                  <div className="row center">
                    <div className="col s9">
                      <div className="input-field">
                        <input type="text" id="username" value={this.state.newName} onChange={this.handleNameChange}/>
                        <label for="username">Change Username</label>
                      </div>
                    </div>
                    <div className="col s3 button-column">
                      <a className="btn waves-effect waves-light red darken-5" onClick={this.changeNameButtonActivate}><b>Change Name</b></a>
                    </div>
                  </div>
                  <div className="row center">
                    <div className="col s9">
                      <div className="input-field">
                        <input type="tel" id="tel" value={this.state.phoneNum} onChange={this.handlePhoneChange}/>
                        <label for="tel">Change Phone Number</label>
                      </div>
                    </div>
                    <div className="col s3 button-column">
                    <a className="btn waves-effect waves-light red darken-5" onClick={this.changePhoneButtonActivate}><b>Change Phone</b></a>
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col s12">
                      <h3><b>Meal Preferences</b></h3>
                      {this.state.preferences.map((prefValue, key) => (
                        <a className="btn disabled">{prefValue}</a>
                      ))}
                      <Row>
                        <Input type='select' onChange={this.addPref} >
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Vegan">Vegan</option>
                          <option value="Gluten-Free">Gluten-Free</option>
                          <option value="Lactose-Free">Lactose-Free</option>
                          <option value="Low Carb">Low Carb</option>
                          <option value="Paleo">Paleo</option>
                        </Input>
                      </Row>
                      <a className="btn waves-effect waves-light red darken-5" onClick={this.deletePref}><b>Remove Last Preference</b></a>
                    </div>
                  </div>

                  <hr />
                  <div className="row">
                    <div className="col s12">
                      <h3><b>Notification Options</b></h3>
                      <h5>Change how often you recieve your meal plan</h5>
                        <Row>
                          <Input type='select' value={this.state.emailDayPref} onChange={this.changeemailDayPref}>
                            <option value="1">Every Day</option>
                            <option value="2">2 Days</option>
                            <option value="3">3 Days</option>
                            <option value="4">4 Days</option>
                            <option value="5">5 Days</option>
                            <option value="6">6 Days</option>
                            <option value="7">7 Days</option>
                          </Input>
                        </Row>
                        <h5>Change how you get your calendar</h5>
                        <Row>
                          <Input type='select' value={this.state.transportMethod} onChange={this.changeTransportMethod}>
                            <option value="email">Email</option>
                            <option value="text">Text</option>
                          </Input>
                        </Row>
                    </div>
                  </div>

                  <hr />
                  <div className="row">
                    <div className="col s12">
                      <h3><b>Favorites</b></h3>
                      {defaultMessage}
                      {this.state.savedRecipes.map((recipe, key) => (
                        <RecipeEntry id={recipe.recipeID} name={recipe.recipeName} description={recipe.recipeDescription} deleteBut={true} removeCallBack={this.removeFavorite} addBut={false}/>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
