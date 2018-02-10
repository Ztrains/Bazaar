import React from 'react'
import './index.css'

export default class recipePage extends React.Component {
  render() {
    return(
      <div className="card text-center">
        <h2>Recipe Name</h2>
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
