import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestId } from '../../testUtils';

import { UserView as Component } from './User';

const setUp = (props = {}) => {
	const enzymeWrapper = shallow(<Component {...props} />);
	return {
		props,
		enzymeWrapper,
	};
};

/* ********************
       USER VIEW
******************** */
describe('<UserView />', () => {
	/* ********************
      CHECK PROPTYPES
  ******************** */
	describe('Check PropTypes', () => {
		it('should not throw a warning', () => {
			const expectedProps = {
				user_timeline: [{ id: '0123456789' }],
				more_data: true,
				is_loading: false,
				getUserTimeline: jest.fn(),
				getNewUserTimeline: jest.fn(),
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
				user_timeline: [],
				more_data: false,
				is_loading: true,
				getUserTimeline: jest.fn(),
				getNewUserTimeline: jest.fn(),

				match: {
					params: {
						username: 'test',
					},
				},
			};

			const { enzymeWrapper, props } = setUp(initialProps);

			wrapper = enzymeWrapper;
			passedProps = props;
		});

		/* ********************
      COMPONENT DID MOUNT
    ******************** */
		describe('componenDidMount()', () => {
			it('should call getData()', () => {
				const getData = (wrapper.instance().getData = jest.fn());

				expect(getData).toBeCalledTimes(0);
				wrapper.instance().componentDidMount();
				expect(getData).toBeCalledTimes(1);
			});
		});

		/* ********************
      COMPONENT DID UPDATE
    ******************** */
		describe('componenDidUpdate()', () => {
			it('should call getData() when props change', () => {
				const prevProps = passedProps;
				const getData = (wrapper.instance().getData = jest.fn());

				// Props equal
				wrapper.instance().componentDidUpdate(prevProps);
				expect(getData).toBeCalledTimes(0);

				// Props changed -> automatically calls componentDidUpdate()
				wrapper.setProps({ match: { params: { username: 'test2' } } });
				expect(getData).toBeCalledTimes(1);
			});
		});

		/* ********************
            GET DATA
    ******************** */
		describe('getData()', () => {
			it('should call getUserTimeline()', () => {
				const getUserTimeline = () =>
					passedProps.getUserTimeline.mock.calls.length;

				// Already called with componentDidMount()
				expect(getUserTimeline()).toEqual(1);
				wrapper.instance().getData('test');
				expect(getUserTimeline()).toEqual(2);
			});
		});

		/* ********************
          GET NEW DATA
    ******************** */
		describe('getNewData()', () => {
			it('should call getNewUserTimeline() when !!more_data', () => {
				const getNewUserTimeline = () =>
					passedProps.getNewUserTimeline.mock.calls.length;

				// more_data = false
				wrapper.instance().getNewData(0);
				expect(getNewUserTimeline()).toEqual(0);

				wrapper.setProps({ more_data: true });
				wrapper.instance().getNewData(0);
				expect(getNewUserTimeline()).toEqual(1);
			});
		});

		/* ********************
            RENDER
    ******************** */
		describe('render()', () => {
			it('should render without errors', () => {
				expect(findByTestId(wrapper, 'UserView').length).toEqual(1);
			});

			it('should render a header based on props', () => {
				expect(findByTestId(wrapper, 'header').text()).toEqual(
					passedProps.match.params.username,
				);
			});

			it('should render <VirtualScroller /> based on props', () => {
				const virtualScroller = () => findByTestId(wrapper, 'VirtualScroller');

				// user_timeline.length === 0 && is_loading -> no render
				expect(virtualScroller().length).toEqual(0);

				// user_timeline.length !== 0 && is_loading -> no render
				wrapper.setProps({ user_timeline: [{ id: '0123456789' }] });
				expect(virtualScroller().length).toEqual(0);

				// user_timeline.length !== 0 && !is_loading -> render
				wrapper.setProps({ is_loading: false });
				expect(virtualScroller().length).toEqual(1);

				// user_timeline.length === 0 && !is_loading -> no render
				wrapper.setProps({ user_timeline: [] });
				expect(virtualScroller().length).toEqual(0);
			});

			it('should pass correct props to <VirtualScroller />', () => {
				const user_timeline = [{ id: '0123456789' }];

				// Props needed for VirtualScroller to render
				wrapper.setProps({ user_timeline, is_loading: false });

				const props = findByTestId(wrapper, 'VirtualScroller').props();

				expect(props.items).toEqual(user_timeline);
				expect(props.getNewData).toEqual(wrapper.instance().getNewData);
			});
		});
	});
});
