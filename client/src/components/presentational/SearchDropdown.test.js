import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { SearchDropdownPresentator as Component } from './SearchDropdown';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    SEARCH DROPDOWN
      PRESENTATOR
******************** */
describe('<SearchDropdownPresentator />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        users: [
          {
            id_str: '0123456789',
            name: 'test',
            screen_name: 'test2',
            profile_image_url_https: 'https://test.com/image',
            following: false,
          },
          {
            id_str: '123456780',
            name: 'test2',
            screen_name: 'test3',
            profile_image_url_https: 'https://test2.com/image',
            following: true,
          },
        ],
        trends: [
          {
            name: 'test',
            query: 'test2',
            tweet_volume: '100K',
          },
          {
            name: 'test2',
            query: 'test3',
            tweet_volume: '200K',
          },
        ],
        handleClickSubmit: jest.fn(),
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
        users: [
          {
            id_str: '0123456789',
            name: 'test',
            screen_name: 'test2',
            profile_image_url_https: 'https://test.com/image',
            following: false,
          },
          {
            id_str: '123456780',
            name: 'test2',
            screen_name: 'test3',
            profile_image_url_https: 'https://test2.com/image',
            following: true,
          },
        ],
        trends: [
          {
            name: 'test',
            query: 'test2',
            tweet_volume: '100K',
          },
          {
            name: 'test2',
            query: 'test3',
            tweet_volume: '200K',
          },
        ],
        handleClickSubmit: jest.fn(),
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
          findByTestId(wrapper, 'SearchDropdownPresentator').length,
        ).toEqual(1);
      });

      it('should render placeholder if users and trends are not present', () => {
        // users && trends exist -> no render placeholer
        expect(findByTestId(wrapper, 'placeholder').length).toEqual(0);

        wrapper.setProps({
          users: [],
        });

        // !users && trends exist -> no render placeholer
        expect(findByTestId(wrapper, 'placeholder').length).toEqual(0);

        wrapper.setProps({
          trends: [],
        });

        // !users && !trends exist -> render placeholer
        expect(findByTestId(wrapper, 'placeholder').length).toEqual(1);

        wrapper.setProps({
          users: [
            {
              id_str: '0123456789',
              name: 'test',
              screen_name: 'test2',
              profile_image_url_https: 'https://test.com/image',
              following: false,
            },
          ],
        });

        // users && !trends exist -> no render placeholer
        expect(findByTestId(wrapper, 'placeholder').length).toEqual(0);
      });

      it('should render trend items if trends exist', () => {
        const items = () => findByTestId(wrapper, 'trendItem');

        // trends.length === 2 -> render 2 items
        expect(items().length).toEqual(2);

        wrapper.setProps({ trends: [] });

        // trends.length === 0 -> render 0 items
        expect(items().length).toEqual(0);
      });

      it('should render correct children with correct props, for each trend item', () => {
        const items = () => findByTestId(wrapper, 'trendItem');

        items().forEach((item, i) => {
          const children = item.children();

          // Renders a link with correct props
          const link = findByTestId(children, 'trendLink');

          const expectedTo = `/search?q=${passedProps.trends[i].query}`;
          const expectedOnClick = passedProps.handleClickSubmit;

          expect(link.length).toEqual(1);
          expect(link.props().to).toEqual(expectedTo);
          expect(link.props().onClick).toEqual(expectedOnClick);

          // Renders a name with correct text
          const name = findByTestId(children, 'trendName');

          let expectedText = passedProps.trends[i].name;

          expect(name.length).toEqual(1);
          expect(name.text()).toEqual(expectedText);

          // Renders trend volume with correct text, based on props
          const child = () => items().at(i);
          const volume = () => findByTestId(child(), 'trendVolume');

          const props = passedProps.trends;

          // !tweet_volume -> no render
          props[i].tweet_volume = null;

          wrapper.setProps({ trends: props });

          expect(volume().length).toEqual(0);

          // tweet_volume -> render with correct text
          const expectedVolume = '100K';

          props[i].tweet_volume = expectedVolume;

          expectedText = `${expectedVolume} Tweets`;

          wrapper.setProps({ trends: props });

          expect(volume().length).toEqual(1);
          expect(volume().text()).toEqual(expectedText);
        });
      });

      it('should render a separator based on props', () => {
        const separator = () => findByTestId(wrapper, 'separator');

        // users && trends -> render
        expect(separator().length).toEqual(1);

        // users && !trends -> no render
        wrapper.setProps({ trends: [] });
        expect(separator().length).toEqual(0);

        // !users && !trends -> no render
        wrapper.setProps({ users: [] });
        expect(separator().length).toEqual(0);

        // !users && trends -> no render
        wrapper.setProps({
          trends: [
            {
              name: 'test',
              query: 'test2',
              tweet_volume: '100K',
            },
            {
              name: 'test2',
              query: 'test3',
              tweet_volume: '200K',
            },
          ],
        });
        expect(separator().length).toEqual(0);
      });

      it('should render user items if users exist', () => {
        const items = () => findByTestId(wrapper, 'userItem');

        items().forEach((item, i) => {
          const children = item.children();

          // Renders a link with correct props
          const link = findByTestId(children, 'userLink');

          const expectedTo = `/${passedProps.users[i].screen_name}`;
          const expectedOnClick = passedProps.handleClickSubmit;

          expect(link.length).toEqual(1);
          expect(link.props().to).toEqual(expectedTo);
          expect(link.props().onClick).toEqual(expectedOnClick);

          // Renders an image with correct props
          const image = findByTestId(children, 'userImage');

          const expectedSrc = passedProps.users[i].profile_image_url_https;
          const expectedAlt = passedProps.users[i].name;

          expect(image.length).toEqual(1);
          expect(image.props().src).toEqual(expectedSrc);
          expect(image.props().alt).toEqual(expectedAlt);

          // Renders user following based on props
          const child = () => items().at(i);
          const following = () => findByTestId(child(), 'userFollowing');

          const props = passedProps.users;

          // !following -> no render
          props[i].following = false;

          wrapper.setProps({ users: props });

          expect(following().length).toEqual(0);

          // following -> render
          props[i].following = true;

          wrapper.setProps({ users: props });

          expect(following().length).toEqual(1);

          // Renders a name with correct text
          const name = findByTestId(children, 'userName');

          let expectedText = passedProps.users[i].name;

          expect(name.length).toEqual(1);
          expect(name.text()).toEqual(expectedText);

          // Renders a username with correct text
          const username = findByTestId(children, 'userUsername');

          expectedText = `@${passedProps.users[i].screen_name}`;

          expect(username.length).toEqual(1);
          expect(username.text()).toEqual(expectedText);
        });
      });
    });
  });
});
