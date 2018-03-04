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
      votes: 20,
      buttonDisabled: false,
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }
  componentDidMount() {
    //get recipe from id passed in through path
  }
  upvote() {
    if (this.state.buttonDisabled == true) {
      return;
    }
    let temp = this.state.votes;
    temp = temp + 1;
    this.setState({votes: temp});
    //send this to server
  }
  downvote() {
    if (this.state.buttonDisabled == true) {
      return;
    }
    let temp = this.state.votes;
    temp = temp - 1;
    this.setState({votes: temp});
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
        <h1>Recipe title</h1>
        <h2>Description</h2>
        <button onclick={this.upvote} disabled={this.state.buttonDisabled}>Upvote Button</button>
        <button onclick={this.downvote} disabled={this.state.buttonDisabled}>Downvote Button</button>
        <FacebookShareButton
          url="reddit.com"
          quote="Reddit">
          <FacebookIcon
            size={32}
            round
          />
          </FacebookShareButton>
        <ul>
          <li>"3 potatoes"</li>
          <li>"2 eggs"</li>
          <li>"1 onion"</li>
        </ul>
        <ul>
          <li>"Step 1"</li>
        </ul>

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
      </div>
    );
  }
}
