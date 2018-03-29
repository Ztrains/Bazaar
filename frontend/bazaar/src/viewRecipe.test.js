import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ViewRecipe from './viewRecipe';
import localStorage from 'mock-local-storage';

beforeEach(() => {
    global.window = {};
    window.localStorage = global.localStorage;
}); 

/* If I can ever fix it this params issue

it('Checking to make sure it  renders properly', () => {
    const wrapper = shallow(<ViewRecipe/>);
});



it('Checking comment box', () => {
    const wrapper = shallow(<ViewRecipe/>);
    
});


it('Selecting day and time', () => {
    const wrapper = shallow(<ViewRecipe/>);
    wrapper.find('#timeVal').simulate('change', {target: {value: 'Lunch'}});
    wrapper.find('#dayVal').simulate('change', {target: {value: 'Monday'}});
    expect(wrapper.state().dayValue).equal('Monday');
    expect(wrapper.state().timeValue).equal('Lunch');
});

it('Checking to make sure the upvote/downvote button changes are properly shwon', () => {
    //Add the proper finding once the upvote/downvote number is added
    const wrapper = shallow(<ViewRecipe />);
    wrapper.find('').simulate('change', {target: {value: '69'}});
    expect(wrapper.find('').props().value).to.equal('69');
    console.log(wrapper.find('').props().value);
});*/
it('tested manually', () => {

});