import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { ImagePresentator as Component } from './Image';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
   IMAGE PRESENTATOR
******************** */
describe('<ImagePresentator />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        to: '/test',
        src: 'https://via.placeholder.com/150',
        alt: 'test',
        isCircle: false,
        isSmall: false,
        custom: { margin: '10px' },
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
        to: '/test',
        src: 'https://via.placeholder.com/150',
        alt: 'test',
        isCircle: false,
        isSmall: false,
        custom: { margin: '10px' },
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
             RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'ImagePresentator').length).toEqual(1);
      });

      it('should not render if src prop is not present', () => {
        wrapper.setProps({ src: null });

        expect(findByTestId(wrapper, 'ImagePresentator').length).toEqual(0);
      });

      it('should render with correct props', () => {
        const imagePresentator = findByTestId(wrapper, 'ImagePresentator');
        const props = imagePresentator.props();

        expect(imagePresentator.length).toEqual(1);
        expect(props.circle).toEqual(passedProps.isCircle);
        expect(props.small).toEqual(passedProps.isSmall);
      });

      it('should render an image overlay with correct props', () => {
        const overlay = findByTestId(wrapper, 'imageOverlay');
        const props = overlay.props();

        expect(overlay.length).toEqual(1);
        expect(props.url).toEqual(passedProps.src);
      });

      it('should render an image with correct props', () => {
        const image = findByTestId(wrapper, 'image');
        const props = image.props();

        expect(image.length).toEqual(1);
        expect(props.src).toEqual(passedProps.src);
        expect(props.alt).toEqual(passedProps.alt);
      });

      it('should render an image link based on props, with correct props', () => {
        const link = () => findByTestId(wrapper, 'imageLink');

        const props = link().props();

        expect(link().length).toEqual(1);
        expect(props.to).toEqual(passedProps.to);
        expect(props.style).toEqual(passedProps.custom);

        wrapper.setProps({ to: null });

        expect(link().length).toEqual(0);
      });
    });
  });
});
