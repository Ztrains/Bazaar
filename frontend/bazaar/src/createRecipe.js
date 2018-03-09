import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'
import {Row, Input} from 'react-materialize'
import history from './history.js';

export default class viewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      ingredients: [{name: '', quantity: ''}],
      steps: [{step: ''}],
      imageURL: '',
      calories: '',
      servingSize: '',
      preferences: [],
      value: '',
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
  servingChangeHandle = (event) => {
    this.setState({
      servingSize: event.target.value,
    });
  }
  calorieChangeHandle = (event) => {
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
  handleQuantityChange = (i) => (evt) => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (i !== sidx) return ingredient;
      return { ...ingredient, quantity: evt.target.value };
    });

    this.setState({ ingredients: newIngredients });
  }

  handleAddIngredient = () => {
    if (this.state.steps.length > 0 && this.state.ingredients[this.state.ingredients.length - 1].name == '') {
      return;
    }
    this.setState({
      ingredients: this.state.ingredients.concat([{ name: '', quantity: '' }])
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
    if (this.state.steps.length > 0 && this.state.steps[this.state.steps.length - 1].step == '') {
      return;
    }
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
  addPref = (event) => {
    console.log(event.target.value);
    this.setState({value: event.target.value});
    var newList = this.state.preferences;
    newList.push(this.state.value);
    this.setState({preferences: newList});
  }

  submit = () => {
    var Obj = {
      accessToken: window.sessionStorage.getItem('token'),
      recipe: {
        name: this.state.name,
        description: this.state.description,
        ingredients: this.state.ingredients,
        steps: this.state.steps,
        calories: this.state.calories,
        servingSize: this.state.servingSize,
        tags: this.state.preferences,
        createdBy: window.sessionStorage.getItem('loggedInName'),
        votes: 0
      }
    }
    axios.post("https://bazaar-408.herokuapp.com/recipes/new", Obj)
    .then(function(results) {
      console.log(results);
      alert("recipe successfully created");
      history.push("/recipe/" + results._id);
    });
  }
  render() {
    return(
      <div className="container">
        <h3>Create Recipe</h3>
        <label id="nameInput">Name</label>
        <input type="text" placeholder="Enter Recipe Name" className="form-control" id="titleInput" value={this.state.name} onChange={this.nameHandle}/>
        <label id="descriptionInputH"><b>Description</b></label>
        <input type="text" placeholder="Enter Description" className="form-control" id="descriptionInput" value={this.state.description} onChange={this.descriptionHandle}/>
        <br></br>
        <label> <b>Ingredients: </b></label>
        <br></br>
        {this.state.ingredients.map((ingredient, i) => {
          return(
          <div className="ingredientList" id="ingredientList">
            <div className="input-field">
            <input
              type="text"
              id="quantField"
              placeholder="enter quanity of ingredient"
              value={ingredient.quantity}
              onChange={this.handleQuantityChange(i)}
            />
            </div>
            <div className="input-field">
            <input
               type="text"
               id="nameField"
               placeholder="Enter Next Ingredient"
               value={ingredient.name}
               onChange={this.handleIngredientChange(i)} />
            </div>
             <button onClick={this.handleRemoveIngredient(i)} className="minusbtn" id="minusbtn">-</button>
          </div>
        )
         })}
         <br></br>
         <button onClick={this.handleAddIngredient} id ="ingredientBtn" className="btnsmall">Add Ingredient</button>
         <br></br><br></br>
         <label> <b>Steps: </b></label>
         <br></br>
         {this.state.steps.map((step, i) => {
           return(
           <div className="ingredientList">
           <div className="input-field">
           <input
                type="text"
                placeholder="Enter Next Step"
                id="stepInfo"
                value={step.step}
                onChange={this.handleStepChange(i)} />
              <button onClick={this.handleRemoveStep(i)} className="minusbtn">-</button>
              </div>
           </div>
         )
          })}
          <br></br>
          <button onClick={this.handleAddStep} id="stepBtn" className="btnsmall">Add Step</button>
          <br></br>
          <br></br>
          <label id="servingSizeInputLabel"><b>Recommended Serving Size </b></label>
          <input type="text" placeholder="Enter Recommended Serving Size" id="servingSizeInput" value={this.state.servingSize} onChange={this.servingChangeHandle} />
          <br></br>
          <label id="calorieInputLabel"><b>Calories per Serving </b></label>
          <input type="text" placeholder="Enter Calories per Serving" id="caloriesInput" value={this.state.calories} onChange={this.calorieChangeHandle} />
          <br></br>
          <br></br>
          <label id="preferencesInput"><b>Dish Tags</b></label>
          <ul>
            {this.state.preferences.map((prefValue, key) => (
              <li>{prefValue}</li>
            ))}
            <Row>
              <Input id="prefs" type='select' value={this.state.value} onChange={this.addPref} defaultValue='0'>
                <option value=""></option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Lactose-Free">Lactose-Free</option>
                <option value="Low Carb">Low Carb</option>
                <option value="Paleo">Paleo</option>
              </Input>
            </Row>
          </ul>
          <button id="createRecipeBtn" onClick={this.submit} className="btn-success">Create Recipe</button>
      </div>
    );
  }
}
