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
      calories: '',
      servingSize: '',
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
  servingChangeHandle(event) {
    this.setState({
      serviingSize: event.target.value,
    });
  }
  calorieChangeHandle(event) {
    this.setState({
      calories: event.target.value,
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

        <h1>Create Recipe</h1>
        <label id="nameInput">Name</label>
        <input type="text" placeholder="Enter Recipe Name" className="form-control" id="titleInput" value={this.state.name} onChange={this.nameHandle}/>
        <label id="descriptionInput"><b>Description</b></label>
        <input type="text" placeholder="Enter Description" className="form-control" id="descriptionInput" value={this.state.description} onChange={this.descriptionHandle}/>
        <label> <b>Ingredients</b></label>
        {this.state.ingredients.map((ingredient, i) => {
          return(
          <div className="ingredientList">
            <input
               type="text"
               placeholder="Enter Next Ingredient"
               value={ingredient.name}
               onChange={this.handleIngredientChange(i)} />
             <button onClick={this.handleRemoveIngredient(i)} className="minusbtn">-</button>
          </div>
        )
         })}
         <button onClick={this.handleAddIngredient} className="btn">Add Ingredient</button>
         {this.state.steps.map((step, i) => {
           return(
           <div className="ingredientList">
           <input
                type="text"
                placeholder="Enter Next Step"
                value={step.step}
                onChange={this.handleStepChange(i)} />
              <button onClick={this.handleRemoveStep(i)} className="minusbtn">-</button>
           </div>
         )
          })}
          <button onClick={this.handleAddStep} className="btn">Add Step</button>
          <br></br>
          <label id="servingSizeInputLabel"><b>Recommended Serving Size: </b></label>
          <input type="text" placeholder="Enter Recommended Serving Size" id="servingSizeInput" value={this.state.servingSize} onChange={this.servingChangeHandle} />
          <br></br>
          <label id="calorieInputLabel"><b>Calories per Serving: </b></label>
          <input type="text" placeholder="Enter Calories per Serving" id="caloriesInput" value={this.state.calories} onChange={this.calorieChangeHandle} />
          <br></br>
          <button className="btn">Create Recipe</button>
      </div>
    );
  }
}
