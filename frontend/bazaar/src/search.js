import React from 'react';
import ReactDOM from 'react-dom';
import RecipeEntry from './recipeEntry.js';
import axios from 'axios';


export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsList: [],
      terms: '',
    };
  }
  renderList() {
    let list = [];
    for (var i = 0; i < this.state.resultsList.length; i++) {
      list.push(
        <RecipeEntry name={this.state.resultsList[i].name} description={this.state.resultsList[i].description}/>
      );
      return list;
    }
  }
  componentDidMount(){
    var _this = this;
    console.log(this.props.match.params.terms);
    axios.get("https://bazaar-408.herokuapp.com/search?q=" + this.props.match.params.terms)
    .then(function(result) {
      _this.setState({resultsList: result.data});
      console.log(result);
    });
    //make database search call
  }
  render() {
    return(
        <div>
          <h1 id="center">{"Search Query = " + this.props.match.params.terms}</h1>
          <br></br>
          {this.renderList()}
        </div>
    );
  }
}