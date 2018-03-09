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
      alert("Dish preferences successfully updated");
    })
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
      alert("nothing has been written in input box");
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
        alert("User not found");
        return;
      }
      else {
        alert("username successfully changed");
        window.sessionStorage.removeItem('loggedInName');
        window.sessionStorage.setItem('loggedInName', _this.state.newName);
        _this.setState({username: _this.state.newName});
        _this.setState({newName: ''});
        history.push('/profile/' + window.sessionStorage.getItem('loggedInName'));
      }
    })
  }
  changePhoneButtonActivate = () => {
    if (this.state.phoneNum === '' || this.state.phoneNum === " ") {
      alert("nothing has been written in input box");
      return false;
    }
    if (isNaN(this.state.phoneNum)) {
      alert('Phone contains digits other than numbers. If you have dashes, please remove them');
      return;
    }
    if ( this.state.phoneNum.length != 10) {
      alert('phone number contains too many or to little digits');
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
        alert("User not found");
        return;
      }
      else {
        alert("username successfully changed");
      }
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
      alert("Dish preferences successfully updated");
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
      alert('Recipe successfully removed');
    })
  }
  render() {
    return (
      <div className="container">
        <h1 id="fancytext">{this.state.username}</h1>
        <br></br>
        <input type="text" placeholder="newUsername" value={this.state.newName} onChange={this.handleNameChange}/>
        <button className="btn btn-primary"  onClick={this.changeNameButtonActivate}>Change Username</button>
        <input type="tel" className="validate" placeholder="Phone Number" value={this.state.phoneNum} onChange={this.handlePhoneChange}/>
        <button className="btn btn-primary"  onClick={this.changePhoneButtonActivate}>Change Phone Number</button>
        <p>{this.state.email}</p>
        <h4>Meal Preferences</h4>
        <ul>
          {this.state.preferences.map((prefValue, key) => (
            <li id="pref">{prefValue}</li>
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
              <button onClick={this.deletePref}>Remove Last Preference</button>
            <br/>
            <h4>Notification Options</h4>
          <Row>
            <p id="padd">Change how often you recieve your meal plan</p>
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
          <Row>
          <p id="padd">Change how you get your calendar</p>
          <Input type='select' value={this.state.transportMethod} onChange={this.changeTransportMethod}>
            <option value="email">Email</option>
            <option value="text">Text</option>
          </Input>
          </Row>
        </ul>

        <p>a lot of recipes can go here</p>
        {this.state.savedRecipes.map((recipe, key) => (
          <RecipeEntry id={recipe.recipeID} name={recipe.recipeName} description={recipe.recipeDescription} deleteBut={true} removeCallBack={this.removeFavorite} addBut={false}/>
        ))}
      </div>
    );
  }
}
