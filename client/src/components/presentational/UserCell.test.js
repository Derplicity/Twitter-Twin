import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';
import UserCell from './UserCell';

const setUp = (props = {}) => {
	const component = shallow(<UserCell {...props} />);
	return component;
};

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
				onUserClick: jest.fn(),
				onFollowClick: jest.fn(),
			};

			expect(checkProps(UserCell, expectedProps)).toBeUndefined();
		});
	});

	describe('With Valid Props', () => {
		let component;
		let onUserClickMock;
		let onFollowClickMock;

		beforeEach(() => {
			onUserClickMock = jest.fn();
			onFollowClickMock = jest.fn();
			const props = {
				user: {
					name: 'John',
					screen_name: 'johnsmith',
					verified: true,
					profile_image_url_https:
						'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
				},
				onUserClick: onUserClickMock,
				onFollowClick: onFollowClickMock,
			};
			component = setUp(props);
		});

		it('should render without errors', () => {
			const wrapper = findByTestId(component, 'userCellComponent');
			expect(wrapper.length).toBe(1);
		});

		it('should render link wrapper', () => {
			const linkWrapper = findByTestId(component, 'userCellLinkWrapper');
			expect(linkWrapper.length).toBe(1);
		});

		it('should render image', () => {
			const image = findByTestId(component, 'userCellImage');
			expect(image.length).toBe(1);
		});

		it('should render link', () => {
			const link = findByTestId(component, 'userCellLink');
			expect(link.length).toBe(1);
		});

		it('should render button', () => {
			const button = findByTestId(component, 'userCellButton');
			expect(button.length).toBe(1);
		});

		describe('Link Wrapper', () => {
			it('should emit a click event', () => {
				const linkWrapper = findByTestId(component, 'userCellLinkWrapper');

				linkWrapper.simulate('click');
				expect(onUserClickMock.mock.calls.length).toEqual(1);
			});
		});

		describe('Button', () => {
			it('should emit a click event', () => {
				const button = findByTestId(component, 'userCellButton');

				button.simulate('click');
				expect(onFollowClickMock.mock.calls.length).toEqual(1);
			});
		});

		describe('Is Verified', () => {
			beforeEach(() => {
				const props = {
					user: {
						name: 'John',
						screen_name: 'johnsmith',
						verified: true,
						profile_image_url_https:
							'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
					},
					onUserClick: jest.fn(),
					onFollowClick: jest.fn(),
				};
				component = setUp(props);
			});

			it('should be verified', () => {
				const verified = findByTestId(component, 'userCellVerified');
				expect(verified.length).toBe(1);
			});
		});

		describe('Is Not Verified', () => {
			beforeEach(() => {
				const props = {
					user: {
						name: 'John',
						screen_name: 'johnsmith',
						verified: false,
						profile_image_url_https:
							'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
					},
					onUserClick: jest.fn(),
					onFollowClick: jest.fn(),
				};
				component = setUp(props);
			});

			it('should not be verified', () => {
				const verified = findByTestId(component, 'userCellVerified');
				expect(verified.length).toBe(0);
			});
		});
	});

	describe('With Invalid Props', () => {
		let component;

		beforeEach(() => {
			const props = {
				user: null,
				onUserClick: jest.fn(),
				onFollowClick: jest.fn(),
			};
			component = setUp(props);
		});

		it('should not render', () => {
			const wrapper = findByTestId(component, 'userCellComponent');
			expect(wrapper.length).toBe(0);
		});
	});

	describe('Without Props', () => {
		let component;

		beforeEach(() => {
			component = setUp();
		});

		it('should not render', () => {
			const wrapper = findByTestId(component, 'userCellComponent');
			expect(wrapper.length).toBe(0);
		});

		it('should render when props arrive', () => {
			component.setProps({
				user: {
					name: 'John',
					screen_name: 'johnsmith',
					verified: true,
					profile_image_url_https:
						'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png',
				},
				onUserClick: jest.fn(),
				onFollowClick: jest.fn(),
			});

			const wrapper = findByTestId(component, 'userCellComponent');
			expect(wrapper.length).toBe(1);
		});
	});
});
