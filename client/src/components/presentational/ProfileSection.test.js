import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { ProfileSectionPresentator as Component } from './ProfileSection';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
  PROFILE SECTION PRESENTATOR
******************** */
describe('<ProfileSectionPresentator />', () => {
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
        user: {
          name: 'test',
          screen_name: 'test2',
          profile_image_url_https: 'https://test.com/image',
          friends_count_formatted: '100K',
          followers_count_formatted: '20M',
        },
        onClick: jest.fn(),
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
          findByTestId(wrapper, 'ProfileSectionPresentator').length,
        ).toEqual(1);
      });

      it('should not render if user prop is not present', () => {
        wrapper.setProps({ user: null });

        expect(
          findByTestId(wrapper, 'ProfileSectionPresentator').length,
        ).toEqual(0);
      });

      it('should render a profile link with correct props', () => {
        const link = findByTestId(wrapper, 'profileLink');
        const props = link.props();

        // Renders with props
        expect(link.length).toEqual(1);
        expect(props.to).toEqual(`/${passedProps.user.screen_name}`);

        // Check click handler
        expect(passedProps.onClick).toHaveBeenCalledTimes(0);
        link.simulate('click');
        expect(passedProps.onClick).toHaveBeenCalledTimes(1);
      });

      it('should render profile image with correct props', () => {
        const image = findByTestId(wrapper, 'profileImage');
        const props = image.props();

        // Renders with props
        expect(image.length).toEqual(1);
        expect(props.src).toEqual(passedProps.user.profile_image_url_https);
        expect(props.alt).toEqual(passedProps.user.name);
      });

      it('should render profile name with correct text', () => {
        const name = findByTestId(wrapper, 'profileName');

        // Renders with text
        expect(name.length).toEqual(1);
        expect(name.text()).toEqual(passedProps.user.name);
      });

      it('should render profile username with correct text', () => {
        const username = findByTestId(wrapper, 'profileUsername');

        // Renders with text
        expect(username.length).toEqual(1);
        expect(username.text()).toEqual(`@${passedProps.user.screen_name}`);
      });

      it('should render follow links with correct props', () => {
        const links = findByTestId(wrapper, 'followLink');

        expect(links.length).toEqual(2);

        links.forEach((link, i) => {
          // Check click handler
          expect(passedProps.onClick).toHaveBeenCalledTimes(i);
          link.simulate('click');
          expect(passedProps.onClick).toHaveBeenCalledTimes(i + 1);
        });
      });

      it('should render friend count with correct text', () => {
        const count = findByTestId(wrapper, 'friendCount');

        expect(count.length).toEqual(1);
        expect(count.text()).toEqual(passedProps.user.friends_count_formatted);
      });

      it('should render follower count with correct text', () => {
        const count = findByTestId(wrapper, 'followCount');

        expect(count.length).toEqual(1);
        expect(count.text()).toEqual(
          passedProps.user.followers_count_formatted,
        );
      });
    });
  });
});
