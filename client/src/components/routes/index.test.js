import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestId } from '../../testUtils';

import { Routes as Component } from './';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
        ROUTES
******************** */
describe('<Routes />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        isAuthenticated: true,
        getUserAuth: jest.fn(),
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
        isAuthenticated: null,
        getUserAuth: jest.fn(),
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
      COMPONENT DID MOUNT
    ******************** */
    describe('componenDidMount()', () => {
      it('should call getUserAuth()', () => {
        const getUserAuth = () => passedProps.getUserAuth.mock.calls.length;

        // Already called when shallow render was created
        expect(getUserAuth()).toEqual(1);
        wrapper.instance().componentDidMount();
        expect(getUserAuth()).toEqual(2);
      });
    });

    /* ********************
            RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'Routes').length).toEqual(1);
      });

      it('should render <Page /> router based on props', () => {
        const pageRouter = () => findByTestId(wrapper, 'PageRouter');

        // isAuthenticated === null -> no render
        expect(pageRouter().length).toEqual(0);

        // !isAuthenticated -> no render
        wrapper.setProps({ isAuthenticated: false });
        expect(pageRouter().length).toEqual(0);

        // isAuthenticated -> render
        wrapper.setProps({ isAuthenticated: true });
        expect(pageRouter().length).toEqual(1);
      });

      it('should render redirect based on props', () => {
        const redirect = () => findByTestId(wrapper, 'Redirect');

        // isAuthenticated === null -> no render
        expect(redirect().length).toEqual(0);

        // isAuthenticated -> no render
        wrapper.setProps({ isAuthenticated: true });
        expect(redirect().length).toEqual(0);

        // !isAuthenticated -> render
        wrapper.setProps({ isAuthenticated: false });
        expect(redirect().length).toEqual(1);
      });
    });
  });
});
