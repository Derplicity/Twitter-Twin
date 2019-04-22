import React from 'react';
import { mount } from 'enzyme';

import Action from './Action';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    ACTION STYLES
******************** */
describe('<ActionStyles />', () => {
  /* ********************
          ACTION
  ******************** */
  describe('Action', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Action, initialProps);

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
       ACTION.GROUP
  ******************** */
  describe('Action.Group', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Action.Group, initialProps);

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
