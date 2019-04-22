import React from 'react';
import { mount } from 'enzyme';

import Video from './Video';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
     VIDEO STYLES
******************** */
describe('<VideoStyles />', () => {
  /* ********************
          VIDEO
  ******************** */
  describe('Video', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Video, initialProps);

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
       VIDEO.WRAPPER
  ******************** */
  describe('Video.Wrapper', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Video.Wrapper, initialProps);

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
