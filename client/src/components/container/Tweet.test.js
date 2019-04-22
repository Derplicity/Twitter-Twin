import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestId } from '../../testUtils';

import { TweetContainer as Component } from './Tweet';

import getTimeSince from '../util/getTimeSince';
import formatTweet from '../util/formatTweet';

jest.mock('../util/getTimeSince');
jest.mock('../util/formatTweet');

getTimeSince.mockImplementation(() => ({
  createdStr: '12:58 PM • Jan 16, 1998',
  since: '4m',
}));
formatTweet.mockImplementation(() => [<span>this is a tweet</span>]);

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    TWEET CONTAINER
******************** */
describe('<TweetContainer />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        data: {
          id_str: '0123456789',
          created_at: new Date().toString(),
          entities: {},
          favorite_count: 5,
          favorited: false,
          retweet_count: 2,
          retweeted: true,
          extended_entities: {},
          user: {
            name: 'test',
            screen_name: 'tester',
            verified: false,
            profile_image_url_https: 'https://via.placeholder.com/300',
          },
          retweeted_status: {
            created_at: new Date().toString(),
            entities: {},
            extended_entities: {},
            user: {
              name: 'test2',
              screen_name: 'tester2',
              verified: true,
              profile_image_url_https: 'https://via.placeholder.com/300',
            },
          },
        },
        calcItemHeight: jest.fn(),
        addStatusAction: jest.fn(),
        removeStatusAction: jest.fn(),
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
        data: {
          id_str: '0123456789',
          created_at: new Date().toString(),
          entities: {},
          favorite_count: 5,
          favorited: false,
          retweet_count: 2,
          retweeted: true,
          extended_entities: {},
          user: {
            name: 'test',
            screen_name: 'tester',
            verified: false,
            profile_image_url_https: 'https://via.placeholder.com/300',
          },
          retweeted_status: {
            created_at: new Date().toString(),
            entities: {},
            extended_entities: {},
            user: {
              name: 'test2',
              screen_name: 'tester2',
              verified: true,
              profile_image_url_https: 'https://via.placeholder.com/300',
            },
          },
        },
        calcItemHeight: jest.fn(),
        addStatusAction: jest.fn(),
        removeStatusAction: jest.fn(),

        history: [],
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    /* ********************
       COMPONENT DID MOUNT
    ******************** */
    describe('componentDidMount()', () => {
      it('should call calcItemHeight() when node exists', () => {
        const calcItemHeight = () =>
          passedProps.calcItemHeight.mock.calls.length;

        expect(calcItemHeight()).toEqual(0);
        wrapper.instance().componentDidMount();
        expect(calcItemHeight()).toEqual(0);
        wrapper.instance().node = true;
        wrapper.instance().componentDidMount();
        expect(calcItemHeight()).toEqual(1);
      });

      it('should set state when data exists', () => {
        const state = () => wrapper.state();
        let newProps = passedProps.data;

        newProps.favorite_count = 10;
        newProps.favorited = true;
        newProps.retweet_count = 5;
        newProps.retweeted = false;

        let expectedState = {
          likeCount: newProps.favorite_count,
          isLiked: newProps.favorited,
          retweetCount: newProps.retweet_count,
          isRetweeted: newProps.retweeted,
        };

        // State will change with props
        wrapper.setProps({ data: newProps });
        wrapper.instance().componentDidMount();
        expect(state()).toEqual(expectedState);

        // State will stay unaltered
        wrapper.setProps({ data: null });
        wrapper.instance().componentDidMount();
        expect(state()).toEqual(expectedState);
      });
    });

    /* ********************
		     HANDLE TWEET CLICK
		   ******************** */
    describe('handleTweetClick()', () => {
      it('should change url path when target === currentTarget', () => {
        const history = () => passedProps.history;
        const prevHistory = history();
        const url = `/${passedProps.data.user.screen_name}/status/${
          passedProps.data.id_str
        }`;
        const expectedHistory = [url];
        let e = {
          target: 0,
          currentTarget: 1,
        };

        // target !== currentTarget -> no change url path
        wrapper.instance().handleTweetClick(e);
        expect(history()).toEqual(prevHistory);

        // target === currentTarget -> change url path
        e.target = 1;
        wrapper.instance().handleTweetClick(e);
        expect(history()).toEqual(expectedHistory);
      });
    });

    /* ********************
			     HANDLE ACTION
			******************** */
    describe('handleAction()', () => {
      it('should call the correct function based on type', () => {
        const addStatusAction = () =>
          passedProps.addStatusAction.mock.calls.length;
        const removeStatusAction = () =>
          passedProps.removeStatusAction.mock.calls.length;

        const state = () => wrapper.state();
        const prevState = { ...state() };

        let expectedState = prevState;

        const likeChange = () => {
          expectedState.likeCount += expectedState.isLiked ? -1 : 1;
          expectedState.isLiked = !expectedState.isLiked;
        };

        const retweetChange = () => {
          expectedState.retweetCount += expectedState.isRetweeted ? -1 : 1;
          expectedState.isRetweeted = !expectedState.isRetweeted;
        };

        // No previous calls
        expect(addStatusAction()).toEqual(0);
        expect(removeStatusAction()).toEqual(0);

        // Like / Unlike
        likeChange();
        wrapper.instance().handleAction('heart');
        expect(state()).toEqual(expectedState);

        // Unlike / Like
        likeChange();
        wrapper.instance().handleAction('heart');
        expect(state()).toEqual(expectedState);

        // Each called 1 times
        expect(addStatusAction()).toEqual(1);
        expect(removeStatusAction()).toEqual(1);

        // Retweet / Unretweet
        retweetChange();
        wrapper.instance().handleAction('retweet');
        expect(state()).toEqual(expectedState);

        // Unretweet / Retweet
        retweetChange();
        wrapper.instance().handleAction('retweet');
        expect(state()).toEqual(expectedState);

        // Each called 2 times
        expect(addStatusAction()).toEqual(2);
        expect(removeStatusAction()).toEqual(2);
      });
    });

    /* ********************
			        RENDER
			******************** */
    describe('render()', () => {
      it('should render without errors', () => {
        expect(findByTestId(wrapper, 'TweetContainer').length).toEqual(1);
      });

      it('should not render if props are invalid', () => {
        wrapper.setProps({ data: null });
        expect(findByTestId(wrapper, 'TweetContainer').length).toEqual(0);
      });

      it('should render <TweetPresentator /> with correct props', () => {
        const tweet = () => findByTestId(wrapper, 'TweetPresentator');

        // TweetPresentator exists
        expect(tweet().length).toEqual(1);

        const state = wrapper.state();
        const props = passedProps.data;

        // Same no matter if it is a retweet
        const baseExpectedProps = {
          likeCount: state.likeCount,
          isLiked: state.isLiked,
          retweetCount: state.retweetCount,
          isRetweeted: state.isRetweeted,
          entities: props.entities,
          extended_entities: props.extended_entities,
          name: props.user.name,
          username: props.user.screen_name,
          id_str: props.id_str,
          time: getTimeSince(),
          formattedText: formatTweet(),
          handleTweetClick: wrapper.instance().handleTweetClick,
          handleAction: wrapper.instance().handleAction,
        };

        // Expected when a retweet
        let expectedProps = {
          ...baseExpectedProps,
          isRetweet: !!props.retweeted_status,
          oImgSrc: props.retweeted_status.user.profile_image_url_https,
          oName: props.retweeted_status.user.name,
          oUsername: props.retweeted_status.user.screen_name,
          oIsVerified: props.retweeted_status.user.verified,
          timeCreated: props.retweeted_status.created_at,
        };

        wrapper.instance().render();
        expect(tweet().props().data).toEqual(expectedProps);

        const newProps = props;
        newProps.retweeted_status = undefined;

        // Expected when not a retweet
        expectedProps = {
          ...baseExpectedProps,
          isRetweet: !!props.retweeted_status,
          oImgSrc: props.user.profile_image_url_https,
          oName: props.user.name,
          oUsername: props.user.screen_name,
          oIsVerified: props.user.verified,
          timeCreated: props.created_at,
        };

        wrapper.setProps({ data: newProps });
        wrapper.instance().render();
        expect(tweet().props().data).toEqual(expectedProps);
      });
    });
  });
});
