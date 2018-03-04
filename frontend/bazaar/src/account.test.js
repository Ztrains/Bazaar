import React from 'react';
import { shallow, mount } from 'enzyme';
import Profile from './account.js';
import Link from 'react-router-dom';

it('renders without crashing', () => {
  const wrapper = mount(<Profile />);
});

it('shows username', () => {
  const wrapper = shallow(<Profile />);
  console.log(wrapper.debug());
  expect(wrapper.find('#userNameBanner').text()).toEqual("Example test");
});

it('Correcly displays the updated username', () => {
  const wrapper = shallow(<Profile />);
  wrapper.find('username').simulate('change', {target: {value: "bitch"}});
  expect(wrapper.find('username').props().value).to.equal('bitch');
  console.log(wrapper.find('username').props().value);
});
