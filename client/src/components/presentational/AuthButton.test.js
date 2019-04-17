import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { AuthButtonPresentator as Component } from './AuthButton';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
AUTH BUTTON PRESENTATOR
******************** */
describe('<AuthButtonPresentator />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        onClick: jest.fn(),
        disabled: false,
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
        onClick: jest.fn(),
        disabled: false,
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
        expect(findByTestId(wrapper, 'AuthButtonPresentator').length).toEqual(
          1,
        );
      });

      it('should render a button with correct props', () => {
        const button = findByTestId(wrapper, 'authButton');
        const props = button.props();

        // Renders with props
        expect(button.length).toEqual(1);
        expect(props.disabled).toEqual(passedProps.disabled);

        // Click handler calls correct function
        expect(passedProps.onClick).toHaveBeenCalledTimes(0);
        button.simulate('click');
        expect(passedProps.onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
