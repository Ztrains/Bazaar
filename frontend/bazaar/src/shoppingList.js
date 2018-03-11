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
    if (this.state.newItem.length < 1) {
      window.Materialize.toast('No items to submit!', 1500);
      return true;
    }
    if (this.state.newQuant.length < 1) {
      window.Materialize.toast('Must add quantity to item', 1500);
      return true;
    }
    var newList = this.state.List;
    newList.push({name: this.state.newItem, quantity: this.state.newQuant});
    this.setState({List: newList, newItem: '', newQuant: ''});
    return false;
  }
  submit = () => {
    this.setState({isSubmit: true});
    var shouldReturn = this.addItem(shouldReturn);
    if (shouldReturn == true) {
      return;
    }
    var _this = this;
    this.setState({isSubmit: false});
    var Obj = {
      accessToken: window.sessionStorage.getItem('token'),
      shoppingList: this.state.List,
      username: window.sessionStorage.getItem('loggedInName'),
    }
    axios.post("https://bazaar-408.herokuapp.com/updateShoppingList", Obj)
    .then(function(result) {
      if (result.data.message === "Success") {
        window.Materialize.toast("Success!", 1500);
      }
      else {
        window.Materialize.toast("A problem occured. Please try again", 1500);
      }
    })
  }
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card-panel">
              <div className="card-action center">
                <h1><b>Shopping List</b></h1>
              </div>
              <hr />
              {this.state.List.map((prefValue, key) => (
              <div className="row">
                <div className="container center">
                  <div className="col s4">
                    <div className="input-field">
                      <input id="shopListQuant" value={prefValue.quantity} disabled />
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="input-field">
                      <input id="shopListValue" value={prefValue.name} disabled />
                    </div>
                  </div>
                  <div className="col s2">
                    <div className="input-field">
                      <button className="waves-effect waves-light btn red accent-2" onClick={this.handleRemoveItem(key)}><b>X</b></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
              <div className="row">
                <div className="container">
                  <div className="col s4" id="newAddDiv">
                    <div className="input-field">
                      <input type='text' id="shopQuantAdd" value={this.state.newQuant} onChange={this.handleNewQuant} />
                      <label for="shopQuantAdd">Quantity</label>
                    </div>
                  </div>
                  <div className="col s6">
                    <div id="shopAddDiv" className="input-field">
                      <input id="shopListAdd" type="text" value={this.state.newItem} onChange={this.handleNewChange}/>
                      <label for="shopListAdd">Item</label>
                    </div>
                  </div>
                  <div className="col s2">
                    <div className="input-field">
                      <button className="waves-effect waves-light btn red accent-2" onClick={this.addItem}><b>Add Item</b></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container center">
                <button className="waves-effect waves-light btn red accent-2" onClick={this.submit}><b>Submit</b></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
