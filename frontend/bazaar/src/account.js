import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


export default class accountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "username",
      preferences: ["Meat", "Pork", "Potatoes", "Eggs"],
      value: "",
      newName: '',
    };
    this.addPref = this.addPref.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.changeNameButtonActivate = this.changeNameButtonActivate.bind(this);
  }
  addPref(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
    this.state.preferences.push(event.target.value);
    //send to database
  };
  handleNameChange(event) {
    //console.log(event.target.value);
    this.setState({
      newName: event.target.value
    });
  }
  changeNameButtonActivate() {
    var temp= this.state.newName;
    this.setState({
      username: temp,
    });
    //send it to database
    console.log(this.state.username);
  }
  render() {
    return (
      <div className="card border-primary text-center">
        <h2>Example {this.state.username}</h2>
        <input type="text" placeholder="newUsername" value={this.state.newName} onChange={this.handleNameChange}/>
        <button className="btn btn-primary"  onClick={this.changeNameButtonActivate}>Change Username</button>
        <ul>
          {this.state.preferences.map((prefValue) => (
            <li>{prefValue}</li>
          ))}
            <select id="preferencesSelect" value={this.state.value} onChange={this.addPref}>
              <option value="Beans">Beans</option>
              <option value="Tomatoes">Tomatoes</option>
              <option value="Lemon">Lemon</option>
              <option value="Cheese">Cheese</option>
            </select>
        </ul>
        <p>a lot of recipes can go here</p>
      </div>
    );
  }
}
