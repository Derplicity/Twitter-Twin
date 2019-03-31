import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { findByTestId } from './testUtils';
import storeConfig from './storeConfig';

const setUp = (initialState = {}) => {
	const store = storeConfig(initialState);
	const component = shallow(<App store={store} />);
	return component;
};

describe('<App>', () => {
	let component;

	beforeEach(() => {
		const initialState = {
			user: {
				suggested_users: [
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
		const wrapper = findByTestId(component, 'appComponent');
		expect(wrapper.length).toBe(1);
	});
});
