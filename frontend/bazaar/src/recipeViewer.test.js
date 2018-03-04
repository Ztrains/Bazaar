import React from 'react';
import { shallow } from 'enzyme';
import recipeViewer from './recipeViewer.js';
import toJson from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('Testing if recipeViewer correctly renders', () => {
    const wrapper = shallow(<recipeViewer/>);
    const fetched = true;

    expect(toJson(wrapper)).toMatchSnapshot();
});