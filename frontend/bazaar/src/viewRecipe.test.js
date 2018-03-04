import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import ViewRecipe from './viewRecipe';

it('Checking to make sure the upvote/downvote button changes are properly shwon', () => {
    //Add the proper finding once the upvote/downvote number is added
    const wrapper = shallow(<ViewRecipe />);
    wrapper.find('').simulate('change', {target: {value: '69'}});
    expect(wrapper.find('').props().value).to.equal('69');
    console.log(wrapper.find('').props().value);
});