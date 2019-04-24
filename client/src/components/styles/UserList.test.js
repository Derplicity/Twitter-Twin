import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import UserList from './UserList';

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
    USER LIST STYLES
******************** */
describe('<UserListStyles />', () => {
  /* ********************
          USERLIST
  ******************** */
  describe('UserList', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(UserList, initialProps);

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
      USERLIST.WRAPPER
  ******************** */
  describe('UserList.Wrapper', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(UserList.Wrapper, initialProps);

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
      USERLIST.BUTTON
  ******************** */
  describe('UserList.Button', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {
        to: '/',
      };

      const { enzymeWrapper, props } = setUpWithRouter(
        UserList.Button,
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
       USERLIST.INTERACTIVE
  ******************** */
  describe('UserList.Interactive', () => {
    let wrapper;
    let passedProps;

    beforeEach(() => {
      const initialProps = {};

      const { enzymeWrapper, props } = setUp(
        UserList.Interactive,
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
