import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestId } from '../../testUtils';

import { HomeView as Component } from './Home';

const setUp = (props = {}) => {
	const enzymeWrapper = shallow(<Component {...props} />);
	return {
		props,
		enzymeWrapper,
	};
};

/* ********************
       HOME VIEW
******************** */
describe('<HomeView />', () => {
	/* ********************
      CHECK PROPTYPES
  ******************** */
	describe('Check PropTypes', () => {
		it('should not throw a warning', () => {
			const expectedProps = {
				home_timeline: [{ id: '0123456789' }],
				getHomeTimeline: jest.fn(),
				getNewHomeTimeline: jest.fn(),
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
				home_timeline: [],
				getHomeTimeline: jest.fn(),
				getNewHomeTimeline: jest.fn(),
			};

			const { enzymeWrapper, props } = setUp(initialProps);

			wrapper = enzymeWrapper;
			passedProps = props;
		});

		/* ********************
      COMPONENT DID MOUNT
    ******************** */
		describe('componenDidMount()', () => {
			it('should call getHomeTimeline()', () => {
				const getHomeTimeline = () =>
					passedProps.getHomeTimeline.mock.calls.length;

				// Already called when shallow render was created
				expect(getHomeTimeline()).toEqual(1);
				wrapper.instance().componentDidMount();
				expect(getHomeTimeline()).toEqual(2);
			});
		});

		/* ********************
            RENDER
    ******************** */
		describe('render()', () => {
			it('should render without errors', () => {
				expect(findByTestId(wrapper, 'HomeView').length).toEqual(1);
			});

			it('should render <VirtualScroller /> based on props', () => {
				const virtualScroller = () => findByTestId(wrapper, 'VirtualScroller');

				// home_timeline.length === 0 -> no render
				expect(virtualScroller().length).toEqual(0);

				// home_timeline.length !== 0 -> render
				wrapper.setProps({ home_timeline: [{ id: '0123456789' }] });
				expect(virtualScroller().length).toEqual(1);
			});

			it('should pass correct props to <VirtualScroller />', () => {
				const home_timeline = [{ id: '0123456789' }];

				// Props needed for VirtualScroller to render
				wrapper.setProps({ home_timeline });

				const props = findByTestId(wrapper, 'VirtualScroller').props();
				const getNewHomeTimeline = () =>
					passedProps.getNewHomeTimeline.mock.calls.length;

				expect(props.items).toEqual(home_timeline);
				expect(getNewHomeTimeline()).toEqual(0);
				props.getNewData();
				expect(getNewHomeTimeline()).toEqual(1);
			});
		});
	});
});
