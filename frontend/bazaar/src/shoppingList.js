import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

export default class shoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
      newItem: '',
      newQuant: '',
      isSubmit: false,
    }
    this.addItem = this.addItem.bind(this);
  }
  componentDidMount() {
    var _this = this;
    var Obj = {
      accessToken: window.sessionStorage.getItem('token'),
      username: window.sessionStorage.getItem('loggedInName'),
    }
    axios.post("https://bazaar-408.herokuapp.com/getShoppingList", Obj)
    .then(function(result) {
      console.log(result.data.data);
      _this.setState({List: result.data.data});
    })
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
  addItem() {
    if (this.state.newItem.length < 1 && this.state.isSubmit === false) {
      alert('Box must be full');
      return;
    }
    var newList = this.state.List;
    newList.push({name: this.state.newItem, quantity: this.state.newQuant});
    this.setState({List: newList, newItem: '', newQuant: ''});
  }
  submit = () => {
    this.setState({isSubmit: true});
    this.addItem();
    var _this = this;
    this.setState({isSubmit: false});
    var Obj = {
      accessToken: window.sessionStorage.getItem('token'),
      shoppingList: this.state.List,
      username: window.sessionStorage.getItem('loggedInName'),
    }
    axios.post("https://bazaar-408.herokuapp.com/updateShoppingList", Obj)
    .then(function(result) {
      alert("List successfully submitted");
    })
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
          <button className="listSubmitButton" onClick={this.submit}>Submit List</button>
        </div>
      </div>
        </div>
    );
  }
}
