import React from 'react';
//import './index.css';
import axios from 'axios';
import {Link, Router} from 'react-router-dom'
import {Form, Row, Select, Input} from 'react-materialize'

export default class recipeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: window.sessionStorage.getItem('loggedInName'),
      showCalOptions: false,
      dayValue: '',
      timeValue: '',
    };
    this.addFavorite = this.addFavorite.bind(this);
    this.addMealToCal = this.addMealToCal.bind(this);
  }
  showCalOpt = () => {
    this.setState({showCalOptions: true});
  }
  addFavorite() {
    var newObj = {
      recipeID: this.props.id,
      userEmail: window.sessionStorage.getItem('email'),
    }
    console.log(newObj);
    axios.post("https://bazaar-408.herokuapp.com/recipes/save", newObj)
    .then(function(result) {
      console.log(result);
    });

    //add to database
  }
  removeFav() {
    var Obj = {
      recipeID: this.props.id,
      userEmail: window.sessionStorage.getItem('email'),
    }
  }
  setTimeValue = (event) => {
    this.setState({timeValue: event.target.value});
    console.log(this.state.timeValue);
  }
  setDayValue = (event) => {
    this.setState({dayValue: event.target.value});
    console.log(this.state.dayValue);
  }
  addMealToCal() {
    var calObj = {
      day: this.state.dayValue,
      time: this.state.timeValue,
    }
  }
  render() {
    let button = '';
    if (this.props.deleteBut === true) {
      button = <button onClick={this.removeFav}>Delete</button>
    }
    let opts = "";
    console.log(this.state.showCalOptions);
    if (this.state.showCalOptions === true) {
      opts = <Row>

                <h3>Select Day and Time</h3>
                <Input id="day" type="select" defaultValue='Sunday' onChange={this.setDayValue} >
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </Input>


              <Input id="timeVal" type="select" defaultValue='Breakfast' onChange={this.setTimeValue} >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </Input>
              <button id="mealAdderBtn" onClick={this.addMealToCal}>Add to Meal Calendar</button>
            </Row>
    }
    else {
      opts = <button id="noBtn" className="btn btn-success float-md-right" onClick={this.showCalOpt}> Add to Meal Calendar</button>
    }
    return(
      <div className="container flex">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div id="recipeEntryCard" className="card ">


              <div className="card-stacked">
                <div className="card-content">
                  <h3 className="card-title"><Link to={'/recipes/' + this.props.id}><b>{this.props.name}</b></Link></h3>
                  <p>{this.props.description}</p>

                </div>
                <div className="card-action">
                  {opts}
                  <button id="favBtn" className="btn btn-success float-md-right" onClick={this.addFavorite}> Add to favorites</button>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
