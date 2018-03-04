import React from 'react';
import { shallow, mount } from 'enzyme';
import NavBar from './navbar.js';
import Link from 'react-router-dom';

it('renders without crashing', () => {
  const wrapper = shallow(<NavBar />);
});
it('renders mount without crashing', () => {
  const wrapper = shallow(<NavBar />);
  expect(wrapper.exists(<form className="form-inline"></form>));
});
it('does not render button when no value in search bar', () => {
  const wrapper = shallow(<NavBar />);
  expect(wrapper.exists(<div id="noButton"></div>));
});
it ('search box works', () => {
  const wrapper = shallow(<NavBar />);
  wrapper.find('#searchInput').first().prop('onChange')({target: {value: 'things'}});
  console.log(wrapper.state('searchBoxValue'));
  expect(wrapper.state('searchBoxValue')).toEqual('things');
});
it('button shows up after search box has stuff', () => {
  const wrapper = shallow(<NavBar />);
  wrapper.find('#searchInput').first().prop('onChange')({target: {value: 'things'}});
  console.log(wrapper.state('searchBoxValue'));
  expect(wrapper.exists(
                  <button type="button" className="btn btn-secondary" id='searchButton'>Search</button>
                 ));
});
it ('goes to search page', () => {
  const wrapper = shallow(<NavBar />);
  wrapper.find('#searchInput').first().prop('onChange')({target: {value: 'things'}});
  console.log(wrapper.state('searchBoxValue'));
  wrapper.find('#loginButton').simulate('click');
  expect(wrapper.exists(<h1>dsf</h1>));
});

it ('does not render profile button is not logged in',() => {
  const wrapper = shallow(<NavBar />);
  expect(wrapper.find("#profileButton").exists()).toEqual(false);
});

it('renders profile when logged in', () => {
  const wrapper = shallow(<NavBar />);
  wrapper.setProps({loggedInState: true, currUser: "things"});
  expect(wrapper.find("#profileButton").exists()).toEqual(true);

});
