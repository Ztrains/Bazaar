import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

export default class viewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      ingredients: [{name: ''}],
      steps: [{step: ''}],
      imageURL: '',
    };
    this.nameHandle = this.nameHandle.bind(this);
    this.descriptionHandle = this.descriptionHandle.bind(this);
    //this.handleAddIngredient = this.handleAddIngredient.bind(this);
    //this.handleIngredientChange = this.handleIngredientChange.bind(this);
    //this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
  }

  nameHandle(event) {
    this.setState({
      name: event.target.value,
    });
  }
  descriptionHandle(event) {
    this.setState({
      description: event.target.value,
    });
  }
  handleIngredientChange = (i) => (evt) => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (i !== sidx) return ingredient;
      return { ...ingredient, name: evt.target.value };
    });

    this.setState({ ingredients: newIngredients });
  }

  handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ name: '' }])
    });
    console.log(this.state.ingredients);
  }

  handleRemoveIngredient = (i) => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => i !== sidx)
    });
  }
  handleStepChange = (i) => (evt) => {
    const newSteps = this.state.steps.map((step, sidx) => {
      if (i !== sidx) return step;
      return { ...step, step: evt.target.value };
    });

    this.setState({ steps: newSteps });
  }

  handleAddStep = () => {
    this.setState({
      steps: this.state.steps.concat([{ step: '' }])
    });
    console.log(this.state.steps);
  }

  handleRemoveStep = (i) => () => {
    this.setState({
      steps: this.state.steps.filter((s, sidx) => i !== sidx)
    });
  }
  render() {
    return(
      <div className="container">

        <h1>"Submit a new recipe"</h1>
        <label id="nameInput">Name</label>
        <input type="text" placeholder="Enter Recipe Name" className="form-control" id="titleInput" value={this.state.name} onChange={this.nameHandle}/>
        <label id="descriptionInput"><b>Description</b></label>
        <input type="text" placeholder="Enter Description" className="form-control" id="descriptionInput" value={this.state.description} onChange={this.descriptionHandle}/>
        <label> <b>Inregdients</b></label>
        {this.state.ingredients.map((ingredient, i) => {
          return(
          <div>
          <input
               type="text"
               placeholder="Ingredient #{i} name"
               value={ingredient.name}
               onChange={this.handleIngredientChange(i)} />
             <button onClick={this.handleRemoveIngredient(i)} className="btn">-</button>
          </div>
        )
         })}
         <button onClick={this.handleAddIngredient} className="btn">Add Ingredient</button>
         {this.state.steps.map((step, i) => {
           return(
           <div>
           <input
                type="text"
                placeholder="next Step"
                value={step.step}
                onChange={this.handleStepChange(i)} />
              <button onClick={this.handleRemoveStep(i)} className="btn">-</button>
           </div>
         )
          })}
          <button onClick={this.handleAddStep} className="btn">Add Step</button>
          <button className="btn">Create Recipe</button>
      </div>
    );
  }
}
