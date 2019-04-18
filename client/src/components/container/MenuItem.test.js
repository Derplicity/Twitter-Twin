import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { MenuItemContainer as Component } from './MenuItem';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
  MENU ITEM CONTAINER
******************** */
describe('<MenuItemContainer />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        exact: false,
        to: '/test',
        icon: ['fas', 'home'],
        header: 'test',
        hasToggle: false,
        onClick: jest.fn(),
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
        to: '/test',
        icon: ['fas', 'home'],
        header: 'test',
        hasToggle: false,
        onClick: jest.fn(),
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
          CONSTRUCTOR
    ******************** */
    describe('constructor()', () => {
      it('should set state', () => {
        expect(wrapper.state().isChecked).toBeTruthy();
      });
    });

    /* ********************
          HANDLE CHECK
    ******************** */
    describe('handleCheck()', () => {
      it('should set isChecked to the opposite of prev isChecked', () => {
        const handleCheck = wrapper.instance().handleCheck;
        const isChecked = () => wrapper.state().isChecked;

        expect(isChecked()).toBeTruthy();

        // Should set isChecked to false
        handleCheck();
        expect(isChecked()).toBeFalsy();

        // Should set isChecked to true
        handleCheck();
        expect(isChecked()).toBeTruthy();
      });
    });

    /* ********************
             RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'MenuItemContainer').length).toEqual(1);
      });

      it('should render a menu link with correct props', () => {
        const link = findByTestId(wrapper, 'menuLink');
        const props = link.props();

        // Render with props
        expect(link.length).toEqual(1);
        expect(props.exact).toEqual(passedProps.exact);
        expect(props.to).toEqual(passedProps.to);
        expect(props.onClick).toEqual(passedProps.onClick);
      });

      it('should render a menu icon based on props, with correct props', () => {
        const menuIcon = () => findByTestId(wrapper, 'menuIcon');
        const props = menuIcon().props();

        // Render with props
        expect(menuIcon().length).toEqual(1);
        expect(props.icon).toEqual(passedProps.icon);

        wrapper.setProps({ icon: null });

        // No render
        expect(menuIcon().length).toEqual(0);
      });

      it('should render header with correct text', () => {
        const header = findByTestId(wrapper, 'header');

        expect(header.length).toEqual(1);
        expect(header.text()).toEqual(passedProps.header);
      });

      it('should render a switch input based on props, with correct props', () => {
        const input = () => findByTestId(wrapper, 'switchInput');

        // !hasToggle -> no render
        expect(input().length).toEqual(0);

        wrapper.setProps({ hasToggle: true });
        const props = input().props();

        // hasToggle -> render with props
        expect(input().length).toEqual(1);
        expect(props.checked).toEqual(wrapper.state().isChecked);

        // Check event handlers
        const handleCheck = (wrapper.instance().handleCheck = jest.fn());

        // Keydown handler calls correct function
        expect(handleCheck).toHaveBeenCalledTimes(0);

        // KeyCode !== 13 && !shiftKey -> no call
        input().simulate('keydown', { keyCode: 12 });
        expect(handleCheck).toHaveBeenCalledTimes(0);

        // KeyCode === 13 && shiftKey -> no call
        input().simulate('keydown', { keyCode: 13, shiftKey: true });
        expect(handleCheck).toHaveBeenCalledTimes(0);

        // KeyCode === 13 && !shiftKey -> call
        input().simulate('keydown', { keyCode: 13 });
        expect(handleCheck).toHaveBeenCalledTimes(1);
      });
    });
  });
});
