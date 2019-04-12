import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { ErrorBoundary as Component } from './ErrorBoundary';

const setUp = (props = {}) => {
	const enzymeWrapper = shallow(<Component {...props} />);
	return {
		props,
		enzymeWrapper,
	};
};

/* ********************
     ERROR BOUNDARY
******************** */
describe('<ErrorBoundary />', () => {
	/* ********************
      CHECK PROPTYPES
  ******************** */
	describe('Check PropTypes', () => {
		it('should not throw a warning', () => {
			const expectedProps = {
				children: <div />,
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
				children: <div />,
			};

			const { enzymeWrapper, props } = setUp(initialProps);

			wrapper = enzymeWrapper;
			passedProps = props;
		});

		/* ********************
          CONSTRUCTOR
    ******************** */
		describe('constructor()', () => {
			it('should set the initial state', () => {
				const expectedState = {
					hasError: false,
				};

				expect(wrapper.state()).toEqual(expectedState);
			});
		});

		/* ********************
    GET DERIVED STATE FROM ERROR
    ******************** */
		describe('getDerivedStateFromError()', () => {
			it('should return state that reflects error found', () => {
				expect(Component.getDerivedStateFromError()).toEqual({
					hasError: true,
				});
			});
		});

		/* ********************
      COMPONENT DID CATCH
    ******************** */
		describe('componentDidCatch()', () => {
			it('should log error', () => {
				console.log = jest.fn();

				const err = 'test err';
				const info = 'test info';

				wrapper.instance().componentDidCatch(err, info);
				expect(console.log).toHaveBeenCalledTimes(1);
				expect(console.log).toHaveBeenCalledWith(err, info);
			});
		});

		/* ********************
			        RENDER
			******************** */
		describe('render()', () => {
			it('should render based on state', () => {
				wrapper.setState({ hasError: true });

				// Render fallback UI when error
				expect(findByTestId(wrapper, 'fallback').length).toEqual(1);

				wrapper.setState({ hasError: false });

				// Render children when no error
				expect(wrapper.instance().render()).toEqual(passedProps.children);
			});
		});
	});
});
