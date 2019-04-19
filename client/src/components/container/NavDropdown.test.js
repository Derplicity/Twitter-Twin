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
        user: {
          name: 'test',
          screen_name: 'test2',
          profile_image_url_https: 'https://test.com/image',
          friends_count_formatted: '100K',
          followers_count_formatted: '20M',
        },
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
        user: {
          name: 'test',
          screen_name: 'test2',
          profile_image_url_https: 'https://test.com/image',
          friends_count_formatted: '100K',
          followers_count_formatted: '20M',
        },
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
          isDropped: false,
        };

        expect(wrapper.state()).toEqual(expectedState);
      });
    });

    /* ********************
     COMPONENT WILL UNMOUNT
    ******************** */
    describe('componentWillUnmount()', () => {
      it('should remove mousedown event listener', () => {
        const removeEventListener = (document.removeEventListener = jest.fn());
        const handleClick = wrapper.instance().handleClick;

        wrapper.instance().componentWillUnmount();
        expect(removeEventListener).toHaveBeenCalledTimes(1);
        expect(removeEventListener).toHaveBeenCalledWith(
          'mousedown',
          handleClick,
          false,
        );
      });
    });

    /* ********************
          HANDLE CLICK
    ******************** */
    describe('handleClick()', () => {
      it('should call handleClickOutside() if condition is met', () => {
        wrapper.instance().node = shallow(
          <div>
            <span />
          </div>,
        );

        let e = {
          target: <span />,
        };

        // Node contains e.target -> return null
        expect(wrapper.instance().handleClick(e)).toBeNull();

        const handleClickOutside = (wrapper.instance().handleClickOutside = jest.fn());

        e = {
          target: <input />,
        };

        // Node does not contain e.target -> call handleClickOutside()
        wrapper.instance().handleClick(e);
        expect(handleClickOutside).toHaveBeenCalledTimes(1);
      });
    });

    /* ********************
      HANDLE CLICK OUTSIDE
    ******************** */
    describe('handleClickOutside()', () => {
      it('should close dropdown and remove mousedown listener', () => {
        const removeEventListener = (document.removeEventListener = jest.fn());
        const handleClick = wrapper.instance().handleClick;

        wrapper.setState({ isDropped: true });

        wrapper.instance().handleClickOutside();
        expect(wrapper.state().isDropped).toBeFalsy();
        expect(removeEventListener).toHaveBeenCalledTimes(1);
        expect(removeEventListener).toHaveBeenCalledWith(
          'mousedown',
          handleClick,
          false,
        );
      });
    });

    /* ********************
          HANDLE DROP
    ******************** */
    describe('handleDrop()', () => {
      it('should alternate isDropped', () => {
        const handleDrop = wrapper.instance().handleDrop;
        const isDropped = () => wrapper.state().isDropped;
        const addEventListener = (document.addEventListener = jest.fn());
        const handleClick = wrapper.instance().handleClick;

        // Create fake dropMenu
        const dropMenu = document.createElement('div');
        dropMenu.id = 'drop-menu';
        dropMenu.scrollTop = 100;

        // Mock getElementById
        const getElementById = (document.getElementById = jest.fn(() => {
          return dropMenu;
        }));

        // !isDropped -> isDropped
        wrapper.setState({ isDropped: false });

        handleDrop();
        expect(isDropped()).toBeTruthy();
        expect(getElementById).toHaveBeenCalledTimes(1);
        expect(getElementById).toHaveBeenCalledWith('drop-menu');
        expect(getElementById('drop-menu').scrollTop).toEqual(0); // getElementById calls = 2
        expect(addEventListener).toHaveBeenCalledTimes(1);
        expect(addEventListener).toHaveBeenCalledWith(
          'mousedown',
          handleClick,
          false,
        );

        // isDropped -> !isDropped
        wrapper.setState({ isDropped: true });

        // Reset scrollTop
        dropMenu.scrollTop = 100;

        handleDrop();
        expect(isDropped()).toBeFalsy();
        expect(getElementById).toHaveBeenCalledTimes(3);
        expect(getElementById).toHaveBeenCalledWith('drop-menu');
        expect(getElementById('drop-menu').scrollTop).toEqual(0);
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
        expect(props.onClick).toEqual(wrapper.instance().handleDrop);

        // Check onKeyDown handler
        const handleDrop = (wrapper.instance().handleDrop = jest.fn());

        // keyCode !== 13 && !shiftKey -> no call
        dropLink.simulate('keydown', { keyCode: 12 });
        expect(handleDrop).toHaveBeenCalledTimes(0);

        // keyCode === 13 && shiftKey -> no call
        dropLink.simulate('keydown', { keyCode: 13, shiftKey: true });
        expect(handleDrop).toHaveBeenCalledTimes(0);

        // keyCode === 13 && !shiftKey -> call
        dropLink.simulate('keydown', { keyCode: 13 });
        expect(handleDrop).toHaveBeenCalledTimes(1);
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
        expect(props.isDropped).toEqual(wrapper.state().isDropped);
        expect(props.handleDrop).toEqual(wrapper.instance().handleDrop);
        expect(props.user).toEqual(passedProps.user);

        // Check set node function
        wrapper.instance().node = null;
        props.setNode('test');
        expect(wrapper.instance().node).toEqual('test');
      });
    });
  });
});
