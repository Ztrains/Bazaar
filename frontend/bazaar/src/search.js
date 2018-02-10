import React from 'react';
import ReactDOM from 'react-dom';
import RecipeEntry from './recipeEntry.js';


export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsList: [],
    }
  }
  renderList() {
    let list = [];
    for (var i = 0; i < this.state.resultsList.length; i++) {
      list.push(
        <RecipeEntry name={this.state.resultsList[i].name} description={this.state.resultsList[i].description}/>
      );
    }
  }
  componentDidMount(){
    let terms = this.props.terms;
    //make database search call
  }
  render() {
    return(
        <div>
          {this.renderList()}
        </div>
    );
  }
}
