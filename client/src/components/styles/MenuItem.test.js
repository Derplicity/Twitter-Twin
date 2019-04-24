import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import MenuItem from './MenuItem';

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
   MENU ITEM STYLES
******************** */
describe('<MenuItemStyles />', () => {
  /* ********************
        MENU ITEM
  ******************** */
  describe('MenuItem', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(MenuItem, initialProps);

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
      MENUITEM.WRAPPER
  ******************** */
  describe('MenuItem.Wrapper', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(MenuItem.Wrapper, initialProps);

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
   MENUITEM.INTERNALLINK
  ******************** */
  describe('MenuItem.InternalLink', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {
        to: '/',
      };

      const { enzymeWrapper, props } = setUpWithRouter(
        MenuItem.InternalLink,
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
