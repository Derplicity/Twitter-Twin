import React from 'react';
import { mount } from 'enzyme';

import Aside from './Aside';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
     ASIDE STYLES
******************** */
describe('<AsideStyles />', () => {
  /* ********************
          ASIDE
  ******************** */
  describe('Aside', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Aside, initialProps);

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
       ASIDE.HEADER
  ******************** */
  describe('Aside.Header', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Aside.Header, initialProps);

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
       ASIDE.BODY
  ******************** */
  describe('Aside.Body', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Aside.Body, initialProps);

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
