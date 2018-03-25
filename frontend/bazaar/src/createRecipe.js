import React from 'react';
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
      calories: 0,
      servingSize: '',
      preferences: [],
      value: '',
      step: 1,
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
    if (this.state.ingredients.length > 0 && this.state.ingredients[this.state.ingredients.length - 1].name === '') {
      window.Materialize.toast('Ingredient field not filled', 1500);
      return;
    }
    if (this.state.ingredients.length > 0 && this.state.ingredients[this.state.ingredients.length - 1].quantity === '') {
      window.Materialize.toast("Quantity field not filled", 1500);
      return;
    }
    this.setState({
      ingredients: this.state.ingredients.concat([{ name: '', quantity: '' }])
    });
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

    let temp = this.state.step;
    this.setState({step: temp + 1});
    this.setState({buttonDisabled: true});
  }

  handleRemoveStep = (i) => () => {
    this.setState({
      steps: this.state.steps.filter((s, sidx) => i !== sidx)
    });
  }
  addPref = (event) => {
    this.setState({value: event.target.value});
    var newList = this.state.preferences;
    newList.push(this.state.value);
    this.setState({preferences: newList});
  }
  removeTag = () => {
    if (this.state.preferences.length === 0) {
      return;
    }
    var list = this.state.preferences;
    list.splice(0, 1);
    this.setState({preferences: list});
  }
  submit = () => {
    if (this.state.name.length < 1) {
      window.Materialize.toast("Recipe must have name", 1500);
      return;
    }
    if (this.state.description.length < 1) {
      window.Materialize.toast("Recipe must have a description", 1500);
      return;
    }
    if (this.state.ingredients.length < 1 || (this.state.ingredients.length === 1 && (this.state.ingredients[0].name === '' || this.state.ingredients[0].description === ''))) {
      window.Materialize.toast("Recipe must have ingedients", 1500);
      return;
    }
    if (this.state.steps.length < 1 || (this.state.steps.length === 1 && this.state.steps[0].step === '')) {
      window.Materialize.toast("Recipe must have steps", 1500);
      return;
    }
    if (this.state.calories.length < 1) {
      window.Materialize.toast("Recipe must have a calorie count", 1500);
      return;
    }
    if (this.state.servingSize.length < 1) {
      window.Materialize.toast("Recipe must have a recommended serving size", 1500);
      return;
    }
    if (isNaN(this.state.calories)) {
      window.Materialize.toast("The calorie count must be a number", 1500);
    }
    var Obj = {
      accessToken: window.sessionStorage.getItem('token'),
      recipe: {
        name: this.state.name,
        description: this.state.description,
        ingredients: this.state.ingredients,
        steps: this.state.steps,
        calories: parseInt(this.state.calories, 10),
        servingSize: this.state.servingSize,
        tags: this.state.preferences,
        createdBy: window.sessionStorage.getItem('loggedInName'),
        votes: 0
      }
    }
    axios.post("https://bugged-backend.herokuapp.com/recipes/new", Obj)
    .then(function(results) {
      window.Materialize.toast("Failed. Try again", 1500);
      history.push("/recipes/" + results.data.recipe._id);
    })
    .catch((err) => {
		  window.Materialize.toast("Failed. Try again", 1500);
    });
  }
  render() {
    return(
      <div className="container">
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="card-action center">
              <h1><b>Create Recipe</b></h1>
            </div>
            <hr />
            <br></br>
            <div className="container center">
              <div className="input-field">
                <label id="nameInput">Name</label>
                <input type="text"  className="form-control" id="titleInput" value={this.state.name} onChange={this.nameHandle}/>
              </div>
              <div className="input-field">
                <label id="descriptionInputH"><b>Description</b></label>
                <input type="text" className="form-control" id="descriptionInput" value={this.state.description} onChange={this.descriptionHandle}/>
              </div>
            </div>
            <hr />
            <div className="container">
              <h4><b>Ingredients </b></h4>
              <br />
            </div>




            {this.state.ingredients.map((ingredient, i) => {
              return(
            <div key={i} className="row">
            <div className="container center" id="ingredientList">
              <div className="col s4">
                <div className="input-field">
                    <label> <b>Ingredient </b></label>
                  <input
                    type="text"
                    id="quantField"
                    placeholder="Enter Quantity"
                    value={ingredient.quantity}
                    onChange={this.handleQuantityChange(i)}
                    />
                </div>
              </div>
              <div className="col s6">
                <div className="input-field">
                  <input
                    type="text"
                    id="nameField"
                    placeholder="Enter Next Ingredient"
                    value={ingredient.name}
                    onChange={this.handleIngredientChange(i)} />
                </div>
              </div>
              <div className="col s2">
                <div className="input-field">
                  <button className="waves-effect waves-light btn red accent-2" onClick={this.handleRemoveIngredient(i)} id="minusbtn"><b>X</b></button>
                </div>
              </div>
              </div>
            </div>
            )
          })}
          <div className="row">
         <div className="container center">
          <button onClick={this.handleAddIngredient} id ="ingredientBtn" className="waves-effect waves-light btn red accent-2"><b>Add Ingredient</b></button>
        </div>

        </div>
        <hr />
        <div className="container">
          <h4><b>Steps </b></h4>
          <br />
        </div>

         {this.state.steps.map((step, i) => {
           return(
            <div key={i} className="row">
              <div className="container" id="ingredientList">
                <div className="col s1">

                  <p id="stepLister">{i + 1}.</p>
                </div>
                <div className="col s9">
                  <div className="input-field center">
                     <label> <b>Step </b></label>
                    <input
                      type="text"

                      id="stepInfo"
                      value={step.step}
                      onChange={this.handleStepChange(i)} />
                  </div>
                  </div>
                  <div className="col s2">
                    <div className="input-field center">
                      <button onClick={this.handleRemoveStep(i)} className="waves-effect waves-light btn red accent-2" id="minusbtn"><b>X</b></button>
                    </div>
                  </div>
              </div>
           </div>

         )
          })}
          <div className="row">
            <div className="container center">
              <button onClick={this.handleAddStep} id="stepBtn" className="waves-effect waves-light btn red accent-2"><b>Add Step</b></button>
            </div>
          </div>
          <hr />
          <div className="container">
            <h4><b>Additional Information </b></h4>
            <br />
          </div>
          <div className="row">
            <div className="container">
              <div className="input-field">
                <label id="servingSizeInputLabel"><b>Recommended Serving Size </b></label>
                <input type="text" id="servingSizeInput" value={this.state.servingSize} onChange={this.servingChangeHandle} />
              </div>
              <div className="input-field">
                <label id="calorieInputLabel"><b>Calories per Serving </b></label>
                <input type="text" id="caloriesInput" onChange={this.calorieChangeHandle} />
              </div>
            </div>
          </div>
          <hr />
          <div className="container">
            <h4 id="preferencesInput"><b>Dish Tags</b></h4>
            <ul>

              {this.state.preferences.map((prefValue, key) => (
                <a key={key} className="btn disabled">{prefValue}</a>
              ))}
                <Row>
                  <Input id="prefs" type='select' onChange={this.addPref} defaultValue='0'>
                    <option value=""></option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Lactose-Free">Lactose-Free</option>
                    <option value="Low Carb">Low Carb</option>
                    <option value="Paleo">Paleo</option>
                  </Input>
                </Row>
              <div className="row">
                <button className="waves-effect waves-light btn red accent-2" onClick={this.removeTag}>Remove Last Tag</button>
              </div>
            </ul>

            </div>
            <div className="container center">
              <button id="createRecipeBtn" onClick={this.submit} className="waves-effect waves-light btn red accent-2"><b>Create Recipe</b></button>
            </div>

          <br></br>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
