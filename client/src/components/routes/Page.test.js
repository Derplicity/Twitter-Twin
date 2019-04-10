import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../testUtils';

import Component from './Page';

const setUp = () => {
	const enzymeWrapper = shallow(<Component />);
	return {
		enzymeWrapper,
	};
};

/* ********************
      PAGE ROUTER
******************** */
describe('<PageRouter />', () => {
	let wrapper;

	beforeEach(() => {
		const { enzymeWrapper } = setUp();

		wrapper = enzymeWrapper;
	});

	it('should render without errors', () => {
		expect(findByTestId(wrapper, 'PageRouter').length).toEqual(1);
	});

	it('should render child components', () => {
		expect(findByTestId(wrapper, 'HeaderView').length).toEqual(1);
		expect(findByTestId(wrapper, 'MainRoutes').length).toEqual(1);
		expect(findByTestId(wrapper, 'AsideRoutes').length).toEqual(1);
		expect(findByTestId(wrapper, 'FooterPresentator').length).toEqual(1);
	});
});
