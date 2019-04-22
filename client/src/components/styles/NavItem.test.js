import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import NavItem from './NavItem';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

const setUpWithRouter = (Component, props = {}) => {
  const enzymeWrapper = mount(
    <Router>
      <Component {...props} />
    </Router>,
  );
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    NAV ITEM STYLES
******************** */
describe('<NavItemStyles />', () => {
  /* ********************
          NavItem
  ******************** */
  describe('NavItem', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(NavItem, initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
             RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(wrapper.exists()).toBeTruthy();
      });
    });
  });

  /* ********************
        NAVITEM.WRAPPER
  ******************** */
  describe('NavItem.Wrapper', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(NavItem.Wrapper, initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
            RENDER
     ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(wrapper.exists()).toBeTruthy();
      });
    });
  });

  /* ********************
    NAVITEM.INTERNALLINK
  ******************** */
  describe('NavItem.InternalLink', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {
        to: '/',
      };

      const { enzymeWrapper, props } = setUpWithRouter(
        NavItem.InternalLink,
        initialProps,
      );

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
            RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(wrapper.exists()).toBeTruthy();
      });
    });
  });
});
