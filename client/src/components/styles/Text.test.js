import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Text from './Text';

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
      TEXT STYLES
******************** */
describe('<TextStyles />', () => {
  /* ********************
           TEXT
  ******************** */
  describe('Text', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Text, initialProps);

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
        expect(wrapper).toHaveStyleRule('text-align', 'inherit');
        expect(wrapper).toHaveStyleRule('font-weight', 'inherit');
        expect(wrapper).toHaveStyleRule('font-size', 'inherit');
        expect(wrapper).toHaveStyleRule('color', 'inherit');
      });

      it('should alter text align based on props', () => {
        const expectedAligns = {
          center: 'center',
        };

        // Try each text align prop
        for (let key in expectedAligns) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('text-align', expectedAligns[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base text align
          expect(wrapper).toHaveStyleRule('text-align', 'inherit');
        }
      });

      it('should alter font weight based on props', () => {
        const expectedWeights = {
          bold: 'bold',
          bolder: '800',
        };

        // Try each font weight prop
        for (let key in expectedWeights) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('font-weight', expectedWeights[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base font weight
          expect(wrapper).toHaveStyleRule('font-weight', 'inherit');
        }
      });

      it('should alter font size based on props', () => {
        const expectedSizes = {
          small: '12px',
          large: '19px',
          xlarge: '23px',
        };

        // Try each font size prop
        for (let key in expectedSizes) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('font-size', expectedSizes[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base font size
          expect(wrapper).toHaveStyleRule('font-size', 'inherit');
        }
      });

      it('should alter color based on props', () => {
        const expectedColors = {
          grey: 'rgb(136,153,166)',
          blue: 'rgb(27,149,224)',
          white: 'rgb(255,255,255)',
          testInvalid: 'inherit', // All others will return inherit
        };

        // Try each color prop
        for (let key in expectedColors) {
          wrapper.setProps({ color: key });

          expect(wrapper).toHaveStyleRule('color', expectedColors[key]);
        }
      });

      it('should include crop styles based on props', () => {
        // !enableCrop -> no include styles
        expect(wrapper).not.toHaveStyleRule('text-overflow', 'ellipsis');
        expect(wrapper).not.toHaveStyleRule('overflow-y', 'hidden');
        expect(wrapper).not.toHaveStyleRule('overflow-x', 'hidden');
        expect(wrapper).not.toHaveStyleRule('white-space', 'nowrap');

        wrapper.setProps({ enableCrop: true });

        // enableCrop -> include styles
        expect(wrapper).toHaveStyleRule('text-overflow', 'ellipsis');
        expect(wrapper).toHaveStyleRule('overflow-y', 'hidden');
        expect(wrapper).toHaveStyleRule('overflow-x', 'hidden');
        expect(wrapper).toHaveStyleRule('white-space', 'nowrap');
      });

      it('should include hover styles based on props', () => {
        // !decor -> no include styles
        expect(wrapper).not.toHaveStyleRule('text-decoration', 'underline', {
          modifier: ':hover',
        });
        expect(wrapper).not.toHaveStyleRule(
          'text-decoration-color',
          'currentColor',
          {
            modifier: ':hover',
          },
        );

        wrapper.setProps({ decor: true });

        // decor -> include styles
        expect(wrapper).toHaveStyleRule('text-decoration', 'underline', {
          modifier: ':hover',
        });
        expect(wrapper).toHaveStyleRule(
          'text-decoration-color',
          'currentColor',
          {
            modifier: ':hover',
          },
        );
      });
    });
  });

  /* ********************
      TEXT.INTERNALLINK
  ******************** */
  describe('Text.InternalLink', () => {
    let wrapper;
    let passedProps;

    // Remounts component with new props
    const remount = (newProps = {}) => {
      const initialProps = {
        to: '/',
      };

      const { enzymeWrapper, props } = setUpWithRouter(Text.InternalLink, {
        ...initialProps,
        ...newProps,
      });

      wrapper = enzymeWrapper;
      passedProps = props;
    };

    beforeEach(() => {
      remount();
    });

    /* ********************
           RENDER
  ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(wrapper.exists()).toBeTruthy();
      });

      it('should alter display based on props', () => {
        const expectedDisplays = {
          inline: 'inline',
        };

        // Try each display prop
        for (let key in expectedDisplays) {
          let newProps = {
            [key]: 'true',
          };

          remount(newProps);

          expect(wrapper).toHaveStyleRule('display', expectedDisplays[key]);

          newProps = {
            // [key]: 'false',
          };

          remount();

          // Should reset to base display
          expect(wrapper).not.toHaveStyleRule('display', expectedDisplays[key]);
        }
      });
    });
  });

  /* ********************
      TEXT.EXTERNALLINK
  ******************** */
  describe('Text.ExternalLink', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Text.ExternalLink, initialProps);

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

      it('should alter display based on props', () => {
        const expectedDisplays = {
          inline: 'inline',
        };

        // Try each display prop
        for (let key in expectedDisplays) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('display', expectedDisplays[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base display
          expect(wrapper).not.toHaveStyleRule('display', expectedDisplays[key]);
        }
      });
    });
  });

  /* ********************
      TEXT.INTERACTIVE
  ******************** */
  describe('Text.Interactive', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Text.Interactive, initialProps);

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

      it('should alter hovered color based on props', () => {
        const expectedColors = {
          blue: 'rgb(27,149,224)',
          testInvalid: 'inherit',
        };

        // Try each color prop
        for (let key in expectedColors) {
          wrapper.setProps({ transitionto: key });

          expect(wrapper).toHaveStyleRule('color', expectedColors[key], {
            modifier: ':hover',
          });
        }
      });
    });
  });

  /* ********************
        TEXT.GROUP
  ******************** */
  describe('Text.Group', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(Text.Group, initialProps);

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
