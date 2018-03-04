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
    var _this = this;
    axios.get("https://bazaar-408.herokuapp.com/recipes")
    .then(function(result) {
      console.log(result);
      if (result === null) {
        alert("there is no data");

      }
      else {
      _this.setState({
        list: result.data,
      });
    }
    });
  }
  createList() {
    let newList = [];
    for (var i = 0; i < this.state.list.length; i++) {
      console.log(this.state.list[i]);
      newList.push(
        <div><RecipeEntry name={this.state.list[i].name} description={this.state.list[i].description}/></div>
      );
    }
    return newList;
  }
  render() {
    return(
      <div>


        <div>
          {this.state.list.map((item, index) => {
            return <RecipeEntry name={item.name} />
          })}
        </div>
        </div>
    );
  }
}
