import React from 'react';
import { mount } from 'enzyme';

import UserCell from './UserCell';

const setUp = (Component, props = {}) => {
  const enzymeWrapper = mount(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    USER CELL STYLES
******************** */
describe('<UserCellStyles />', () => {
  /* ********************
          USERCELL
  ******************** */
  describe('UserCell', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(UserCell, initialProps);

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
      USERCELL.WRAPPER
  ******************** */
  describe('UserCell.Wrapper', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(UserCell.Wrapper, initialProps);

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
      USERCELL.IMAGE
  ******************** */
  describe('UserCell.Image', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(UserCell.Image, initialProps);

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
      USERCELL.CONTENT
  ******************** */
  describe('UserCell.Content', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(UserCell.Content, initialProps);

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
      USERCELL.HEADER
  ******************** */
  describe('UserCell.Header', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(UserCell.Header, initialProps);

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
      USERCELL.BUTTON
  ******************** */
  describe('UserCell.Button', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(UserCell.Button, initialProps);

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
       USERCELL.INTERACTIVE
  ******************** */
  describe('UserCell.Interactive', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(
        UserCell.Interactive,
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
        expect(wrapper).toHaveStyleRule('background-color', undefined, {
          modifier: ':hover',
        });
      });

      it('should alter hovered background color base on props', () => {
        const expectedBGColors = {
          blueGrey__light: 'rgb(24,36,48)',
          blueGrey__lighter: 'rgba(29,161,242,0.1)',
          testInvalid: undefined, // All others should return undefined
        };

        // Test each background color prop
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
});
