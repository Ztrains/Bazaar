import React from 'react';
import { shallow } from 'enzyme';
import CreateRecipe from './createRecipe.js';

it('Renders without crashing', () => {
    const wrapper = shallow(<CreateRecipe />);
})