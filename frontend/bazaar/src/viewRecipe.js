import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

export default class viewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: 20,
      buttonDisabled: false,
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }
  componentDidMount() {
    //get recipe from id passed in through path
  }
  upvote() {
    if (this.state.buttonDisabled == true) {
      return;
    }
    let temp = this.state.votes;
    temp = temp + 1;
    this.setState({votes: temp});
    //send this to server
  }
  downvote() {
    if (this.state.buttonDisabled == true) {
      return;
    }
    let temp = this.state.votes;
    temp = temp - 1;
    this.setState({votes: temp});
    //send this to server
  }
  render() {
    return(
      <div className="container">
        <p>image can go here</p>
        <h1>Recipe title</h1>
        <h2>Description</h2>
        <button onclick={this.upvote} disabled={this.state.buttonDisabled}>Upvote Button</button>
        <button onclick={this.downvote} disabled={this.state.buttonDisabled}>Downvote Button</button>
        <ul>
          <li>"3 potatoes"</li>
          <li>"2 eggs"</li>
          <li>"1 onion"</li>
        </ul>
        <ul>
          <li>"Step 1"</li>
        </ul>

        <p>This is where a video get embedded</p>
      </div>
    );
  }
}
