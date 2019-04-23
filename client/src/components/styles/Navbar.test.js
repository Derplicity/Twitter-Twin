import React from 'react';
import { mount } from 'enzyme';

import Navbar from './Navbar';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
      NAVBAR STYLES
******************** */
describe('<NavbarStyles />', () => {
  /* ********************
          NAVBAR
  ******************** */
  describe('Navbar', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Navbar, initialProps);

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
       NAVBAR.WRAPPER
  ******************** */
  describe('Navbar', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Navbar.Wrapper, initialProps);

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
       NAVBAR.NAV
  ******************** */
  describe('Navbar.Nav', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Navbar.Nav, initialProps);

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

      it('should render with base styles', () => {
        expect(wrapper).toHaveStyleRule('margin', 'inherit');
        expect(wrapper).toHaveStyleRule('min-width', 'inherit');
        expect(wrapper).toHaveStyleRule('max-width', 'inherit');
      });

      it('should alter margin based on props', () => {
        const expectedMargins = {
          left: '0 20px 0 0',
          right: '0 0 0 20px',
        };

        // Try each margin prop
        for (let key in expectedMargins) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('margin', expectedMargins[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base margin
          expect(wrapper).toHaveStyleRule('margin', 'inherit');
        }
      });

      it('should alter min width based on props', () => {
        const expectedWidths = {
          left: '360px',
        };

        // Try each min width prop
        for (let key in expectedWidths) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('min-width', expectedWidths[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base min width
          expect(wrapper).toHaveStyleRule('min-width', 'inherit');
        }
      });

      it('should alter max width based on props', () => {
        const expectedWidths = {
          right: '100%',
        };

        // Try each max width prop
        for (let key in expectedWidths) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('max-width', expectedWidths[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base max width
          expect(wrapper).toHaveStyleRule('max-width', 'inherit');
        }
      });
    });
  });

  /* ********************
       NAVBAR.SEARCH
  ******************** */
  describe('Search', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Navbar.Search, initialProps);

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
