import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';



export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: {}
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
        <th scope="row">Monday</th>
        <td>Jelly</td>
        <td>Pudding</td>

        <td>Ramen</td>
        <td>2000</td>
      </tr>
      <tr>
        <th scope="row">Tuesday</th>
        <td>Jelly</td>
        <td>Pudding</td>

        <td>Ramen</td>
        <td >2000</td>

      </tr>
      <tr>
        <th scope="row">Wednesday</th>
        <td>Jelly</td>
        <td>Pudding</td>

        <td>Ramen</td>
        <td>2000</td>

      </tr>
      <tr>
        <th scope="row">Thursday</th>
        <td>Jelly</td>
        <td>Pudding</td>

        <td>Ramen</td>
        <td>2000</td>

      </tr>
      <tr>
        <th scope="row">Friday</th>
        <td>Jelly</td>
        <td>Pudding</td>

        <td>Ramen</td>
        <td>2000</td>

      </tr>
      <tr>
        <th scope="row">Saturday</th>
        <td>Jelly</td>
        <td>Pudding</td>

        <td>Ramen</td>
        <td>2000</td>
      </tr>
      <tr>
        <th scope="row">Sunday</th>
        <td>Jelly</td>
        <td>Pudding</td>

        <td>Ramen</td>
        <td>2000</td>
      </tr>
      </tbody>
      </table>
      </div>
    );
  }
}
