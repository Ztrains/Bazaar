import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import Signin from './signin.js';

it('simulating click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Signin />);
    wrapper.find('.signinbtn').simulate('click');
    expect(wrapper.exists(<h1></h1>));
});
    