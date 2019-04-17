import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { UserCellPresentator as Component } from './UserCell';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
   USER CELL PRESENTATOR
******************** */
describe('<UserCellPresentator />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        user: {
          name: 'test_name',
          screen_name: 'test_screen_name',
          verified: false,
          profile_image_url_https: 'https://via.placeholder.com/150',
        },
        onUserClick: jest.fn(),
        onFollowClick: jest.fn(),
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
          name: 'test_name',
          screen_name: 'test_screen_name',
          verified: false,
          profile_image_url_https: 'https://via.placeholder.com/150',
        },
        onUserClick: jest.fn(),
        onFollowClick: jest.fn(),
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
        expect(findByTestId(wrapper, 'UserCellPresentator').length).toEqual(1);
      });

      it('should not render if user prop is not present', () => {
        wrapper.setProps({ user: null });

        expect(findByTestId(wrapper, 'UserCellPresentator').length).toEqual(0);
      });

      it('should render with correct props', () => {
        const link = findByTestId(wrapper, 'wrapperLink');

        // Exists
        expect(link.length).toEqual(1);

        // Click handler calles correct function with param
        expect(passedProps.onUserClick).toHaveBeenCalledTimes(0);
        link.simulate('click');
        expect(passedProps.onUserClick).toHaveBeenCalledTimes(1);
      });

      it('should render user image with correct props', () => {
        const image = findByTestId(wrapper, 'userImage');
        const props = image.props();
        const user = passedProps.user;

        // Exists with props
        expect(image.length).toEqual(1);
        expect(props.to).toEqual(`/${user.screen_name}`);
        expect(props.src).toEqual(user.profile_image_url_https);
        expect(props.alt).toEqual(user.name);
      });

      it('should render user link with correct props', () => {
        const link = findByTestId(wrapper, 'userLink');
        const props = link.props();

        expect(link.length).toEqual(1);
        expect(props.to).toEqual(`/${passedProps.user.screen_name}`);
      });

      it('should render user name with correct text', () => {
        const name = findByTestId(wrapper, 'userName');

        expect(name.length).toEqual(1);
        expect(name.text()).toEqual(passedProps.user.name);
      });

      it('should render verified icon based on props', () => {
        const verified = () => findByTestId(wrapper, 'verified');

        expect(verified().length).toEqual(0);

        const props = passedProps;
        passedProps.user.verified = true;
        wrapper.setProps(props);

        expect(verified().length).toEqual(1);
      });

      it('should render username with correct text', () => {
        const username = findByTestId(wrapper, 'userUsername');

        expect(username.length).toEqual(1);
        expect(username.text()).toEqual(`@${passedProps.user.screen_name}`);
      });

      it('should render user button with correct props', () => {
        const button = findByTestId(wrapper, 'followButton');

        // Exists
        expect(button.length).toEqual(1);

        // Click handler calles correct function with param
        expect(passedProps.onFollowClick).toHaveBeenCalledTimes(0);
        button.simulate('click');
        expect(passedProps.onFollowClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
