import React from 'react';
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
        <RecipeEntry id={this.state.resultsList[i].id} name={this.state.resultsList[i].name} description={this.state.resultsList[i].description} deleteBut={false}/>
      );
      return list;
    }
  }
  componentDidMount(){
    var _this = this;
    axios.post("https://bazaar-408.herokuapp.com/search?q=" + this.props.match.params.terms)
    .then(function(result) {
      if (!result.data || result.data.length < 1) {
        window.Materialize.toast("No recipes found based on query");
        return;
      }
      _this.setState({resultsList: result.data.data});
    }).catch((err) => {
		  window.Materialize.toast("Failed. Try again", 1500);
    });
    //make database search call
  }
  render() {
    return(
        <div className="container">
          <h1 className="headTitle center">{"You searched for "} <b>{this.props.match.params.terms}</b></h1>
          <br></br>
          {this.state.resultsList.map((recipe, key) => (
            <RecipeEntry key={key} id={recipe._id} name={recipe.name} description={recipe.description} deleteBut={false} calories={recipe.calories}/>
          ))}
        </div>
    );
  }
}
