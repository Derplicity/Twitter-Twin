import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestId } from '../../testUtils';

import { UserListContainer as Component } from './UserList';

const setUp = (props = {}) => {
	const enzymeWrapper = shallow(<Component {...props} />);
	return {
		props,
		enzymeWrapper,
	};
};

/* ********************
  USER LIST CONTAINER
******************** */
describe('<UserListContainer />', () => {
	/* ********************
      CHECK PROPTYPES
  ******************** */
	describe('Check PropTypes', () => {
		it('should not throw a warning', () => {
			const expectedProps = {
				list: [{ name: 'test' }],
				count: 1,
			};

			expect(checkProps(Component, expectedProps)).toBeUndefined();
		});
	});

	/* ********************
         COMPONENT
  ******************** */
	describe('Component', () => {
		let wrapper;
		let passedProps;

		beforeEach(() => {
			const initialProps = {
				list: [{ name: 'test' }],
				count: 1,

				history: [],
			};

			const { enzymeWrapper, props } = setUp(initialProps);

			wrapper = enzymeWrapper;
			passedProps = props;
		});

		/* ********************
         ON USER CLICK
    ******************** */
		describe('onUserClick()', () => {
			it('should change url path if target === currentTarget', () => {
				const history = () => passedProps.history;
				const prevHistory = history();
				const url = 'http://example.com';
				const expectedHistory = [url];
				let e = {
					target: 0,
					currentTarget: 1,
				};

				// target !== currentTarget -> no change url path
				wrapper.instance().onUserClick(e, url);
				expect(history()).toEqual(prevHistory);

				// target === currentTarget -> change url path
				e.target = 1;
				wrapper.instance().onUserClick(e, url);
				expect(history()).toEqual(expectedHistory);
			});
		});

		/* ********************
        ON FOLLOW CLICK
    ******************** */
		describe('onFollowClick()', () => {
			it('should return null', () => {
				expect(wrapper.instance().onFollowClick()).toBeNull();
			});
		});

		/* ********************
		     GET USER CELLS
		******************** */
		describe('getUserCells()', () => {
			it('should return an array of <UserCellPresentator />', () => {
				const list = [{ name: 'test' }, { name: 'test2' }, { name: 'test3' }];

				// output.length should equal count
				let count = 2;
				expect(wrapper.instance().getUserCells(list, count).length).toEqual(
					count,
				);
				count = 3;
				expect(wrapper.instance().getUserCells(list, count).length).toEqual(
					count,
				);

				// Check each <UserCellPresentator /> props
				const onUserClick = (wrapper.instance().onUserClick = jest.fn());
				const onFollowClick = (wrapper.instance().onFollowClick = jest.fn());
				wrapper
					.instance()
					.getUserCells(list, count)
					.map((userCell, index) => {
						const props = userCell.props;
						const mockOnUserClick = () => onUserClick.mock.calls.length;
						const mockOnFollowClick = () => onFollowClick.mock.calls.length;

						// List item is passed to user
						expect(props.user).toEqual(list[index]);

						// onUserClick() is passed to onUserClick
						expect(mockOnUserClick()).toEqual(index);
						props.onUserClick();
						expect(mockOnUserClick()).toEqual(index + 1);

						// onFollowClick() is passed to onFollowClick
						expect(mockOnFollowClick()).toEqual(index);
						props.onFollowClick();
						expect(mockOnFollowClick()).toEqual(index + 1);
					});
			});
		});

		/* ********************
		        RENDER
		******************** */
		describe('render()', () => {
			it('should render without errors', () => {
				expect(findByTestId(wrapper, 'UserListContainer').length).toEqual(1);
			});

			it('should not render if props are invalid', () => {
				// list.length !== 0 && count === 0 -> no render
				wrapper.setProps({ count: 0 });
				expect(findByTestId(wrapper, 'UserListContainer').length).toEqual(0);

				// list.length === 0 && count === 0 -> no render
				wrapper.setProps({ list: [] });
				expect(findByTestId(wrapper, 'UserListContainer').length).toEqual(0);

				// list.length === 0 && count !== 0 -> no render
				wrapper.setProps({ count: 2 });
				expect(findByTestId(wrapper, 'UserListContainer').length).toEqual(0);
			});

			it('should render list of <UserCellPresentator /> based on props', () => {
				const userCells = () => findByTestId(wrapper, 'UserCellPresentator');

				// list.length === 1 && count === 1 -> 1 userCell
				expect(userCells().length).toEqual(1);

				// list.length === 3 && count === 2 -> 2 userCells
				wrapper.setProps({
					list: [{ name: 'test' }, { name: 'test2' }, { name: 'test3' }],
					count: 2,
				});
				expect(userCells().length).toEqual(2);

				// list.length === 3 && count === 0 -> 0 userCells
				wrapper.setProps({ count: 0 });
				expect(userCells().length).toEqual(0);

				// list.length === 0 && count === 0 -> 0 userCells
				wrapper.setProps({ list: [] });
				expect(userCells().length).toEqual(0);

				// list.length === 0 && count === 2 -> 0 userCells
				wrapper.setProps({ count: 2 });
				expect(userCells().length).toEqual(0);
			});
		});
	});
});
