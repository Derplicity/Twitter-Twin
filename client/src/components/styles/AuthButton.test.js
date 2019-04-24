import React from 'react';
import { mount } from 'enzyme';

import AuthButton from './AuthButton';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
      AUTHBUTTON STYLES
******************** */
describe('<AuthButtonStyles />', () => {
  /* ********************
         AUTHBUTTON
  ******************** */
  describe('AuthButton', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(AuthButton, initialProps);

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
        expect(wrapper).toHaveStyleRule('background', '#326ada');
        expect(wrapper).toHaveStyleRule('cursor', 'pointer');

        // &:hover
        expect(wrapper).toHaveStyleRule('background', '#433e90', {
          modifier: ':hover',
        });
        expect(wrapper).toHaveStyleRule(
          'box-shadow',
          '2px 5px 5px rgba(0,0,0,0.5)',
          {
            modifier: ':hover',
          },
        );

        // &:hover svg
        expect(wrapper).toHaveStyleRule(
          'text-shadow',
          '2px 5px 5px rgba(0,0,0,0.5)',
          {
            modifier: ':hover svg',
          },
        );
      });

      it('should alter background based on props', () => {
        const expectedBGs = {
          disabled: '#999',
        };

        // Try each background prop
        for (let key in expectedBGs) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('background', expectedBGs[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base background
          expect(wrapper).toHaveStyleRule('background', '#326ada');
        }
      });

      it('should alter cursor based on props', () => {
        const expectedCursors = {
          disabled: 'no-drop',
        };

        // Try each cursor prop
        for (let key in expectedCursors) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('cursor', expectedCursors[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base cursor
          expect(wrapper).toHaveStyleRule('cursor', 'pointer');
        }
      });

      it('should alter hovered background based on props', () => {
        const expectedBGs = {
          disabled: '#999',
        };

        // Try each background prop
        for (let key in expectedBGs) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('background', expectedBGs[key], {
            modifier: ':hover',
          });

          wrapper.setProps({ [key]: false });

          // Should reset to base background
          expect(wrapper).toHaveStyleRule('background', '#433e90', {
            modifier: ':hover',
          });
        }
      });

      it('should alter hovered box shadow based on props', () => {
        const expectedShadows = {
          disabled: '1px 2px 2px rgba(0,0,0,0.25)',
        };

        // Try each box shadow prop
        for (let key in expectedShadows) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('box-shadow', expectedShadows[key], {
            modifier: ':hover',
          });

          wrapper.setProps({ [key]: false });

          // Should reset to base box shadow
          expect(wrapper).toHaveStyleRule(
            'box-shadow',
            '2px 5px 5px rgba(0,0,0,0.5)',
            {
              modifier: ':hover',
            },
          );
        }
      });

      it('should alter svg text shadow on hover based on props', () => {
        const expectedShadows = {
          disabled: '1px 2px 2px rgba(0,0,0,0.25)',
        };

        // Try each text shadow prop
        for (let key in expectedShadows) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('text-shadow', expectedShadows[key], {
            modifier: ':hover svg',
          });

          wrapper.setProps({ [key]: false });

          // Should reset to base text shadow
          expect(wrapper).toHaveStyleRule(
            'text-shadow',
            '2px 5px 5px rgba(0,0,0,0.5)',
            {
              modifier: ':hover svg',
            },
          );
        }
      });
    });
  });

  /* ********************
     AUTHBUTTON.WRAPPER
  ******************** */
  describe('AuthButton.Wrapper', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(AuthButton.Wrapper, initialProps);

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
