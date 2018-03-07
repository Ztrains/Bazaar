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
      preferences: ["Meat", "Pork", "Potatoes", "Eggs"],
      value: "",
      newName: '',
      email: '',
      userObj: '',
    };
    this.addPref = this.addPref.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.changeNameButtonActivate = this.changeNameButtonActivate.bind(this);
  }
  componentDidMount() {
    var Obj =  {
      accessToken: window.sessionStorage.getItem('token'),
    }
    var _this = this;
    axios.post("https://bazaar-408.herokuapp.com/profile/" + this.props.match.params.username, Obj)
    .then(function(results) {
      _this.setState({
        userObj: results.data,
        username: results.data.username,
        email: results.data.email,
      });
    });
  }
  addPref(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
    var newList = this.state.preferences;
    newList.push(this.state.value);
    this.setState({preferences: newList});
    //send to database
  };
  handleNameChange(event) {
    if (this.state.username === '' || this.state.username === " ") {
      alert("nothing has been written in input box");
      return false;
    }
    //console.log(event.target.value);
    this.setState({
      newName: event.target.value
    });
    var newObj = {
      username: this.state.newName,
      email: this.state.email,

    }
    axios.post("https://bazaar-408.herokuapp.com/auth/signin/", newObj)
    .then(function(result) {
      alert("username successfully changed");
    }).catch(function(error) {
      alert("username change unsuccessful");
    });
  }
  changeNameButtonActivate() {
    var temp = this.state.newName;
    this.setState({
      username: temp,
    });
    //send it to database
    console.log(this.state.username);
  }
  render() {
    return (
      <div className="container">
      <div className="card border-primary text-center">
        <h2 id="userNameBanner">Example {this.state.username}</h2>
        <input type="text" placeholder="newUsername" value={this.state.newName} onChange={this.handleNameChange}/>
        <button className="btn btn-primary"  onClick={this.changeNameButtonActivate}>Change Username</button>
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
