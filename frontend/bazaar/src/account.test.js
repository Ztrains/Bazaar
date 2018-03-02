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
