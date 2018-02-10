import React from 'react';
import ReactDOM from 'react-dom';
import RecipeEntry from './recipeEntry.js';


export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsList: [],
      terms: '',
    }
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
    console.log(this.props.match.params.terms);
    //make database search call
  }
  render() {
    return(
        <div>
          <h1>dsf</h1>
          <h1>sdfsd</h1>
          <h1>{this.props.match.params.terms}</h1>
          //<div>
          //  {this.renderList()}
          //</div>
        </div>
    );
  }
}
