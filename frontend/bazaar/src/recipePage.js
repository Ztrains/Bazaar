import React from 'react'
import './index.css'

export default class recipePage extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleClickUP = this.handleClickUP.bind(this);
    this.handleClickD = this.handleClickD.bind(this);
    this.state = {
      count: 0
    }
  }
  
  handleClickUP(e) {
    this.setState ({
      count: this.state.count + 1
    });
  }

  handleClickD() {
    this.setState({
      count: this.state.count - 1
    });
  }
  
  
  
  render() {
    return(
      <div className="card text-center">
        <h2>Recipe Name</h2>
        <div className="inline"> 
          <button className="btn btn-primary" handleClickUP={this.handleClickUP}>Upvote</button>
          <button className="btn btn-secondary">Downvote</button>
          <h1>{this.state.count}</h1>
          </div>
        <h4>Recipe Description</h4>
        <p>Ingredients</p>
        <ul>
          <li>Meat</li>
          <li>Potatoes</li>
        </ul>
        <p> Cooking Instructions</p>
        <ul>
          <li>cook it</li>
          <li> eat it</li>
        </ul>
        <button className="btn btn-primary"> Add to favorites</button>
        <button className="btn btn-secondary">Add to shopping list</button>
      </div>
    );
  }
}
