import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { NavDropdownContainer as Component } from './NavDropdown';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    NAV DROPDOWN CONTAINER
******************** */
describe('<NavDropdownContainer />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        setClickContainer: jest.fn(),
        startClickListen: jest.fn(),
        stopClickListen: jest.fn(),
        user: {
          name: 'test',
          screen_name: 'test2',
          profile_image_url_https: 'https://test.com/image',
          friends_count_formatted: '100K',
          followers_count_formatted: '20M',
        },
        isOutside: false,
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
        setClickContainer: jest.fn(),
        startClickListen: jest.fn(),
        stopClickListen: jest.fn(),
        user: {
          name: 'test',
          screen_name: 'test2',
          profile_image_url_https: 'https://test.com/image',
          friends_count_formatted: '100K',
          followers_count_formatted: '20M',
        },
        isOutside: false,
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
        const expectedState = {
          isOpen: false,
        };

        expect(wrapper.state()).toEqual(expectedState);
      });
    });

    /* ********************
      COMPONENT DID UPDATE
    ******************** */
    describe('componentDidUpdate()', () => {
      it('should alter state if props changed', () => {
        let prevProps = { isOutside: false };

        wrapper.setState({ isOpen: true });

        // Props did not change -> no state change
        wrapper.setProps(prevProps);
        wrapper.instance().componentDidUpdate(prevProps);
        expect(wrapper.state().isOpen).toBeTruthy();

        wrapper.setState({ isOpen: false });

        // Props did not change -> no state change
        wrapper.setProps(prevProps);
        wrapper.instance().componentDidUpdate(prevProps);
        expect(wrapper.state().isOpen).toBeFalsy();

        // Props changed -> state change
        wrapper.setProps({ isOutside: true });
        wrapper.instance().componentDidUpdate(prevProps);
        expect(wrapper.state().isOpen).toBeFalsy();

        prevProps = { isOutside: true };

        // Props changed -> state change
        wrapper.setProps({ isOutside: false });
        wrapper.instance().componentDidUpdate(prevProps);
        expect(wrapper.state().isOpen).toBeTruthy();
      });
    });

    /* ********************
          HANDLE OPEN
    ******************** */
    describe('handleOpen()', () => {
      it('should set state, scroll to top of list, and start listening for click', () => {
        const startClickListen = () =>
          passedProps.startClickListen.mock.calls.length;

        // Create fake dropMenu
        const dropMenu = document.createElement('div');
        dropMenu.id = 'drop-menu';
        dropMenu.scrollTop = 100;

        // Mock getElementById
        const getElementById = (document.getElementById = jest.fn(() => {
          return dropMenu;
        }));

        wrapper.setState({ isOpen: false });

        expect(wrapper.state().isOpen).toBeFalsy();
        expect(startClickListen()).toEqual(0);
        expect(getElementById).toHaveBeenCalledTimes(0);
        wrapper.instance().handleOpen();
        expect(wrapper.state().isOpen).toBeTruthy();
        expect(startClickListen()).toEqual(1);
        expect(getElementById).toHaveBeenCalledTimes(1);
        expect(getElementById).toHaveBeenCalledWith('drop-menu');
        expect(getElementById('drop-menu').scrollTop).toEqual(0);
      });
    });

    /* ********************
        HANDLE CLOSE
    ******************** */
    describe('handleClose()', () => {
      it('should set state and stop listening for click', () => {
        const stopClickListen = () =>
          passedProps.stopClickListen.mock.calls.length;

        wrapper.setState({ isOpen: true });

        expect(wrapper.state().isOpen).toBeTruthy();
        expect(stopClickListen()).toEqual(0);
        wrapper.instance().handleClose();
        expect(wrapper.state().isOpen).toBeFalsy();
        expect(stopClickListen()).toEqual(1);
      });
    });

    /* ********************
             RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'NavDropdownContainer').length).toEqual(1);
      });

      it('should render drop link with correct props', () => {
        const dropLink = findByTestId(wrapper, 'dropLink');
        const props = dropLink.props();

        // Renders with props
        expect(dropLink.length).toEqual(1);
        expect(props.onClick).toEqual(wrapper.instance().handleOpen);

        // Check onKeyDown handler
        const handleOpen = (wrapper.instance().handleOpen = jest.fn());

        // keyCode !== 13 && !shiftKey -> no call
        dropLink.simulate('keydown', { keyCode: 12 });
        expect(handleOpen).toHaveBeenCalledTimes(0);

        // keyCode === 13 && shiftKey -> no call
        dropLink.simulate('keydown', { keyCode: 13, shiftKey: true });
        expect(handleOpen).toHaveBeenCalledTimes(0);

        // keyCode === 13 && !shiftKey -> call
        dropLink.simulate('keydown', { keyCode: 13 });
        expect(handleOpen).toHaveBeenCalledTimes(1);
      });

      it('should render a profile image with correct props', () => {
        const image = findByTestId(wrapper, 'profileImage');
        const props = image.props();

        // Renders with props
        expect(image.length).toEqual(1);
        expect(props.src).toEqual(passedProps.user.profile_image_url_https);
      });

      it('should render a profile name with correct text', () => {
        const name = findByTestId(wrapper, 'profileName');

        // Renders with text
        expect(name.length).toEqual(1);
        expect(name.text()).toEqual(passedProps.user.name);
      });

      it('should render <DropdownContentPresentator /> with correct props', () => {
        const dropdownContent = findByTestId(
          wrapper,
          'DropdownContentPresentator',
        );
        const props = dropdownContent.props();

        // Renders with props
        expect(dropdownContent.length).toEqual(1);
        expect(props.isOpen).toEqual(wrapper.state().isOpen);
        expect(props.handleClose).toEqual(wrapper.instance().handleClose);
        expect(props.user).toEqual(passedProps.user);

        // Check set node function
        wrapper.instance().node = null;
        props.setNode('test');
        expect(wrapper.instance().node).toEqual('test');
      });
    });
  });
});
