import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../testUtils';

import Component from './Aside';

const setUp = () => {
	const enzymeWrapper = shallow(<Component />);
	return {
		enzymeWrapper,
	};
};

/* ********************
     ASIDE ROUTES
******************** */
describe('<AsideRoutes />', () => {
	let wrapper;

	beforeEach(() => {
		const { enzymeWrapper } = setUp();

		wrapper = enzymeWrapper;
	});

	it('should render without errors', () => {
		expect(findByTestId(wrapper, 'AsideRoutes').length).toEqual(1);
	});

	it('should render correct number of routes', () => {
		expect(wrapper.find('Route').length).toEqual(1);
	});
});
