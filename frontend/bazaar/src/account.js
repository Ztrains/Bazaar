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
    };
    this.addPref = this.addPref.bind(this);
  }
  addPref(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
    this.state.preferences.push(event.target.value);
  };
  render() {
    return (
      <div className="card border-primary text-center">
        <h2>Example {this.state.username}</h2>
        <button className="btn btn-primary">Change Username</button>
        <ul>
          {this.state.preferences.map((prefValue) => (
            <li>{prefValue}</li>
          ))}
            <select id="preferencesSelect" value={this.state.value} onChange={this.addPref}>
              <option value="others">otheres</option>
              <option value="thigns">thigns</option>
            </select>
        </ul>
        <p>a lot of recipes can go here</p>
      </div>
    );
  }
}
