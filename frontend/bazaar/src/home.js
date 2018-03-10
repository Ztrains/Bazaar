import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

export default class Home extends React.Component {
  render() {
    return (
      <div>
      <div className="container">
      <h2 className="headTitle center">Welcome To Bazaar! </h2>
      <br></br><br></br>
      </div>
      <div style={{height: '40vh'}}>
      <img id="img" src="https://www.visitoiran.com/sites/default/files/styles/main_picture_1200x300/public/2017-07/%D8%A8%D8%A7%D8%B2%D8%A7%D8%B1%20%D9%88%DA%A9%DB%8C%D9%84-main-r.jpg?itok=l4OL0_pH" alt="bazaar"></img>
      </div>
      </div>
    );
  }
}
