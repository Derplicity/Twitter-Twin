import React from 'react';
import { shallow } from 'enzyme';
import { findByTestId } from '../../testUtils';

import formatTweet from './formatTweet';

/* ********************
     FORMAT TWEET
******************** */
describe('formatTweet()', () => {
  /* ********************
       INVALID PARAMS
  ******************** */
  describe('Invalid params', () => {
    it('should return null', () => {
      expect(formatTweet()).toBeNull();
      expect(formatTweet({})).toBeNull();
    });
  });

  /* ********************
       USER MENTIONS
  ******************** */
  describe('User mentions', () => {
    it('should return formatted user mention', () => {
      const expectedMention = 'user';

      const data = {
        full_text: 'Test @user mentions',
        entities: {
          user_mentions: [
            {
              screen_name: expectedMention,
              indices: [5, 10],
            },
          ],
        },
      };

      const wrapper = shallow(<div>{formatTweet(data)}</div>);

      const link = findByTestId(wrapper, 'userMentionLink');
      const userMention = findByTestId(wrapper, 'userMention');

      expect(link.length).toEqual(1);
      expect(link.props().to).toEqual(`/${expectedMention}`);

      expect(userMention.length).toEqual(1);
      expect(userMention.text()).toEqual(`@${expectedMention}`);
    });

    it('should work for multiple mentions', () => {
      const expectedMentions = ['user', 'User2'];

      const data = {
        full_text: 'Test @user mentions, and also @User2',
        entities: {
          user_mentions: [
            {
              screen_name: expectedMentions[0],
              indices: [5, 10],
            },
            {
              screen_name: expectedMentions[1],
              indices: [30, 36],
            },
          ],
        },
      };

      const wrapper = shallow(<div>{formatTweet(data)}</div>);

      const links = findByTestId(wrapper, 'userMentionLink');
      const userMentions = findByTestId(wrapper, 'userMention');

      links.forEach((link, i) => {
        expect(link.length).toEqual(1);
        expect(link.props().to).toEqual(`/${expectedMentions[i]}`);
      });

      userMentions.forEach((userMention, i) => {
        expect(userMention.length).toEqual(1);
        expect(userMention.text()).toEqual(`@${expectedMentions[i]}`);
      });
    });
  });

  /* ********************
          HASHTAGS
  ******************** */
  describe('Hashtags', () => {
    it('should return formatted hashtag', () => {
      const expectedHashtag = 'hashtag';

      const data = {
        full_text: 'Test #hashtag works',
        entities: {
          hashtags: [
            {
              text: expectedHashtag,
              indices: [5, 13],
            },
          ],
        },
      };

      const wrapper = shallow(<div>{formatTweet(data)}</div>);

      const link = findByTestId(wrapper, 'hashtagLink');
      const hashtag = findByTestId(wrapper, 'hashtag');

      expect(link.length).toEqual(1);
      expect(link.props().to).toEqual(`/search?q=%23${expectedHashtag}`);

      expect(hashtag.length).toEqual(1);
      expect(hashtag.text()).toEqual(`#${expectedHashtag}`);
    });

    it('should work for multiple hashtags', () => {
      const expectedHashtags = ['hashtag', 'Hashtag2'];

      const data = {
        full_text: 'Test #hashtag works, and also #Hashtag2',
        entities: {
          hashtags: [
            {
              text: expectedHashtags[0],
              indices: [5, 13],
            },
            {
              text: expectedHashtags[1],
              indices: [30, 39],
            },
          ],
        },
      };

      const wrapper = shallow(<div>{formatTweet(data)}</div>);

      const links = findByTestId(wrapper, 'hashtagLink');
      const hashtags = findByTestId(wrapper, 'hashtag');

      links.forEach((link, i) => {
        expect(link.length).toEqual(1);
        expect(link.props().to).toEqual(`/search?q=%23${expectedHashtags[i]}`);
      });

      hashtags.forEach((hashtag, i) => {
        expect(hashtag.length).toEqual(1);
        expect(hashtag.text()).toEqual(`#${expectedHashtags[i]}`);
      });
    });
  });

  /* ********************
          CASHTAGS
  ******************** */
  describe('Cashtags', () => {
    it('should return formatted cashtag', () => {
      const expectedCashtag = 'cashtag';

      const data = {
        full_text: 'Test $cashtag works',
        entities: {
          symbols: [
            {
              text: expectedCashtag,
              indices: [5, 13],
            },
          ],
        },
      };

      const wrapper = shallow(<div>{formatTweet(data)}</div>);

      const link = findByTestId(wrapper, 'cashtagLink');
      const cashtag = findByTestId(wrapper, 'cashtag');

      expect(link.length).toEqual(1);
      expect(link.props().to).toEqual(`/search?q=%24${expectedCashtag}`);

      expect(cashtag.length).toEqual(1);
      expect(cashtag.text()).toEqual(`$${expectedCashtag}`);
    });

    it('should work for multiple cashtags', () => {
      const expectedCashtags = ['cashtag', 'Cashtag2'];

      const data = {
        full_text: 'Test $cashtag works, and also $Cashtag2',
        entities: {
          symbols: [
            {
              text: expectedCashtags[0],
              indices: [5, 13],
            },
            {
              text: expectedCashtags[1],
              indices: [30, 39],
            },
          ],
        },
      };

      const wrapper = shallow(<div>{formatTweet(data)}</div>);

      const links = findByTestId(wrapper, 'cashtagLink');
      const cashtags = findByTestId(wrapper, 'cashtag');

      links.forEach((link, i) => {
        expect(link.length).toEqual(1);
        expect(link.props().to).toEqual(`/search?q=%24${expectedCashtags[i]}`);
      });

      cashtags.forEach((cashtag, i) => {
        expect(cashtag.length).toEqual(1);
        expect(cashtag.text()).toEqual(`$${expectedCashtags[i]}`);
      });
    });
  });

  /* ********************
            URLS
  ******************** */
  describe('Urls', () => {
    it('should return formatted url', () => {
      const expectedUrl = 'https://test.com';
      const expectedDisplay = 'test.com';

      const data = {
        full_text: 'Test https://test.com works #notLastEntity',
        entities: {
          urls: [
            {
              url: expectedUrl,
              display_url: expectedDisplay,
              indices: [5, 21],
            },
          ],

          // Make sure not last entity so it renders
          hashtags: [
            {
              text: 'notLastEntity',
              indices: [28, 42],
            },
          ],
        },
      };

      const wrapper = shallow(<div>{formatTweet(data)}</div>);

      const link = findByTestId(wrapper, 'urlLink');
      const url = findByTestId(wrapper, 'url');

      expect(link.length).toEqual(1);
      expect(link.props().href).toEqual(expectedUrl);

      expect(url.length).toEqual(1);
      expect(url.text()).toEqual(expectedDisplay);
    });

    it('should work for multiple urls', () => {
      const expectedUrls = ['https://test.com', 'http://Test2.com'];
      const expectedDisplays = ['test.com', 'Test2.com'];

      const data = {
        full_text:
          'Test https://test.com works, and also http://Test2.com #notLastEntity',
        entities: {
          urls: [
            {
              url: expectedUrls[0],
              display_url: expectedDisplays[0],
              indices: [5, 21],
            },
            {
              url: expectedUrls[1],
              display_url: expectedDisplays[1],
              indices: [38, 54],
            },
          ],

          // Make sure not last entity so it renders
          hashtags: [
            {
              text: 'notLastEntity',
              indices: [55, 68],
            },
          ],
        },
      };

      const wrapper = shallow(<div>{formatTweet(data)}</div>);

      const links = findByTestId(wrapper, 'urlLink');
      const urls = findByTestId(wrapper, 'url');

      links.forEach((link, i) => {
        expect(link.length).toEqual(1);
        expect(link.props().href).toEqual(expectedUrls[i]);
      });

      urls.forEach((url, i) => {
        expect(url.length).toEqual(1);
        expect(url.text()).toEqual(expectedDisplays[i]);
      });
    });

    describe('Url as last entity', () => {
      it('should not return formatted url', () => {
        const expectedUrl = 'https://test.com';
        const expectedDisplay = 'test.com';

        const data = {
          full_text: 'Test https://test.com works',
          entities: {
            urls: [
              {
                url: expectedUrl,
                display_url: expectedDisplay,
                indices: [5, 21],
              },
            ],
          },
        };

        const wrapper = shallow(<div>{formatTweet(data)}</div>);

        const link = findByTestId(wrapper, 'urlLink');
        const url = findByTestId(wrapper, 'url');

        expect(link.length).toEqual(0);
        expect(url.length).toEqual(0);
      });

      it('should not return last formatted url', () => {
        const expectedUrls = ['https://test.com', 'http://Test2.com'];
        const expectedDisplays = ['test.com', 'Test2.com'];

        const data = {
          full_text:
            'Test https://test.com works, and also http://Test2.com #notLastEntity',
          entities: {
            urls: [
              {
                url: expectedUrls[0],
                display_url: expectedDisplays[0],
                indices: [5, 21],
              },
              {
                url: expectedUrls[1],
                display_url: expectedDisplays[1],
                indices: [38, 54],
              },
            ],
          },
        };

        const wrapper = shallow(<div>{formatTweet(data)}</div>);

        const link = findByTestId(wrapper, 'urlLink');
        const url = findByTestId(wrapper, 'url');

        expect(link.length).toEqual(1);
        expect(link.props().href).toEqual(expectedUrls[0]);

        expect(url.length).toEqual(1);
        expect(url.text()).toEqual(expectedDisplays[0]);
      });
    });
  });

  /* ********************
          MIXED
  ******************** */
  describe('Mixed', () => {
    it('should return formatted entities', () => {
      const expectedMention = 'user';
      const expectedHashtag = 'hashtag';
      const expectedCashtag = 'cashtag';
      const expectedUrl = 'https://test.com';
      const expectedDisplay = 'test.com';

      const data = {
        full_text:
          'Test @user can use https://test.com, #hashtag, and $cashtag',
        entities: {
          user_mentions: [
            {
              screen_name: expectedMention,
              indices: [5, 10],
            },
          ],
          hashtags: [
            {
              text: expectedHashtag,
              indices: [37, 45],
            },
          ],
          symbols: [
            {
              text: expectedCashtag,
              indices: [51, 59],
            },
          ],
          urls: [
            {
              url: expectedUrl,
              display_url: expectedDisplay,
              indices: [19, 35],
            },
          ],
        },
      };

      const wrapper = shallow(<div>{formatTweet(data)}</div>);

      // Chick user mention
      let link = findByTestId(wrapper, 'userMentionLink');
      const userMention = findByTestId(wrapper, 'userMention');

      expect(link.length).toEqual(1);
      expect(link.props().to).toEqual(`/${expectedMention}`);

      expect(userMention.length).toEqual(1);
      expect(userMention.text()).toEqual(`@${expectedMention}`);

      // Check hashtag
      link = findByTestId(wrapper, 'hashtagLink');
      const hashtag = findByTestId(wrapper, 'hashtag');

      expect(link.length).toEqual(1);
      expect(link.props().to).toEqual(`/search?q=%23${expectedHashtag}`);

      expect(hashtag.length).toEqual(1);
      expect(hashtag.text()).toEqual(`#${expectedHashtag}`);

      // Check cashtag
      link = findByTestId(wrapper, 'cashtagLink');
      const cashtag = findByTestId(wrapper, 'cashtag');

      expect(link.length).toEqual(1);
      expect(link.props().to).toEqual(`/search?q=%24${expectedCashtag}`);

      expect(cashtag.length).toEqual(1);
      expect(cashtag.text()).toEqual(`$${expectedCashtag}`);

      // Check url
      link = findByTestId(wrapper, 'urlLink');
      const url = findByTestId(wrapper, 'url');

      expect(link.length).toEqual(1);
      expect(link.props().href).toEqual(expectedUrl);

      expect(url.length).toEqual(1);
      expect(url.text()).toEqual(expectedDisplay);
    });
  });
});
