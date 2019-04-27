import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { DropdownContentPresentator as Component } from './DropdownContent';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    DROPDOWN CONTENT
      PRESENTATOR
******************** */
describe('<DropdownContentPresentator />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        isOpen: true,
        user: {
          name: 'test',
          screen_name: 'test2',
          profile_image_url_https: 'https://test.com/image',
          friends_count_formatted: '100K',
          followers_count_formatted: '20M',
        },
        setNode: jest.fn(),
        handleClose: jest.fn(),
        setClickContainer: jest.fn(),
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
        isOpen: true,
        user: {
          name: 'test',
          screen_name: 'test2',
          profile_image_url_https: 'https://test.com/image',
          friends_count_formatted: '100K',
          followers_count_formatted: '20M',
        },
        setNode: jest.fn(),
        handleClose: jest.fn(),
        setClickContainer: jest.fn(),
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
        expect(
          findByTestId(wrapper, 'DropdownContentPresentator').length,
        ).toEqual(1);
      });

      it('should not render if user prop is not present', () => {
        wrapper.setProps({ user: null });

        expect(
          findByTestId(wrapper, 'DropdownContentPresentator').length,
        ).toEqual(0);
      });

      it('should render a backdrop with correct props', () => {
        const backdrop = findByTestId(wrapper, 'backdrop');
        const props = backdrop.props();

        // Renders with props
        expect(backdrop.length).toEqual(1);
        expect(props.isOpen).toEqual(passedProps.isOpen);
      });

      it('should render a close button with correct props', () => {
        const button = findByTestId(wrapper, 'closeButton');

        // Renders
        expect(button.length).toEqual(1);

        // Click handler calls correct function
        expect(passedProps.handleClose).toHaveBeenCalledTimes(0);
        button.simulate('click');
        expect(passedProps.handleClose).toHaveBeenCalledTimes(1);

        // Keydown handler calls correct functon on correct keys
        // keydown !== 13 && !shiftKey -> no call
        button.simulate('keydown', { keyCode: 12 });
        expect(passedProps.handleClose).toHaveBeenCalledTimes(1);

        // keydown === 13 && shiftKey -> no call
        button.simulate('keydown', { keyCode: 13, shiftKey: true });
        expect(passedProps.handleClose).toHaveBeenCalledTimes(1);

        // keydown === 13 && !shiftKey -> call
        button.simulate('keydown', { keyCode: 13 });
        expect(passedProps.handleClose).toHaveBeenCalledTimes(2);
      });

      it('should render <ProfileSectionPresentator /> with correct props', () => {
        const profileSection = findByTestId(
          wrapper,
          'ProfileSectionPresentator',
        );
        const props = profileSection.props();

        // Renders with props
        expect(profileSection.length).toEqual(1);
        expect(props.user).toEqual(passedProps.user);
        expect(props.onClick).toEqual(passedProps.handleClose);
      });

      it('should render correct number of menu items with correct props', () => {
        const menuItems = findByTestId(wrapper, 'menuItem');

        // Renders correct number of menu items
        expect(menuItems.length).toEqual(15);

        // First menu item should be 'Profile' and be linked based on props
        const profile = menuItems.first();
        expect(profile.props().to).toEqual(`/${passedProps.user.screen_name}`);

        // Check all click handlers call correct function
        menuItems.forEach((item, i) => {
          item.simulate('click');
          expect(passedProps.handleClose).toHaveBeenCalledTimes(i + 1);
        });
      });
    });
  });
});
