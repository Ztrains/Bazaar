import React from 'react'
import './index.css'
import RecipeEntry from './recipeEntry';
import axios from 'axios';

export default class RecipeViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }
  componentDidMount() {
    axios.get("/recipes")
    .then(function(result) {
      this.setState({
        list: result.data,
      });
      console.log(this.state.list);
    })
  }
  createList() {
    let newList = [];
    for (var i = 0; i < this.state.list.length; i++) {
      newList.push(
        <RecipeEntry name={this.state.resultsList[i].name} description={this.state.resultsList[i].description}/>
      );
    }
    return newList;
  }
  render() {
    return(
      <div className="list-group">
        {this.createList}
      </div>
    );
  }
}
