import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { NavbarContainer as Component } from './Navbar';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    NAVBAR CONTAINER
******************** */
describe('<NavbarContainer />', () => {
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
        getCurrentUser: jest.fn(),
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
        getCurrentUser: jest.fn(),
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
      COMPONENT DID MOUNT
    ******************** */
    describe('componentDidMount()', () => {
      it('should call getCurrentUser()', () => {
        const getCurrentUser = () =>
          passedProps.getCurrentUser.mock.calls.length;

        // Already called when shallow render created
        expect(getCurrentUser()).toEqual(1);
        wrapper.instance().componentDidMount();
        expect(getCurrentUser()).toEqual(2);
      });
    });

    /* ********************
             RENDER
    ******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'NavbarContainer').length).toEqual(1);
      });

      it('should render correct number of <NavItemPresentator />', () => {
        expect(findByTestId(wrapper, 'NavItemPresentator').length).toEqual(4);
      });

      it('should render <SearchContainer /> with a <ClickController />', () => {
        const search = findByTestId(wrapper, 'SearchContainer');
        const click = findByTestId(search.parent(), 'ClickController');

        expect(search.length).toEqual(1);
        expect(click.length).toEqual(1);
      });

      it('should render <NavDropdownContainer /> with a <ClickController />, or <Loading /> based on props', () => {
        const navDropdown = () => findByTestId(wrapper, 'NavDropdownContainer');
        const click = () =>
          findByTestId(navDropdown().parent(), 'ClickController');
        const loading = () => findByTestId(wrapper, 'Loading');

        // With user -> should render navDropdown with clickController
        expect(navDropdown().length).toEqual(1);
        expect(click().length).toEqual(1);
        expect(loading().length).toEqual(0);

        // No user -> should render loading
        wrapper.setProps({ user: null });
        expect(navDropdown().length).toEqual(0);
        expect(loading().length).toEqual(1);
      });
    });
  });
});
