import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { TweetPresentator as Component } from './Tweet';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
    TWEET PRESENTATOR
******************** */
describe('<TweetPresentator />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        data: {
          likeCount: 68,
          isLiked: true,
          retweetCount: 10,
          isRetweeted: true,
          entities: { id: 'entities' },
          extended_entities: { id: 'extended_entities' },
          name: 'test',
          username: 'test2',
          id_str: '0123456789',
          isRetweet: true,
          oImgSrc: 'https://test.com/image',
          oName: 'test3',
          oUsername: 'test4',
          oIsVerified: true,
          timeCreated: new Date().toString(),
          time: {
            createdStr: '12:58 PM • Jan 16, 1998',
            since: '4m',
          },
          formattedText: [<span key="testKey">this is a tweet</span>],
          handleTweetClick: jest.fn(),
          handleAction: jest.fn(),
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
        data: {
          likeCount: 68,
          isLiked: true,
          retweetCount: 10,
          isRetweeted: true,
          entities: {},
          extended_entities: {},
          name: 'test',
          username: 'test2',
          id_str: '0123456789',
          isRetweet: true,
          oImgSrc: 'https://test.com/image',
          oName: 'test3',
          oUsername: 'test4',
          oIsVerified: true,
          timeCreated: new Date().toString(),
          time: {
            createdStr: '12:58 PM • Jan 16, 1998',
            since: '4m',
          },
          formattedText: [<span key="testKey">this is a tweet</span>],
          handleTweetClick: jest.fn(),
          handleAction: jest.fn(),
        },
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
        expect(findByTestId(wrapper, 'TweetPresentator').length).toEqual(1);
      });

      it('should not render if data prop is not present', () => {
        wrapper.setProps({ data: null });

        expect(findByTestId(wrapper, 'TweetPresentator').length).toEqual(0);
      });

      it('should render an interactive area with correct props', () => {
        const area = findByTestId(wrapper, 'interactiveArea');

        // Renders
        expect(area.length).toEqual(1);

        // Check click handler calls correct function
        expect(passedProps.data.handleTweetClick).toHaveBeenCalledTimes(0);
        area.simulate('click');
        expect(passedProps.data.handleTweetClick).toHaveBeenCalledTimes(1);
      });

      it('should render <HatPresentator /> with correct props, based on props', () => {
        const hat = () => findByTestId(wrapper, 'HatPresentator');
        const props = hat().props();

        // isRetweet -> renders with props
        expect(hat().length).toEqual(1);
        expect(props.to).toEqual(`/${passedProps.data.username}`);
        expect(props.text).toEqual(passedProps.data.name);

        // !isRetweet -> no render
        passedProps.data.isRetweet = false;
        wrapper.setProps({ data: passedProps.data });

        expect(hat().length).toEqual(0);
      });

      it('should render a user image with correct props', () => {
        const image = findByTestId(wrapper, 'userImage');
        const props = image.props();

        // Renders with props
        expect(image.length).toEqual(1);
        expect(props.to).toEqual(`/${passedProps.data.oUsername}`);
        expect(props.src).toEqual(passedProps.data.oImgSrc);
        expect(props.alt).toEqual(passedProps.data.oUsername);
      });

      it('should render a text link with correct props', () => {
        const link = findByTestId(wrapper, 'textLink');
        const props = link.props();

        // Renders with props
        expect(link.length).toEqual(1);
        expect(props.to).toEqual(`/${passedProps.data.oUsername}`);
      });

      it('should render a name with correct text', () => {
        const name = findByTestId(wrapper, 'textName');

        // Renders with text
        expect(name.length).toEqual(1);
        expect(name.text()).toEqual(passedProps.data.oName);
      });

      it('should render verified based on props', () => {
        const verified = () => findByTestId(wrapper, 'verified');

        // oIsVerified -> render
        expect(verified().length).toEqual(1);

        // !oIsVerified -> no render
        passedProps.data.oIsVerified = false;
        wrapper.setProps({ data: passedProps.data });

        expect(verified().length).toEqual(0);
      });

      it('should render a username with correct text', () => {
        const username = findByTestId(wrapper, 'textUsername');

        // Renders with text
        expect(username.length).toEqual(1);
        expect(username.text()).toEqual(`@${passedProps.data.oUsername}`);
      });

      it('should render a time link with correct props', () => {
        const link = findByTestId(wrapper, 'timeLink');
        const props = link.props();

        // Renders with props
        expect(link.length).toEqual(1);
        expect(props.to).toEqual(
          `/${passedProps.data.username}/status/${passedProps.data.id_str}`,
        );
        expect(props.title).toEqual(passedProps.data.time.createdStr);
      });

      it('should render time text with correct props and text', () => {
        const time = findByTestId(wrapper, 'timeText');
        const props = time.props();

        // Renders with props and text
        expect(time.length).toEqual(1);
        expect(time.text()).toEqual(passedProps.data.time.since);
        expect(props.dateTime).toEqual(passedProps.data.timeCreated);
      });

      it('should render tweet text with correct children', () => {
        const tweet = findByTestId(wrapper, 'tweetText');

        // Renders with children
        expect(tweet.length).toEqual(1);
        expect(tweet.childAt(0)).toEqual(
          shallow(passedProps.data.formattedText[0]),
        );
      });

      it('should render a <MediaSelector /> with correct props', () => {
        const selector = findByTestId(wrapper, 'MediaSelector');
        const props = selector.props();

        // Renders with props
        expect(selector.length).toEqual(1);
        expect(props.entities).toEqual(passedProps.data.entities);
        expect(props.extended_entities).toEqual(
          passedProps.data.extended_entities,
        );
      });

      it('should render a comment action with correct props', () => {
        const comment = findByTestId(wrapper, 'comment');
        const props = comment.props();

        // Renders with props
        expect(comment.length).toEqual(1);
        expect(props.onAction).toEqual(passedProps.data.handleAction);
      });

      it('should render a retweet action with correct props', () => {
        const retweet = findByTestId(wrapper, 'retweet');
        const props = retweet.props();

        // Renders with props
        expect(retweet.length).toEqual(1);
        expect(props.onAction).toEqual(passedProps.data.handleAction);
        expect(props.isActive).toEqual(passedProps.data.isRetweeted);
        expect(props.count).toEqual(passedProps.data.retweetCount);
      });

      it('should render a like action with correct props', () => {
        const like = findByTestId(wrapper, 'like');
        const props = like.props();

        // Renders with props
        expect(like.length).toEqual(1);
        expect(props.onAction).toEqual(passedProps.data.handleAction);
        expect(props.isActive).toEqual(passedProps.data.isLiked);
        expect(props.count).toEqual(passedProps.data.likeCount);
      });

      it('should render a share action with correct props', () => {
        const share = findByTestId(wrapper, 'share');
        const props = share.props();

        // Renders with props
        expect(share.length).toEqual(1);
        expect(props.onAction).toEqual(passedProps.data.handleAction);
      });
    });
  });
});
