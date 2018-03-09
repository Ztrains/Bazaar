import React from 'react';
import { shallow } from 'enzyme';
import CreateRecipe from './createRecipe.js';
import { expect } from 'chai';

it('Renders without crashing', () => {
    const wrapper = shallow(<CreateRecipe />);
    expect(wrapper.find('#createRecipeBtn'));
});

it('Testing if values update for title', () => {
    const wrapper = shallow(<CreateRecipe />);
    wrapper.find('#titleInput').simulate('change', {target: {value: 'things'}});
    expect(wrapper.state('name')).equal('things');
    console.log(wrapper.state('name'));
});


it('Testing if values update for title', () => {
    const wrapper = shallow(<CreateRecipe />);
    wrapper.find('#descriptionInput').simulate('change', {target: {value: 'its very tastey'}});
    expect(wrapper.state('description')).equal('its very tastey');
    console.log(wrapper.state('description'));
});


it('Testing if values update for Ingredients', () => {
    const wrapper = shallow(<CreateRecipe />);
    wrapper.find('#quantField').simulate('change', {target: {value: '42'}});
    wrapper.find('#nameField').simulate('change', {target: {value: 'twinkies'}});
    const testDish = [{
        name: "twinkies",
        quantity: "42"
    }];
    expect(wrapper.state().ingredients[0].name).equal(testDish[0].name);
    expect(wrapper.state().ingredients[0].quantity).equal(testDish[0].quantity);
    console.log(wrapper.state('ingredients'));
});

it('Testing if another add recipe field is created', () => {
    const wrapper = shallow(<CreateRecipe />);
    wrapper.find('#quantField').simulate('change', {target: {value: '42'}});
    wrapper.find('#nameField').simulate('change', {target: {value: 'twinkies'}});
    wrapper.find('#ingredientBtn').simulate('click');
    expect(wrapper.find('#quantField')).to.have.length(2); 
});

it('Testing adding steps', () => {
    const wrapper = shallow(<CreateRecipe />);
    wrapper.find('#stepInfo').simulate('change', {target: {value: 'Dont pull a ryan'}});
    expect(wrapper.state().steps[0].step).equal('Dont pull a ryan');
    console.log(wrapper.state('steps'));
});

it('Testing adding step fields', () => {
    const wrapper = shallow(<CreateRecipe />);
    wrapper.find('#stepInfo').simulate('change', {target: {value: 'Dont pull a ryan'}});
    wrapper.find('#stepBtn').simulate('click');
    expect(wrapper.find('#stepInfo')).to.have.length(2); 
});

it('Testing if values update for Recommended Serving Size', () => {
    const wrapper = shallow(<CreateRecipe />);
    wrapper.find('#servingSizeInput').simulate('change', {target: {value: '50'}});
    expect(wrapper.state('servingSize')).equal('50');
    console.log(wrapper.state('servingSize'));
});

it('Testing if values update for Calories per Serving', () => {
    const wrapper = shallow(<CreateRecipe />);
    wrapper.find('#caloriesInput').simulate('change', {target: {value: '4565'}});
    expect(wrapper.state('calories')).equal('4565');
    console.log(wrapper.state('calories'));
});

it('Testing if values update for pref', () => {
    const wrapper = shallow(<CreateRecipe />);
    wrapper.find('#prefs').simulate('change', {target: {value: "Vegan"}});
    expect(wrapper.state().value).equal("Vegan");
    console.log(wrapper.state('value'));
});

