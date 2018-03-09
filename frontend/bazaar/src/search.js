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
    console.log(this.state.resultsList);
    for (var i = 0; i < this.state.resultsList.length; i++) {
      list.push(
        <RecipeEntry id={this.state.resultsList[i].id} name={this.state.resultsList[i].name} description={this.state.resultsList[i].description} deleteBut={false}/>
      );
      return list;
    }
  }
  componentDidMount(){
    var _this = this;
    console.log(this.props.match.params.terms);
    axios.post("https://bazaar-408.herokuapp.com/search?q=" + this.props.match.params.terms)
    .then(function(result) {
      if (!result.data || result.data.length < 1) {
        alert("No recipes found based on query");
        return;
      }
      _this.setState({resultsList: result.data.data});
      console.log(_this.state.resultsList);
    });
    //make database search call
  }
  render() {
    return(
        <div>
          <h1 id="center">{"Search Query = " + this.props.match.params.terms}</h1>
          <br></br>
          {this.state.resultsList.map((recipe, key) => (
            <RecipeEntry id={recipe._id} name={recipe.name} description={recipe.description} deleteBut={false} calories={recipe.calories}/>
          ))}
        </div>
    );
  }
}
