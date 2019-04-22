import React from 'react';
import { mount } from 'enzyme';

import Main from './Main';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
      MAIN STYLES
******************** */
describe('<MainStyles />', () => {
  /* ********************
           MAIN
  ******************** */
  describe('Main', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Main, initialProps);

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
        MAIN.HEADER
  ******************** */
  describe('Main.Header', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Main.Header, initialProps);

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
