import React from 'react';
import { shallow, mount } from 'enzyme';
import NavBar from './navbar.js';
import { Link, MemoryRouter } from 'react-router-dom';
import SearchPage from './search.js';
import sinon from 'sinon';

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
  wrapper.find('#search').simulate('change', {target: {value: 'things'}});
  console.log(wrapper.state('searchBoxValue'));
  expect(wrapper.state('searchBoxValue')).toEqual('things');
});
it('button shows up after search box has stuff', () => {
  const wrapper = shallow(<NavBar />);
  wrapper.find('#search').simulate('change', {target: {value: 'test'}})
  console.log(wrapper.state('searchBoxValue'));
  expect(wrapper.exists(
                  <button type="button" className="btn btn-secondary" id='searchButton'>Search</button>
                 ));
});

it ('goes to search page', () => {
  const wrapper = shallow(<NavBar />);
  const input = {
    resultsList: [{name: "Zach", description: "Tasty"}],
    terms: 'dank memes' 
  };
  const wrap = shallow(<SearchPage {...input}/>);
  //sinon.spy(SearchPage.prototype, 'componentDidMount');
  wrapper.find('#search').simulate('change', {target: {value: 'things'}});
  console.log(wrapper.state('searchBoxValue'));
  wrapper.find('#search').simulate('keypress', {key: 'Enter'});
  //expect(SearchPage.prototype.componentDidMount.calledOnce).toEqual(true);
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

it('testing if search page actually reads in anything', () => {
  const spy = sinon.spy(SearchPage.prototype.componentWillReceiveProps);

  const wrapper = shallow(<SearchPage terms="memes"/>); 
  expect(spy.calledOnce).to.equal(false);
  wrapper.setProps({ foo: 'foo' });
  expect(spy.calledOnce).to.equal(true);
});
