import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { NavItemPresentator as Component } from './NavItem';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
  NAV ITEM PRESENTATOR
******************** */
describe('<NavItemPresentator />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        exact: false,
        to: '/',
        icon: ['fas', 'home'],
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
        exact: false,
        to: '/',
        icon: ['fas', 'home'],
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
        expect(findByTestId(wrapper, 'NavItemPresentator').length).toEqual(1);
      });

      it('should not render if icon prop is not present', () => {
        wrapper.setProps({ icon: null });

        expect(findByTestId(wrapper, 'NavItemPresentator').length).toEqual(0);
      });

      it('should render a link with correct props', () => {
        const link = findByTestId(wrapper, 'link');
        const props = link.props();

        expect(link.length).toEqual(1);
        expect(props.to).toEqual(passedProps.to);
        expect(props.exact).toEqual(passedProps.exact);
      });

      it('should render icon with correct props', () => {
        const icon = findByTestId(wrapper, 'icon');
        const props = icon.props();

        expect(icon.length).toEqual(1);
        expect(props.icon).toEqual(passedProps.icon);
      });
    });
  });
});
