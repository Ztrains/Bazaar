import React from 'react';
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
    axios.post("https://bugged-backend.herokuapp.com/calendar", Obj)
    .then(function(result) {
      _this.setState({calendar: result.data.calendar});

	})
	.catch((err) => {
		window.Materialize.toast("Failed. Try again", 1500);
	});
  }
  render() {
    return(
      <div className="container">
				<h1><b>Meal Calendar</b></h1>
				<hr />
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
						<td>{0}</td>
					</tr>
					<tr>
						<th scope="row">Monday</th>
						<td>{this.state.calendar.monday.breakfast.name}</td>
						<td>{this.state.calendar.monday.lunch.name}</td>

						<td>{this.state.calendar.monday.dinner.name}</td>
						<td>{0}</td>
					</tr>
					<tr>
						<th scope="row">Tuesday</th>
						<td>{this.state.calendar.tuesday.breakfast.name}</td>
						<td>{this.state.calendar.tuesday.lunch.name}</td>

						<td>{this.state.calendar.tuesday.dinner.name}</td>
						<td>{0}</td>

					</tr>
					<tr>
						<th scope="row">Wednesday</th>
						<td>{this.state.calendar.wednesday.breakfast.name}</td>
						<td>{this.state.calendar.wednesday.lunch.name}</td>

						<td>{this.state.calendar.wednesday.dinner.name}</td>
						<td>{0}</td>

					</tr>
					<tr>
						<th scope="row">Thursday</th>
						<td>{this.state.calendar.wednesday.breakfast.name}</td>
						<td>{this.state.calendar.wednesday.lunch.name}</td>

						<td>{this.state.calendar.wednesday.dinner.name}</td>
						<td>{0}</td>

					</tr>
					<tr>
						<th scope="row">Friday</th>
						<td>{this.state.calendar.friday.breakfast.name}</td>
						<td>{this.state.calendar.friday.lunch.name}</td>

						<td>{this.state.calendar.friday.dinner.name}</td>
						<td>{0}</td>

					</tr>
					<tr>
						<th scope="row">Saturday</th>
						<td>{this.state.calendar.saturday.breakfast.name}</td>
						<td>{this.state.calendar.saturday.lunch.name}</td>

						<td>{this.state.calendar.saturday.dinner.name}</td>
						<td>{0}</td>
					</tr>

					</tbody>
				</table>
      </div>
    );
  }
}
