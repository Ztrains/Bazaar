import React from 'react';
import { shallow, mount } from 'enzyme';
import Profile from './account.js';
import Link from 'react-router-dom';
import sinon from 'sinon';
import localStorage from 'mock-local-storage';
/*
Decided to test manually
describe("lets go boys", () => {

it('renders without crashing', () => {
  let props = {
    username: "Gay",
    preferences: ["still gay"],
    value: "still gay",
    newName: "bob rooss",
    email: "memer420@gmail.com",
    phoneNum:"69696",
    userObj: {},
    emailDayPref: '1day',
    transportMethod: 'text',
  };
  const onSubmit = sinon.spy();
  global.window = {};
  window.localStorage = global.localStorage;
const wrapper = shallow(<Profile username="gayboy"/>);
  wrapper.update();
});

it('shows username', () => {
  const wrapper = shallow(<Profile />);
  console.log(wrapper.debug());
  expect(wrapper.find('#userNameBanner').text()).toEqual("Example test");
});

it('Correcly displays the updated username', () => {
  const wrapper = shallow(<Profile />);
  wrapper.find('username').simulate('change', {target: {value: "test"}});
  expect(wrapper.find('username').props().value).to.equal('test');
  console.log(wrapper.find('username').props().value);
});
});*/