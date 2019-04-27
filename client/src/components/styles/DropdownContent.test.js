import React from 'react';
import { mount } from 'enzyme';

import DropdownContent from './DropdownContent';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
DROPDOWN CONTENT STYLES
******************** */
describe('<DropdownContentStyles />', () => {
  /* ********************
       DROPDOWNCONTENT
  ******************** */
  describe('DropdownContent', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(DropdownContent, initialProps);

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
  DROPDOWNCONTENT.BACKDROP
  ******************** */
  describe('DropdownContent.Backdrop', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(
        DropdownContent.Backdrop,
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

      it('should render with base styles', () => {
        expect(wrapper).toHaveStyleRule('display', 'none');
      });

      it('should alter display based on props', () => {
        const expectedDisplays = {
          isOpen: 'block',
        };

        // Try each display prop
        for (let key in expectedDisplays) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('display', expectedDisplays[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base display
          expect(wrapper).toHaveStyleRule('display', 'none');
        }
      });
    });
  });

  /* ********************
  DROPDOWNCONTENT.WRAPPER
  ******************** */
  describe('DropdownContent.Wrapper', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(
        DropdownContent.Wrapper,
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

  /* ********************
  DROPDOWNCONTENT.HEADER
  ******************** */
  describe('DropdownContent.Header', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(
        DropdownContent.Header,
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

  /* ********************
  DROPDOWNCONTENT.CLOSE
  ******************** */
  describe('DropdownContent.Close', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(
        DropdownContent.Close,
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

  /* ********************
  DROPDOWNCONTENT.TABBLOCK
  ******************** */
  describe('DropdownContent.TabBlock', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(
        DropdownContent.TabBlock,
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

  /* ********************
  DROPDOWNCONTENT.MENU
  ******************** */
  describe('DropdownContent.Menu', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(
        DropdownContent.Menu,
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

  /* ********************
 DROPDOWNCONTENT.SEPARATOR
  ******************** */
  describe('DropdownContent.Separator', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(
        DropdownContent.Separator,
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

      it('should render with base styles', () => {
        expect(wrapper).toHaveStyleRule(
          'border-bottom',
          '1px solid rgb(56,68,77)',
        );
        expect(wrapper).toHaveStyleRule('margin', '10px 0');
        expect(wrapper).toHaveStyleRule('padding', '0');
        expect(wrapper).toHaveStyleRule('background-color', 'rgba(0,0,0,0)');
      });

      it('should alter border bottom based on props', () => {
        const expectedBorders = {
          transparent: '1px solid rgba(0,0,0,0)',
        };

        // Try each border bottom prop
        for (let key in expectedBorders) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule(
            'border-bottom',
            expectedBorders[key],
          );

          wrapper.setProps({ [key]: false });

          // Should reset to base border bottom
          expect(wrapper).toHaveStyleRule(
            'border-bottom',
            '1px solid rgb(56,68,77)',
          );
        }
      });

      it('should alter margin based on props', () => {
        const expectedMargins = {
          dark: '0',
        };

        // Try each margin prop
        for (let key in expectedMargins) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('margin', expectedMargins[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base margin
          expect(wrapper).toHaveStyleRule('margin', '10px 0');
        }
      });

      it('should alter padding based on props', () => {
        const expectedPaddings = {
          dark: '5px 0',
        };

        // Try each padding prop
        for (let key in expectedPaddings) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('padding', expectedPaddings[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base padding
          expect(wrapper).toHaveStyleRule('padding', '0');
        }
      });

      it('should alter background color based on props', () => {
        const expectedBGs = {
          dark: 'rgb(16,23,30)',
        };

        // Try each background color prop
        for (let key in expectedBGs) {
          wrapper.setProps({ [key]: true });

          expect(wrapper).toHaveStyleRule('background-color', expectedBGs[key]);

          wrapper.setProps({ [key]: false });

          // Should reset to base background color
          expect(wrapper).toHaveStyleRule('background-color', 'rgba(0,0,0,0)');
        }
      });
    });
  });
});
