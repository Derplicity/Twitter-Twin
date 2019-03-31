import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';
import UserCell from './UserCell';

describe('<UserCell>', () => {
	describe('Check PropTypes', () => {
		it('should not throw a warning', () => {
			const expectedProps = {
				user: {
					name: 'John',
					screen_name: 'johnsmith',
					verified: false,
					profile_image_url_https:
						'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
				},
				onUserClick: () => null,
				onFollowClick: () => null,
			};

			expect(checkProps(UserCell, expectedProps)).toBeUndefined();
		});
	});

	describe('With Valid Props', () => {
		let component;
		beforeEach(() => {
			const props = {
				user: {
					name: 'John',
					screen_name: 'johnsmith',
					verified: false,
					profile_image_url_https:
						'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
				},
				onUserClick: () => null,
				onFollowClick: () => null,
			};
			component = shallow(<UserCell {...props} />);
		});

		it('should render without errors', () => {
			const wrapper = findByTestId(component, 'userCellComponent');
			expect(wrapper.length).toBe(1);
		});
	});
});
