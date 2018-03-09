import React from 'react';
import Signup from './signup.js';
import Signin from './signin.js';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

it('renders correctley', () => {
    const wrapper = shallow(<Signup/>);
});

it('Checking to make sure username is properly updated', () => {
    const wrapper = shallow(<Signup />);
    wrapper.find('#username').simulate('change', {target: {value:'Thebest'}});
    console.log(wrapper.state().username);
    expect(wrapper.state().username).equal('Thebest');
});

it('Checking Google login', () =>  {
    const wrapper = shallow(<Signup/>);
    wrapper.find('#username').simulate('change', {target: {value:'Thebest'}});    
    wrapper.find('#googleBtn').simulate('click');
    expect(wrapper.state().userObj).not.equal({});
});
