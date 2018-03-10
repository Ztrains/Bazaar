import React from 'react';
import { shallow, mount } from 'enzyme';
import RecipeEntry from './recipeEntry.js';
import localStorage from 'mock-local-storage';
import { expect } from 'chai';

describe("RecipeEntry Tests", () => {
    beforeEach(() => {
        global.window = {token:'686',email:'gaylord@cs.com'};
        window.localStorage = global.localStorage;
    }); 

    it("renders without crashing", () => {
        const wrapper = shallow(<RecipeEntry />);
    });

    it("Testing to make sure items dont appear if not logged in", () => {
        const wrapper = shallow(<RecipeEntry />);
        expect(wrapper.exists('#noBtn')).equal(true);
    });

    it("Testing to make sure items appear when they should", () => {
        const wrapper = shallow(<RecipeEntry />);
        wrapper.setState({showCalOptions: true});
        console.log(wrapper.state().showCalOptions);
        expect(wrapper.find('#day').exists()).equal(true);
    });

    it("Testing adding to meal calendar", () => {
        const wrapper = shallow(<RecipeEntry />);
        wrapper.setState({showCalOptions: true});
        wrapper.find('#timeVal').simulate('change', {target: {value: 'Lunch'}});
        wrapper.find('#day').simulate('change', {target: {value: 'Monday'}});
        console.log(wrapper.state().dayValue);
        console.log(wrapper.state().timeValue);
        expect(wrapper.state().dayValue).equal('Monday');
        expect(wrapper.state().timeValue).equal('Lunch');
    });
});