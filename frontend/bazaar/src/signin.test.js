import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect }from 'chai';
import Signin from './signin.js';

it('Testing if it renders properly', () => {
    const wrapper = shallow(<Signin/>);
});

it('Checking Google login', () =>  {
    const wrapper = shallow(<Signin/>); 
    wrapper.find('#googleBtn').simulate('click');
    expect(wrapper.state().userObj).not.equal({});
});


it('Goes to signup when clicked', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Signin />);
    wrapper.find('#signUpBtn').simulate('click');
    expect(wrapper.exists(<h1></h1>));
});
    