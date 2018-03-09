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
      },
      commentBox: '',
      dayValue: '',
      timeValue: '',
      ml: {},
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
      //_this.setState({ml: result.data.ml});
    })
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
    if (this.state.buttonDisabled == true) {
      return;
    }
    let temp = this.state.votes;
    this.setState({votes: temp + 1});
    this.setState({buttonDisabled: true});
    var Obj = {
      voteCount: this.state.votes,
      recipeId: this.props.match.params.id,
      accessToken: window.sessionStorage.getItem('token'),
    }
    axios.post("https://bazaar-408.herokuapp.com/recipes/updateVote", Obj)
    .then(function(result) {
      console.log(result);
    });
    //send to server
    return;

  }
  downvote() {
    if (this.state.buttonDisabled == true) {
      return;
    }
    let temp = this.state.votes;
    temp = temp - 1;
    this.setState({votes: temp});
    this.setState({buttonDisabled: true});
    var Obj = {
      voteCount: this.state.votes,
      recipeId: this.props.match.params.id,
      vote: 'dislike'
    }
    axios.post("https://bazaar-408.herokuapp.com/recipes/updateVote", Obj)
    .then(function(result) {
      console.log(result);
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
 }
 addMealToCal() {
   var calObj = {
     calUpdate: {
       day: this.state.dayValue,
       time: this.state.timeValue,
       id: this.props.match.params.id,
     },
     accessToken: window.sessionStorage.getItem('token'),
   }

 }
  render() {
    let button = '';
    if (this.state.commentBox.length > 0) {
      button=<Button waves='light' onClick={this.addComment}>Submit</Button>
    }
    return(

      <div className="container">
        <p>image can go here</p>
        <p>We think you may {} this</p>
        <div className="arrange-horizontally">
          <div className="arrange-vertically">
          <button className="up" onClick={this.upvote} disabled={this.state.buttonDisabled}>&and;</button>
          <p className="count">{this.state.votes}</p>
          <button className="down" onClick={this.downvote} disabled={this.state.buttonDisabled}>&or;</button>
          </div>
          <div className="arrange-vertically" id="left">
          <h1 id="a">{this.state.recipe.name}</h1>
          <h2 id="b">{this.state.recipe.description}</h2>
          </div>
        </div>
        <br></br>
        <FacebookShareButton
          url={window.location.href}
          quote="Look at this tasty recipe!!">
          <FacebookIcon
            size={32}
            round
          />
          </FacebookShareButton>

        <ul>
        {this.state.recipe && this.state.recipe.ingredients.map((prefValue, key) => (
          <li>{key + 1}: {prefValue.quantity} {prefValue.name}</li>
        ))}
        </ul>
        <ul>
        {this.state.recipe && this.state.recipe.steps.map((prefValue, key) => (
          <li>Step {key + 1}: {prefValue.step}</li>
        ))}
        </ul>
        <ul>
        {this.state.recipe && this.state.recipe.tags.map((prefValue, key) => (
          <li>{prefValue}</li>
        ))}
        </ul>
        <p>{this.state.recipe.servingSize}</p>
        <p>{this.state.recipe.calories}</p>

        <Row>
               <h4>Select Day and Time</h4>

                 <Input type='select' defaultValue='Sunday' onChange={this.setDayValue} >
                   <option value="Sunday">Sunday</option>
                   <option value="Monday">Monday</option>
                   <option value="Tuesday">Tuesday</option>
                   <option value="Wednesday">Wednesday</option>
                   <option value="Thursday">Thursday</option>
                   <option value="Friday">Friday</option>
                   <option value="Saturday">Saturday</option>
                 </Input>


               <Input type='select' defaultValue='Sunday' onChange={this.setTimeValue} >
                 <option value="Breakfast">Breakfast</option>
                 <option value="Lunch">Lunch</option>
                 <option value="Dinner">Dinner</option>
               </Input>
               <button onClick={this.addMealToCal}>Add to Meal Calendar</button>
             </Row>

        <YouTube
          videoId="7pSmhZFbCy0"
          opts={{height: '480', width:'720',playerVars:{autoplay: 0}}}
          onReady={this._onReady}
        />
        <br/><br/>
        <div className="input-field">
          <input type="text" placeholder="Leave a public review/comment..." value={this.state.commentBox} onChange={this.handleCommentChange}/>
          {button}
        </div>
        <div id="commentCard" className="card">
          <div className="card-content">
            <div id="commentBlock">
              <h5>ssad said:  </h5>
              <p>' ' + asdasdasd</p>
            </div>
          </div>
        </div>
        {/*{this.state.recipe.comments.map((obj, key) => (
          <div id="commentBlock">
            <h4>{obj.username}: </h4>
            <h4>{obj.comment}</h4>
          </div>
        ))}*/}
        <p>Created by {this.state.recipe.createdBy}</p>
      </div>
    );
  }
}
