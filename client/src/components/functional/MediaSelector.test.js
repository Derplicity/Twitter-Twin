import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId, checkProps } from '../../testUtils';

import { MediaSelector as Component } from './MediaSelector';

const setUp = (props = {}) => {
  const enzymeWrapper = shallow(<Component {...props} />);
  return {
    props,
    enzymeWrapper,
  };
};

/* ********************
     MEDIA SELECTOR
******************** */
describe('<MediaSelector />', () => {
  /* ********************
      CHECK PROPTYPES
  ******************** */
  describe('Check PropTypes', () => {
    it('should not throw a warning', () => {
      const expectedProps = {
        entities: {
          media: [
            {
              media_url_https: 'https://test.com/photo',
              type: 'photo',
              sizes: {
                large: {
                  w: 100,
                  h: 200,
                },
              },
            },
          ],
          urls: [
            {
              url: 'https://test.com/url',
            },
          ],
        },
        extended_entities: {
          media: [
            {
              type: 'video',
              media_url_https: 'https://test.com/video',
              video_info: {
                variants: [
                  {
                    content_type: 'mp4',
                    url: 'https://test.com/mp4',
                  },
                ],
              },
              sizes: {
                large: {
                  w: 300,
                  h: 150,
                },
              },
            },
          ],
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
        entities: {
          media: [
            {
              media_url_https: 'https://test.com/photo',
              type: 'photo',
              sizes: {
                large: {
                  w: 100,
                  h: 200,
                },
              },
            },
          ],
          urls: [
            {
              url: 'https://test.com/url',
            },
          ],
        },
        extended_entities: {
          media: [
            {
              type: 'video',
              media_url_https: 'https://test.com/video',
              video_info: {
                variants: [
                  {
                    content_type: 'mp4',
                    url: 'https://test.com/mp4',
                  },
                ],
              },
              sizes: {
                large: {
                  w: 300,
                  h: 150,
                },
              },
            },
          ],
        },
      };

      const { enzymeWrapper, props } = setUp(initialProps);

      wrapper = enzymeWrapper;
      passedProps = props;
    });

    it('should return null if necessary props do not exist', () => {
      expect(wrapper.children().length).not.toEqual(0);

      wrapper.setProps({
        entities: {},
        extended_entities: null,
      });

      expect(wrapper.children().length).toEqual(0);
    });

    it('should return <TweetVideoContainer /> if all conditions are met', () => {
      const tweetVideo = () => findByTestId(wrapper, 'TweetVideoContainer');

      // Should render with correct props
      expect(tweetVideo().length).toEqual(1);

      const extended_media = passedProps.extended_entities.media[0];
      const variant = extended_media.video_info.variants[0];

      const media_url = extended_media.media_url_https;
      const media_type = extended_media.type;
      const content_type = variant.content_type;
      const content_url = variant.url;

      expect(tweetVideo().props().media_url).toEqual(media_url);
      expect(tweetVideo().props().media_type).toEqual(media_type);
      expect(tweetVideo().props().content_type).toEqual(content_type);
      expect(tweetVideo().props().content_url).toEqual(content_url);

      let props = passedProps.extended_entities;
      props.media[0].type = 'photo';

      // type === photo -> should not render
      wrapper.setProps({
        extended_entities: props,
      });
      expect(tweetVideo().length).toEqual(0);

      // media.length === 0 -> should not render
      wrapper.setProps({
        extended_entities: {
          media: [],
        },
      });
      expect(tweetVideo().length).toEqual(0);

      // !media -> should not render
      wrapper.setProps({
        extended_entities: {
          media: null,
        },
      });
      expect(tweetVideo().length).toEqual(0);
    });

    it('should return <ImagePresentator /> if all conditions are met', () => {
      const image = () => findByTestId(wrapper, 'ImagePresentator');

      // Tweet Video takes precedence
      expect(image().length).toEqual(0);

      wrapper.setProps({
        extended_entities: {
          media: null,
        },
      });

      // Should render with correct props
      expect(image().length).toEqual(1);

      const media = passedProps.entities.media[0];

      const media_url = media.media_url_https;
      const media_type = media.type;

      expect(image().props().src).toEqual(media_url);
      expect(image().props().alt).toEqual(media_type);

      // media.length === 0 -> should not render
      wrapper.setProps({
        entities: {
          media: [],
        },
      });
      expect(image().length).toEqual(0);

      // !media -> should not render
      wrapper.setProps({
        entities: {
          media: null,
        },
      });
      expect(image().length).toEqual(0);
    });

    it('should return <StyledLinkCard /> if all conditions are met', () => {
      const linkCard = () => findByTestId(wrapper, 'StyledLinkCard');

      // Tweet Video takes precedence
      expect(linkCard().length).toEqual(0);

      wrapper.setProps({
        extended_entities: {
          media: null,
        },
      });

      // Image takes precedence
      expect(linkCard().length).toEqual(0);

      const props = passedProps.entities;
      props.media = null;

      wrapper.setProps({
        entities: props,
      });

      // Should render with correct props
      expect(linkCard().length).toEqual(1);

      const urls = passedProps.entities.urls;

      const url = urls[urls.length - 1].url;

      expect(linkCard().props().url).toEqual(url);

      // media.length === 0 -> should not render
      wrapper.setProps({
        entities: {
          urls: [],
        },
      });
      expect(linkCard().length).toEqual(0);

      // !media -> should not render
      wrapper.setProps({
        entities: {
          urls: null,
        },
      });
      expect(linkCard().length).toEqual(0);
    });
  });
});
