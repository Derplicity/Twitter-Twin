import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

import { findByTestId } from '../../testUtils';

const setUp = (props = {}) => {
	const component = shallow(<Footer {...props} />);
	return component;
};

describe('<Footer>', () => {
	let component;

	beforeEach(() => {
		component = setUp();
	});

	it('should render without errors', () => {
		const wrapper = findByTestId(component, 'footerComponent');
		expect(wrapper.length).toBe(1);
	});

	it('should render all links', () => {
		const links = findByTestId(component, 'footerLink');
		expect(links.length).toBe(4);
	});
});
