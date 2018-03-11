import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './updownvote.css';
import axios from 'axios';
import YouTube from 'react-youtube';
import {Form, Row, Select, Input, Button} from 'react-materialize'
import { FacebookShareButton, FacebookIcon} from 'react-share';

export default class viewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
      buttonDisabled: false,
      recipe: {
        _id: '',
        name: "",
        description: "",
        ingredients: [],
        steps: [],
        imageURL: '',
        calories: '',
        servingSize: '',
        tags: [],
        value: '',
        createdBy: '',
        comments: {},
        contact: {},
        videoId: '',
        comments:[ {
          username: '',
          comment: '',
        } ],
        upvotes: 0,
      },
      commentBox: '',
      commentList: [],
      dayValue: '',
      timeValue: '',
      prediction: '',
      voted: false,
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }
  componentDidMount() {
    var _this = this;
    var Obj = {
      accessToken: window.sessionStorage.getItem('token'),
      username: window.sessionStorage.getItem('loggedInName'),
    }
    axios.post("https://bazaar-408.herokuapp.com/recipes/" + this.props.match.params.id, Obj)
    .then(function(result) {
      console.log(result);
      console.log(result.data.data);
      _this.setState({recipe: result.data.data});
      _this.setState({votes: result.data.data.upvotes});
      _this.setState({commentList: result.data.data.comments});
      //_this.setState({ml: result.data.ml});
      if (result.data.ml) {
        _this.setState({prediction: result.data.ml});
      }
      if (result.data.voted) {
        _this.setState({voted: result.data.voted});
      }
    })
    .catch((err) => {
		  window.Materialize.toast("Failed. Try again", 1500);
    });
    //get recipe from id passed in through path
  }
  setTimeValue = (event) => {
    this.setState({timeValue: event.target.value});
    console.log(this.state.timeValue);
  }
  setDayValue = (event) => {
    this.setState({dayValue: event.target.value});
    console.log(this.state.dayValue);
  }
  upvote()  {
    console.log(this.state.buttonDisabled);
    if (window.sessionStorage.getItem('loggedInName') === null) {
      window.Materialize.toast("You need to be logged in", 1500);
      return;
    }
    if (this.state.buttonDisabled == true) {
      return;
    }
    let temp = this.state.votes;
    temp = temp + 1;
    this.setState({votes: temp});
    this.setState({buttonDisabled: true});
    this.setState({voted: true});
    var Obj = {
      voteCount: temp,
      vote: "like",
      recipeId: this.props.match.params.id,
      accessToken: window.sessionStorage.getItem('token'),
      username: window.sessionStorage.getItem('loggedInName'),
    }
    console.log(Obj);
    axios.post("https://bazaar-408.herokuapp.com/recipes/updateVote", Obj)
    .then(function(result) {
      console.log(result);
    })
    .catch((err) => {
		  window.Materialize.toast("Failed. Try again", 1500);
    });
    //send to server
    return;

  }
  downvote() {
    if (window.sessionStorage.getItem('loggedInName') === null) {
      window.Materialize.toast("You need to be logged in", 1500);
      return;
    }
    if (this.state.buttonDisabled == true) {
      return;
    }
    let temp = this.state.votes;
    temp = temp - 1;
    this.setState({votes: temp});
    this.setState({buttonDisabled: true});
    this.setState({voted: true});
    var Obj = {
      voteCount: temp,
      vote: "dislike",
      recipeId: this.props.match.params.id,
      accessToken: window.sessionStorage.getItem('token'),
      username: window.sessionStorage.getItem('loggedInName'),
    }
    axios.post("https://bazaar-408.herokuapp.com/recipes/updateVote", Obj)
    .then(function(result) {
      console.log(result);
    }).catch((err) => {
		  window.Materialize.toast("Failed. Try again", 1500);
    });
    return;
    //send this to server
  }
  _onReady(event) {
   // access to player in all event handlers via event.target
   event.target.pauseVideo();
 }
 handleCommentChange = (event) => {
   this.setState({commentBox: event.target.value});
 }
 addComment = () => {
   console.log(this.state.commentBox);
   var Obj = {
     username: window.sessionStorage.getItem('loggedInName'),
     comment: this.state.commentBox,
     accessToken:window.sessionStorage.getItem('token'),
   };

   axios.post("https://bazaar-408.herokuapp.com/recipes/" + this.state.recipe._id + "/newComment", Obj)
   .then(function(result) {
     console.log(result);
     window.Materialize.toast("Submitted your comment", 1500);
   }).catch((err) => {
		window.Materialize.toast("Failed. Try again", 1500);
   });

   var list = this.state.commentList;
   var newObj = {
     username: window.sessionStorage.getItem('loggedInName'),
     comment: this.state.commentBox,
   }
   list.push(newObj);
   this.setState({commentList: list});
 }
 addMealToCal = () => {
   var calObj = {
       day: this.state.dayValue,
       time: this.state.timeValue,
       meal: {
         id: this.state.recipe._id,
         calorieCount: this.state.recipe.calories,
         name: this.state.recipe.name,
       },
       email: window.sessionStorage.getItem('email'),
       accessToken: window.sessionStorage.getItem('token'),
     };
     console.log(calObj);
     var _this = this;
     axios.post("https://bazaar-408.herokuapp.com/calendar/update", calObj)
     .then(function(result) {
       console.log(result);
     }).catch((err) => {
		  window.Materialize.toast("Failed. Try again", 1500);
     });


 }
  render() {
    let button = '';
    if (this.state.commentBox.length > 0) {
      button=<a className="btn waves-effect waves-light red accent-2" onClick={this.addComment}><b>Submit</b></a>
    }
    return(
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card-panel">
        {/* <p>image can go here</p> */}
        <div>
          <div className="center">
          <FacebookShareButton
          url={window.location.href}
          quote="Look at this tasty recipe!!">
          <FacebookIcon
            size={32}
            round
          />
          </FacebookShareButton>
          <button className="btn waves-effect waves-light" onClick={this.upvote} disabled={this.state.buttonDisabled || this.state.voted}><b>I like it!</b></button>
          <p className="count">{this.state.votes}</p>
          <button className="btn red accent-2 waves-effect waves-light" style={{"margin-top": "5px"}} onClick={this.downvote} disabled={this.state.buttonDisabled || this.state.voted}><b>Eh, no.</b></button>
          </div>
          <div className="row center">
            <h1><b>{this.state.recipe.name}</b></h1>
            <h3>{this.state.recipe.description}</h3>
            {this.state.prediction &&
              <h6 style={{"font-family": "Noto Sans", color: "#ff5252"}}>We think that you may {this.state.prediction.toLowerCase()} this.</h6>
            }
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col s12">
            <h4><b>Ingredients</b></h4>
            <ul>
            {this.state.recipe && this.state.recipe.ingredients.map((prefValue, key) => (
              <li className="steps"><b>{key + 1}</b>: {prefValue.quantity} {prefValue.name}</li>
            ))}
            </ul>
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col s12">
            <h4><b>Steps</b></h4>
            <ul>
            {this.state.recipe && this.state.recipe.steps.map((prefValue, key) => (
              <li className="steps"><b>Step {key + 1}</b>: {prefValue.step}</li>
            ))}
            </ul>
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col s12">
            <h4><b>Tags</b></h4>
            <ul>
            {this.state.recipe && this.state.recipe.tags.map((prefValue, key) => (
              <li><a className="btn disabled">{prefValue}</a></li>
            ))}
            </ul>
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col s12">
            <h4><b>Other Information</b></h4>
            <p className="steps"><b>Serving Size</b>: {this.state.recipe.servingSize} servings</p>
            <p className="steps"><b>Calories</b>: {this.state.recipe.calories}</p>
            <p className="steps">Created by user <b>{this.state.recipe.createdBy}</b></p>
          </div>
        </div>
        <hr />


        <div className="row">
            <div className="col s12">
               <h4><b>Select Day and Time</b></h4>
                 <Input id="dayVal" type='select' defaultValue='sunday' onChange={this.setDayValue} >
                   <option value="sunday">Sunday</option>
                   <option value="monday">Monday</option>
                   <option value="tuesday">Tuesday</option>
                   <option value="wednesday">Wednesday</option>
                   <option value="thursday">Thursday</option>
                   <option value="friday">Friday</option>
                   <option value="saturday">Saturday</option>
                 </Input>


               <Input id="timeVal" type='select' defaultValue='breakfast' onChange={this.setTimeValue} >
                 <option value="breakfast">Breakfast</option>
                 <option value="lunch">Lunch</option>
                 <option value="dinner">Dinner</option>
               </Input>
               <button className="btn waves-effect waves-light red accent-2" style={{"margin-top": "15px"}} onClick={this.addMealToCal}><b>Add to Meal Calendar</b></button>
              </div>
             </div>

        <div className="center">
        <YouTube
          videoId={this.state.recipe.videoId}
          opts={{height: '480', width:'720',playerVars:{autoplay: 0}}}
          onReady={this._onReady}
        />
        </div>

        <hr />
        <div className="row">
          <div className="col s12">
            <h4><b>Comments</b></h4>
            <div className="input-field">
              <input type="text" id="commentField" value={this.state.commentBox} onChange={this.handleCommentChange}/>
              <label for="commentField">Leave a comment for {this.state.recipe.name}</label>
              {button}
            </div>
            {this.state.recipe && this.state.recipe.comments.map((obj, key) => (
              <div id="commentCard" className="card">
                <div className="card-content">
                  <div id="commentBlock">
                    <h5>{obj.username} said:  </h5>
                    <p>{obj.comment}</p>
                  </div>
                </div>
              </div>
        ))}
        {/*{this.state.recipe.comments.map((obj, key) => (
          <div id="commentBlock">
            <h4>{obj.username}: </h4>
            <h4>{obj.comment}</h4>
          </div>
        ))}*/}
        </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}
