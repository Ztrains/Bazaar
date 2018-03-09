import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'
import {Form, Row, Select, Input} from 'react-materialize'


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
    };
    this.addPref = this.addPref.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.changeNameButtonActivate = this.changeNameButtonActivate.bind(this);
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
        userObj: results.data.user,
      });
    });
  }
  addPref(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
    var newList = this.state.preferences;
    newList.push(this.state.value);
    this.setState({preferences: newList});
    var Obj = {
      prefs: this.state.preferences,
      accessToken: window.sessionStorage.getItem('token'),
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
  handlePhoneChange(event) {

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
    }
    console.log(Obj);
    var _this = this;
    axios.post("https://bazaar-408.herokuapp.com/profile/update_username", Obj)
    .then(function(result) {
      if (result.data.message == "User Not Found") {
        alert("User not found");
        return;
      }
      else {
        alert("username successfully changed");
      }
    })
  }
  changePhoneButtonActivate() {
    if (this.state.phoneNum === '' || this.state.phoneNum === " ") {
      alert("nothing has been written in input box");
      return false;
    }
    var temp = this.state.phoneNum;
    this.setState({
      phoneNum: temp,
    });
    //send it to database
    var Obj = {
      phoneNum: this.state.phoneNum,
      email: this.userObj.email,
      accessToken: window.sessionStorage.getItem('token'),
    }
    var _this = this;
    axios.post("https://bazaar-408.herokuapp.com/profile/update_username", Obj)
    .then(function(result) {
      if (result.data.message == "User Not Found") {
        alert("User not found");
        return;
      }
      else {
        alert("username successfully changed");
      }
    })
    console.log(this.state.username);
  }
  render() {
    return (
      <div className="container">
      <div className="card border-primary text-center">
        <h2 id="userNameBanner">{this.state.username}</h2>
        <input type="text" placeholder="newUsername" value={this.state.newName} onChange={this.handleNameChange}/>
        <button className="btn btn-primary"  onClick={this.changeNameButtonActivate}>Change Username</button>
        <input type="text" placeholder="Phone Number" value={this.state.phoneNum} onChange={this.handlePhoneChange}/>
        <button className="btn btn-primary"  onClick={this.changePhoneButtonActivate}>Change Phone Number</button>
        <p>{this.state.email}</p>
        <ul>
          {this.state.preferences.map((prefValue, key) => (
            <li>{prefValue}</li>
          ))}
          <Row>
            <Input type='select' value={this.state.value} onChange={this.addPref} defaultValue='0'>
              <option value=""></option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Lactose-Free">Lactose-Free</option>
              <option value="Low Carb">Low Carb</option>
              <option value="Paleo">Paleo</option>
            </Input>
            </Row>
        </ul>

        <p>a lot of recipes can go here</p>
      </div>
      </div>
    );
  }
}
