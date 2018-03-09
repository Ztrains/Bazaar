import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';



export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: {
					sunday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: 0
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: 0
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: 0
						}
					},
					monday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: 0
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: 0
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: 0
						}
					},
					tuesday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: 0
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: 0
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: 0
						}
					},
					wednesday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: 0
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: 0
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: 0
						}
					},
					thursday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: 0
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: 0
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: 0
						}
					},
					friday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: 0
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: 0
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: 0
						}
					},
					saturday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: 0
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: 0
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: 0
						}
					}
        }
    };
  }
  componentDidMount() {
    var Obj = {
      accessToken: window.sessionStorage.getItem('token'),
      username: window.sessionStorage.getItem('loggedInName'),
    }
    var _this = this;
    axios.post("https://bazaar-408.herokuapp.com/calendar", Obj)
    .then(function(result) {
      console.log(result);
      _this.setState({calendar: result.data.calendar});

    })
  }
  render() {
    return(
      <div>
      <table className="table">
      <thead className="thead-dark">
      <tr>
        <th scope="col">Day Of Week</th>
        <th scope="col">Breakfast</th>
        <th scope="col">Lunch</th>

        <th scope="col">Dinner</th>
        <th scope="col" className="table-info">Total Calories:</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">Sunday</th>
        <td>{this.state.calendar.sunday.breakfast.name}</td>
        <td>{this.state.calendar.sunday.lunch.name}</td>

        <td>{this.state.calendar.sunday.dinner.name}</td>
        <td>{this.state.calendar.sunday.breakfast.calorieCount + this.state.calendar.sunday.lunch.calorieCount + this.state.calendar.sunday.dinner.calorieCount}</td>
      </tr>
      <tr>
        <th scope="row">Monday</th>
        <td>{this.state.calendar.monday.breakfast.name}</td>
        <td>{this.state.calendar.monday.lunch.name}</td>

        <td>{this.state.calendar.monday.dinner.name}</td>
        <td>{this.state.calendar.monday.breakfast.calorieCount + this.state.calendar.monday.lunch.calorieCount + this.state.calendar.monday.dinner.calorieCount}</td>
      </tr>
      <tr>
        <th scope="row">Tuesday</th>
        <td>{this.state.calendar.tuesday.breakfast.name}</td>
        <td>{this.state.calendar.tuesday.lunch.name}</td>

        <td>{this.state.calendar.tuesday.dinner.name}</td>
        <td>{this.state.calendar.tuesday.breakfast.calorieCount + this.state.calendar.tuesday.lunch.calorieCount + this.state.calendar.tuesday.dinner.calorieCount}</td>

      </tr>
      <tr>
        <th scope="row">Wednesday</th>
        <td>{this.state.calendar.wednesday.breakfast.name}</td>
        <td>{this.state.calendar.wednesday.lunch.name}</td>

        <td>{this.state.calendar.wednesday.dinner.name}</td>
        <td>{this.state.calendar.wednesday.breakfast.calorieCount} + {this.state.calendar.wednesday.lunch.calorieCount} + {this.state.calendar.wednesday.dinner.calorieCount}</td>

      </tr>
      <tr>
        <th scope="row">Thursday</th>
        <td>{this.state.calendar.thursday.breakfast.name}</td>
        <td>{this.state.calendar.thursday.lunch.name}</td>

        <td>{this.state.calendar.thursday.dinner.name}</td>
        <td>{this.state.calendar.thursday.breakfast.calorieCount + this.state.calendar.thursday.lunch.calorieCount + this.state.calendar.thursday.dinner.calorieCount}</td>

      </tr>
      <tr>
        <th scope="row">Friday</th>
        <td>{this.state.calendar.friday.breakfast.name}</td>
        <td>{this.state.calendar.friday.lunch.name}</td>

        <td>{this.state.calendar.friday.dinner.name}</td>
        <td>{this.state.calendar.friday.breakfast.calorieCount + this.state.calendar.friday.lunch.calorieCount + this.state.calendar.friday.dinner.calorieCount}</td>

      </tr>
      <tr>
        <th scope="row">Saturday</th>
        <td>{this.state.calendar.saturday.breakfast.name}</td>
        <td>{this.state.calendar.saturday.lunch.name}</td>

        <td>{this.state.calendar.saturday.dinner.name}</td>
        <td>{this.state.calendar.saturday.breakfast.calorieCount + this.state.calendar.saturday.lunch.calorieCount + this.state.calendar.saturday.dinner.calorieCount}</td>
      </tr>

      </tbody>
      </table>
      </div>
    );
  }
}
