import React from 'react';
//import './index.css';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {Row, Input} from 'react-materialize'

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
      recipeName: this.props.name,
      recipeDescription: this.props.description,
      userEmail: window.sessionStorage.getItem('email'),
    }
    axios.post("https://bazaar-408.herokuapp.com/recipes/save", newObj)
    .then(function(result) {
      window.Materialize.toast('Successfully saved to Favorites', 1500);
    }).catch((err) => {
		  window.Materialize.toast("Failed. Try again", 1500);
    });

  }
  removeFav(id) {
    this.props.removeCallBack(id);
  }
  setTimeValue = (event) => {
    this.setState({timeValue: event.target.value});
  }
  setDayValue = (event) => {
    this.setState({dayValue: event.target.value});
  }
  addMealToCal() {
    var calObj = {
      day: this.state.dayValue,
      meal: {
        id: this.props.id,
        name: this.props.name,
        calorieCount: this.props.calories,
      },
      time: this.state.timeValue,
      accessToken: window.sessionStorage.getItem('token'),
      email: window.sessionStorage.getItem('email'),
    }
    axios.post("https://bazaar-408.herokuapp.com/calendar/update", calObj)
    .then(function(result) {
    }).catch((err) => {
		  window.Materialize.toast("Failed. Try again", 1500);
    });
  }
  render() {
    let addBut = '';
    if (this.props.addBut === false) {
      addBut = '';
    }
    else {
      addBut = <button id="favBtn" className="waves-effect waves-light btn red accent-2" onClick={this.addFavorite}><b>Add to Favorites</b></button>
    }
    let button = '';
    if (this.props.deleteBut === true) {
      button = <button className="waves-effect waves-light btn red accent-2" onClick={() => {this.removeFav(this.props.id)}}><b>Delete</b></button>
    }
    let opts = "";
    if (this.state.showCalOptions === true) {
      opts = <Row>
                <h3>Select Day and Time</h3>
                <Input id="day" type="select" defaultValue='Sunday' onChange={this.setDayValue} >
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                </Input>


              <Input id="timeVal" type="select" defaultValue='Breakfast' onChange={this.setTimeValue} >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </Input>
              <button id="mealAdderBtn" className="waves-effect waves-light btn red accent-2" onClick={this.addMealToCal}><b>Add to Meal Calendar</b></button>
            </Row>
    }
    else {
      opts = <button id="noBtn" className="waves-effect waves-light btn" onClick={this.showCalOpt}><b>Add to Meal Calendar</b></button>
    }
    return(
      <div className="container flex">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div id="recipeEntryCard" className="card">
              <div className="card-stacked">
                <div className="card-content">
                  <h3><Link style={{color: "#ff5252"}} to={'/recipes/' + this.props.id}><b>{this.props.name}</b></Link></h3>
                  <h5>{this.props.description}</h5>

                </div>
                <div className="card-action">
                <div className="container center">
                  {opts}
                  {addBut}
                  {button}
                </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
