import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Image from './Image';

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
      IMAGE STYLES
******************** */
describe('<ImageStyles />', () => {
  /* ********************
           IMAGE
  ******************** */
  describe('Image', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Image, initialProps);

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
       IMAGE.WRAPPER
  ******************** */
  describe('Image.Wrapper', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Image.Wrapper, initialProps);

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
        expect(wrapper).toHaveStyleRule('height', '100%');
        expect(wrapper).toHaveStyleRule('border-radius', '14px');
      });

      it('should alter height based on props', () => {
        const expectedHeights = {
          small: '49px',
        };

        // Try each height prop
        for (let key in expectedHeights) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('height', expectedHeights[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base height
          expect(wrapper).toHaveStyleRule('height', '100%');
        }
      });

      it('should alter border radius based on props', () => {
        const expectedRadiuses = {
          circle: '9999px',
        };

        // Try each border radius prop
        for (let key in expectedRadiuses) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule(
            'border-radius',
            expectedRadiuses[key],
          );

          wrapper.setProps({ [key]: false });

          // Should reset to base border radius
          expect(wrapper).toHaveStyleRule('border-radius', '14px');
        }
      });
    });
  });

  /* ********************
       IMAGE.OVERLAY
  ******************** */
  describe('Image.Overlay', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Image.Overlay, initialProps);

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
        expect(wrapper).toHaveStyleRule('background-image', 'none');
      });

      it('should alter background image based on props', () => {
        const expectedUrl = 'test.png';

        wrapper.setProps({ url: expectedUrl });

        expect(wrapper).toHaveStyleRule(
          'background-image',
          `url('${expectedUrl}')`,
        );
      });
    });
  });

  /* ********************
     IMAGE.INTERNALLINK
  ******************** */
  describe('Image.InternalLink', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {
        to: '/',
      };

      const { enzymeWrapper, props } = setUpWithRouter(
        Image.InternalLink,
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
