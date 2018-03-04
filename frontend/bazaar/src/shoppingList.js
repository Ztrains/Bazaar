import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

export default class shoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: ["shoes","baking Soda","keyboard"],
      newItem: ''
    }
  }
  componentDidMount() {
    //get user list
  }
  handleRemoveItem = (key) => () => {
      console.log(this.state.List);
      var newList = this.state.List;
      newList.splice(key, 1);
      this.setState({List: newList});
      console.log(this.state.List);
  }
  handleNewChange = (event) => {
    this.setState({newItem: event.target.value});
  }
  addItem = () => {
    var newList = this.state.List;
    newList.push(this.state.newItem);
    this.setState({List: newList, newItem: ''});
  }
  render() {
    return(
        <div className="container">
        <h1>  Shopping List</h1>
        <br></br>
        <ul>
        {this.state.List.map((prefValue, key) => (
          <div className="ingredientList">
            <li>{prefValue}</li>
            <button className="minusbtn" onClick={this.handleRemoveItem(key)}>-</button>
          </div>
        ))}
        </ul>
          <input type="text2" placeholder="Add new Item" value={this.state.newItem} onChange={this.handleNewChange}/>
          <button className="btnsmallgreen" onClick={this.addItem}>Add Item</button>
        </div>
    );
  }
}
