import React from 'react';
import { shallow } from 'enzyme';
import UserList from './UserList';

import { findByTestId } from '../../testUtils';

const setUp = (props = {}) => {
	const component = shallow(<UserList.WrappedComponent {...props} />);
	return component;
};

describe('<UserList>', () => {
	describe('With Valid Props', () => {
		let component;

		beforeEach(() => {
			const props = {
				list: [
					{
						name: 'John',
						screen_name: 'johnsmith',
						profile_image_url_https:
							'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
						verified: true,
					},
					{
						name: 'Lisa',
						screen_name: 'lisamoore',
						profile_image_url_https:
							'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
						verified: true,
					},
					{
						name: 'Sam',
						screen_name: 'samrock',
						profile_image_url_https:
							'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
						verified: false,
					},
					{
						name: 'George',
						screen_name: 'georgemill',
						profile_image_url_https:
							'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
						verified: false,
					},
				],
				count: 3,
			};

			component = setUp(props);
		});

		it('should render without errors', () => {
			const wrapper = findByTestId(component, 'userListComponent');
			expect(wrapper.length).toBe(1);
		});

		it('should render [count] user cells', () => {
			const userCells = findByTestId(component, 'userCellComponent');
			expect(userCells.length).toBe(3);
		});

		it('should render link button', () => {
			const linkButton = findByTestId(component, 'userListLink');
			expect(linkButton.length).toBe(1);
		});
	});

	describe('With Invalid Props', () => {
		let component;

		beforeEach(() => {
			const props = {
				list: [],
				count: 0,
			};

			component = setUp(props);
		});

		it('should not render', () => {
			const wrapper = findByTestId(component, 'userListComponent');
			expect(wrapper.length).toBe(0);
		});

		describe('With Invalid List', () => {
			beforeEach(() => {
				const props = {
					list: [],
					count: 3,
				};

				component = setUp(props);
			});

			it('should not render', () => {
				const wrapper = findByTestId(component, 'userListComponent');
				expect(wrapper.length).toBe(0);
			});
		});

		describe('With Invalid Count', () => {
			beforeEach(() => {
				const props = {
					list: [
						{
							name: 'John',
							screen_name: 'johnsmith',
							profile_image_url_https:
								'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
							verified: true,
						},
						{
							name: 'Lisa',
							screen_name: 'lisamoore',
							profile_image_url_https:
								'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
							verified: true,
						},
						{
							name: 'Sam',
							screen_name: 'samrock',
							profile_image_url_https:
								'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
							verified: false,
						},
						{
							name: 'George',
							screen_name: 'georgemill',
							profile_image_url_https:
								'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
							verified: false,
						},
					],
					count: 0,
				};

				component = setUp(props);
			});

			it('should not render', () => {
				const wrapper = findByTestId(component, 'userListComponent');
				expect(wrapper.length).toBe(0);
			});
		});
	});

	describe('Without Props', () => {
		let component;

		beforeEach(() => {
			component = setUp();
		});

		it('should not render', () => {
			const wrapper = findByTestId(component, 'userListComponent');
			expect(wrapper.length).toBe(0);
		});
	});
});
