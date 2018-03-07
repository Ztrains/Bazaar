import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

export default class shoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [{name: "shoes", quantity: '6'},{name: "potatoes", quantity: '234'}, {name: "keyboard", quantity: '1'}],
      newItem: '',
      newQuant: '',
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
  handleNewQuant = (event) => {
    this.setState({newQuant: event.target.value});
  }
  addItem = () => {
    if (this.state.newItem.length < 1) {
      alert('Box must be full');
      return;
    }
    var newList = this.state.List;
    newList.push({name: this.state.newItem, quantity: this.state.newQuant});
    this.setState({List: newList, newItem: '', newQuant: ''});
  }
  render() {
    return(
        <div className="container">
        <div className="card">
        <div className="card-content">
        <h1>  Shopping List</h1>
        <br></br>
        <ul>
        {this.state.List.map((prefValue, key) => (
          <div>
            <div className="input-field">
              <input id="shopListQuant" value={prefValue.quantity} disabled />
            </div>
            <div className="input-field">
              <input id="shopListValue" value={prefValue.name} disabled />
              <button className="minusbtn" onClick={this.handleRemoveItem(key)}>-</button>
            </div>
          </div>
        ))}
        </ul>
          <div id="newAddDiv">
            <div className="input-field">
              <input type='text' id="shopQuantAdd" placeholder="Add Quantity of Item" value={this.state.newQuant} onChange={this.handleNewQuant} />
              </div>
              <div id="shopAddDiv" className="input-field">
                <input id="shopListAdd" type="text" placeholder="Add new Item" value={this.state.newItem} onChange={this.handleNewChange}/>
                <button className="btnsmallgreen" onClick={this.addItem}>Add Item</button>
              </div>
            </div>
          </div>
          </div>
        </div>
    );
  }
}
