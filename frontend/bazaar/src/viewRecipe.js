import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import YouTube from 'react-youtube';
import { FacebookShareButton, FacebookIcon} from 'react-share';
import ReactDisqusComments from 'react-disqus-comments';

export default class viewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
      buttonDisabled: false,
      recipe: {
        name: "",
        description: "",
        ingredients: [],
        steps: [],
        imageURL: '',
        calories: '',
        servingSize: '',
        tags: [],
        value: '',
        createdBy: ''
      },
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }
  componentDidMount() {
    var _this = this;
    axios.get("https://bazaar-408.herokuapp.com/recipes/" + this.props.match.params.id)
    .then(function(result) {
      console.log(result.data.data);
      _this.setState({recipe: result.data.data});
      console.log(result.data.data.votes);
      _this.setState({votes: result.data.data.votes});
    })
    //get recipe from id passed in through path
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
 handleNewComment(comment) {
   console.log(comment.text);
 }
  render() {
    return(
      <div className="container">
        <p>image can go here</p>
        <h1>{this.state.recipe.name}</h1>
        <h2>{this.state.recipe.description}</h2>
        <p>{this.state.votes}</p>
        <button onClick={this.upvote} disabled={this.state.buttonDisabled}>Upvote Button</button>
        <button onClick={this.downvote} disabled={this.state.buttonDisabled}>Downvote Button</button>
        <FacebookShareButton
          url="reddit.com"
          quote="Look at this tasty recipe!!">
          <FacebookIcon
            size={32}
            round
          />
          </FacebookShareButton>

        <ul>
        {this.state.recipe && this.state.recipe.ingredients.map((prefValue, key) => (
          <li>{prefValue.quantity} {prefValue.name}</li>
        ))}
        </ul>
        <ul>
        {this.state.recipe && this.state.recipe.steps.map((prefValue, key) => (
          <li>{prefValue.step}</li>
        ))}
        </ul>
        <ul>
        {this.state.recipe && this.state.recipe.tags.map((prefValue, key) => (
          <li>{prefValue}</li>
        ))}
        </ul>
        <p>{this.state.recipe.servingSize}</p>
        <p>{this.state.recipe.calories}</p>

        <p>This is where a video get embedded</p>
        <YouTube
          videoId="7pSmhZFbCy0"
          opts={{height: '480', width:'720',playerVars:{autoplay: 0}}}
          onReady={this._onReady}
        />
        <h3>"Comment/Review this recipe"</h3>\
        <ReactDisqusComments
          shortname="example"
          identifier="something-unique-12345"
          title="Example Thread"
          url="http://www.example.com/example-thread"
          category_id="123456"
          onNewComment={this.handleNewComment}
        />
        <p>Created by {this.state.recipe.createdBy}</p>
      </div>
    );
  }
}
