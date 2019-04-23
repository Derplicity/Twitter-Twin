import React from 'react';
import { mount } from 'enzyme';
import { css } from 'styled-components';

import Icon from './Icon';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// Set up test icon for font awesome
library.add(faHome);

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
      ICON STYLES
******************** */
describe('<IconStyles />', () => {
  /* ********************
           ICON
  ******************** */
  describe('Icon', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {
        icon: ['fas', 'home'],
      };

      const { enzymeWrapper, props } = setUp(Icon, initialProps);

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
        expect(wrapper).toHaveStyleRule('color', 'inherit');
      });

      it('should alter color based on props', () => {
        const expectedColors = {
          grey: 'rgb(136,153,166)',
          white: 'rgb(255,255,255)',
          red: 'rgb(224,36,94)',
          green: 'rgb(23,191,99)',
          testInvalid: 'inherit', // All else should return inherit
        };

        // Try each color prop
        for (let key in expectedColors) {
          wrapper.setProps({ color: key });

          expect(wrapper).toHaveStyleRule('color', expectedColors[key]);
        }
      });
    });
  });

  /* ********************
       ICON.CONTAINER
  ******************** */
  describe('Icon.Container', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Icon.Container, initialProps);

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
        ICON.WRAPPER
  ******************** */
  describe('Icon.Wrapper', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Icon.Wrapper, initialProps);

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
        expect(wrapper).toHaveStyleRule('height', '20px');
        expect(wrapper).toHaveStyleRule('width', '20px');

        // & svg
        expect(wrapper).toHaveStyleRule('font-size', 'inherit', {
          modifier: 'svg',
        });
      });

      it('should alter height based on props', () => {
        const expectedHeights = {
          small: '15px',
          large: '25px',
        };

        // Try each height prop
        for (let key in expectedHeights) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('height', expectedHeights[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base height
          expect(wrapper).toHaveStyleRule('height', '20px');
        }
      });

      it('should alter width based on props', () => {
        const expectedWidths = {
          small: '15px',
          large: '25px',
        };

        // Try each width prop
        for (let key in expectedWidths) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('width', expectedWidths[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base width
          expect(wrapper).toHaveStyleRule('width', '20px');
        }
      });

      it('should alter svg font size based on props', () => {
        const expectedFontSizes = {
          small: '13px',
          large: '20px',
        };

        // Try each font size prop
        for (let key in expectedFontSizes) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('font-size', expectedFontSizes[key], {
            modifier: 'svg',
          });

          wrapper.setProps({ [key]: false });

          // Should reset to base font size
          expect(wrapper).toHaveStyleRule('font-size', 'inherit', {
            modifier: 'svg',
          });
        }
      });
    });
  });

  /* ********************
       ICON.BUBBLE
  ******************** */
  describe('Icon.Bubble', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Icon.Bubble, initialProps);

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
        expect(wrapper).toHaveStyleRule('margin', '-8px');

        // :hover
        expect(wrapper).toHaveStyleRule('background-color', undefined, {
          modifier: ':hover',
        });
      });

      it('should alter margin based on props', () => {
        const expectedMargins = {
          small: '-6px',
        };

        // Try each margin prop
        for (let key in expectedMargins) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('margin', expectedMargins[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base margin
          expect(wrapper).toHaveStyleRule('margin', '-8px');
        }
      });

      it('should alter hovered background color based on props', () => {
        const expectedBGColors = {
          blueGrey__light: 'rgb(24,36,48)',
          blueGrey__lighter: 'rgba(29,161,242,0.1)',
          red_lighter: 'rgba(224,36,94,0.1)',
          green_lighter: 'rgba(23,191,99,0.1)',
          testInvalid: undefined, // All else should return undefined
        };

        // Try each background color prop
        for (let key in expectedBGColors) {
          wrapper.setProps({ transitionto: key });

          expect(wrapper).toHaveStyleRule(
            'background-color',
            expectedBGColors[key],
            {
              modifier: ':hover',
            },
          );
        }
      });
    });
  });

  /* ********************
       ICON.INTERACTIVE
  ******************** */
  describe('Icon.Interactive', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Icon.Interactive, initialProps);

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
        // & Icon
        expect(wrapper).toHaveStyleRule('transition-property', 'color', {
          modifier: css`
            ${Icon}
          `,
        });
      });

      it('should alter hovered color based on props', () => {
        const expectedColors = {
          blue: 'rgb(27,149,224)',
          red: 'rgb(224,36,94)',
          green: 'rgb(23,191,99)',
        };

        // Try each color prop
        for (let key in expectedColors) {
          wrapper.setProps({ transitionto: key });

          expect(wrapper).toHaveStyleRule('color', expectedColors[key], {
            // prettier-ignore
            modifier: css`
              :hover ${Icon}
            `
          });
        }
      });
    });
  });
});
