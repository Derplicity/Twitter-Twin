import React from 'react';
import { mount } from 'enzyme';

import Footer from './Footer';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
     FOOTER STYLES
******************** */
describe('<FooterStyles />', () => {
  /* ********************
           FOOTER
  ******************** */
  describe('Footer', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Footer, initialProps);

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
       FOOTER.WRAPPER
  ******************** */
  describe('Footer.Wrapper', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Footer.Wrapper, initialProps);

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
