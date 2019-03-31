import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import { findByTestId } from '../../testUtils';
import storeConfig from '../../storeConfig';

const setUp = (initialState = {}) => {
	const store = storeConfig(initialState);
	const component = shallow(<Home store={store} />)
		.childAt(0)
		.dive();
	return component;
};

describe('<Home>', () => {
	let component;

	beforeEach(() => {
		const initialState = {
			status: {
				home_timeline: [
					{
						name: 'John',
						screen_name: 'johnsmith',
						profile_image_url_https:
							'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
						verified: true,
					},
					{
						name: 'Adam',
						screen_name: 'adamwright',
						profile_image_url_https:
							'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
						verified: false,
					},
				],
			},
		};
		component = setUp(initialState);
	});

	it('should render without errors', () => {
		const wrapper = findByTestId(component, 'homeComponent');
		expect(wrapper.length).toBe(1);
	});
});
