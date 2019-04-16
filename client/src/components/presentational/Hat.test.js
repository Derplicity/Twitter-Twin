import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { HatPresentator as Component } from './Hat';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    HAT PRESENTATOR
******************** */
describe('<HatPresentator />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        to: '/test',
        text: 'test',
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
        text: 'test',
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
        expect(findByTestId(wrapper, 'HatPresentator').length).toEqual(1);
      });

      it('should not render if text prop is not present', () => {
        wrapper.setProps({ text: null });

        expect(findByTestId(wrapper, 'HatPresentator').length).toEqual(0);
      });

      it('should render a link with correct props', () => {
        const link = findByTestId(wrapper, 'hatLink');
        const props = link.props();

        expect(link.length).toEqual(1);
        expect(props.to).toEqual(passedProps.to);
      });

      it('should render text with correct text', () => {
        const hatText = findByTestId(wrapper, 'hatText');
        const expectedText = `${passedProps.text} Retweeted`;

        expect(hatText.length).toEqual(1);
        expect(hatText.text()).toEqual(expectedText);
      });
    });
  });
});
