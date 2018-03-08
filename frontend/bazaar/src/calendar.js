import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';



export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return(
      <div>
      <table className="table">
      <thead className="thead-dark">
      <tr>
        <th scope="col">Meal</th>
        <th scope="col">Monday</th>
        <th scope="col">Tuesday</th>
        <th scope="col">Wednesday</th>
        <th scope="col">Thursday</th>
        <th scope="col">Friday</th>
        <th scope="col">Saturday</th>
        <th scope="col">Saturday</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">Breakfast</th>
        <td>Jelly</td>
        <td>Pudding</td>
        <td>Bread</td>
        <td>Ramen</td>
        <td>Eggs</td>
        <td>Cory Laker</td>
        <td>More Food</td>
      </tr>
      <tr>
        <th scope="row">Lunch</th>
        <td>Jelly</td>
        <td>Pudding</td>
        <td>Bread</td>
        <td>Ramen</td>
        <td>Eggs</td>
        <td>Cory Laker</td>
        <td>More Food</td>
      </tr>
      <tr>
        <th scope="row">Snacks</th>
        <td>Jelly</td>
        <td>Pudding</td>
        <td>Bread</td>
        <td>Ramen</td>
        <td>Eggs</td>
        <td>Cory Laker</td>
        <td>More Food</td>
      </tr>
      <tr>
        <th scope="row">Dinner</th>
        <td>Jelly</td>
        <td>Pudding</td>
        <td>Bread</td>
        <td>Ramen</td>
        <td>Eggs</td>
        <td>Cory Laker</td>
        <td>More Food</td>
      </tr>
      <tr className="table-info">
        <th scope="row">Total Calories: </th>
        <td>2000</td>
        <td>2000</td>
        <td>2000</td>
        <td>2000</td>
        <td>2000</td>
        <td>2000</td>
        <td>2000</td>
      </tr>
      </tbody>
      </table>
      </div>
    );
  }
}
