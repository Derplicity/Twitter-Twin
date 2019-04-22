import React from 'react';
import PropTypes from 'prop-types';

import MediaSelector from '../functional/MediaSelector';

import Hat from './Hat';
import Image from './Image';
import Action from './Action';

import { Tweet, Text, Icon, Body } from '../styles';

const propTypes = {
  data: PropTypes.shape({
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    retweetCount: PropTypes.number.isRequired,
    isRetweeted: PropTypes.bool.isRequired,
    entities: PropTypes.object.isRequired,
    extended_entities: PropTypes.object,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id_str: PropTypes.string.isRequired,
    isRetweet: PropTypes.bool,
    oImgSrc: PropTypes.string.isRequired,
    oName: PropTypes.string.isRequired,
    oUsername: PropTypes.string.isRequired,
    oIsVerified: PropTypes.bool,
    timeCreated: PropTypes.string.isRequired,
    time: PropTypes.shape({
      createdStr: PropTypes.string.isRequired,
      since: PropTypes.string.isRequired,
    }).isRequired,
    formattedText: PropTypes.arrayOf(PropTypes.element.isRequired),
    handleTweetClick: PropTypes.func.isRequired,
    handleAction: PropTypes.func.isRequired,
  }),
};

const defaultProps = {
  data: null,
};

export function TweetPresentator(props) {
  const { data } = props;

  if (!data) return null;

  const {
    likeCount,
    isLiked,
    retweetCount,
    isRetweeted,
    entities,
    extended_entities,
    name,
    username,
    id_str,
    isRetweet,
    oImgSrc,
    oName,
    oUsername,
    oIsVerified,
    timeCreated,
    time,
    formattedText,
    handleTweetClick,
    handleAction,
  } = data;

  const userUrl = `/${username}`;
  const oUserUrl = `/${oUsername}`;
  const tweetUrl = `/${username}/status/${id_str}`;

  return (
    <Tweet.Wrapper data-testid="TweetPresentator">
      <Tweet.Interactive
        transitionto="blueGrey__light"
        onClick={handleTweetClick}
        data-testid="interactiveArea"
      >
        <Tweet role="article" tabIndex="0">
          {isRetweet && (
            <Hat to={userUrl} text={name} data-testid="HatPresentator" />
          )}
          <Tweet.Skeleton>
            <Tweet.Aside>
              <Image
                to={oUserUrl}
                src={oImgSrc}
                alt={oUsername}
                isCircle
                isSmall
                data-testid="userImage"
              />
            </Tweet.Aside>
            <Tweet.Main>
              <Tweet.Content>
                <Tweet.Header>
                  <Tweet.Header.Content>
                    <Text.InternalLink to={oUserUrl} data-testid="textLink">
                      <Text.Group>
                        <Text
                          enableCrop
                          bold
                          decor
                          color="white"
                          data-testid="textName"
                        >
                          {oName}
                        </Text>
                        {oIsVerified && (
                          <Icon.Wrapper
                            style={{
                              marginLeft: '2px',
                            }}
                            small
                            data-testid="verified"
                          >
                            <Icon
                              icon={['fas', 'check-circle']}
                              color="white"
                            />
                          </Icon.Wrapper>
                        )}
                      </Text.Group>
                      <Text
                        enableCrop
                        color="grey"
                        style={{ margin: '0 0 0 5px' }}
                        data-testid="textUsername"
                      >
                        @{oUsername}
                      </Text>
                    </Text.InternalLink>
                    <Text.Group>
                      <Text
                        style={{
                          padding: '0 5px',
                        }}
                        color="grey"
                      >
                        •
                      </Text>
                      <Text.InternalLink
                        to={tweetUrl}
                        title={time.createdStr}
                        data-testid="timeLink"
                      >
                        <Text
                          as="time"
                          dateTime={timeCreated}
                          color="grey"
                          decor
                          data-testid="timeText"
                        >
                          {time.since}
                        </Text>
                      </Text.InternalLink>
                    </Text.Group>
                  </Tweet.Header.Content>
                  <Tweet.Header.Actions>
                    <Action type="caret-down" isSmall />
                  </Tweet.Header.Actions>
                </Tweet.Header>
                <Body>
                  <Text color="white" data-testid="tweetText">
                    {formattedText}
                  </Text>
                </Body>
                <MediaSelector
                  entities={entities}
                  extended_entities={extended_entities}
                  data-testid="MediaSelector"
                />
              </Tweet.Content>
              <Tweet.Actions>
                <Action
                  type="comment"
                  onAction={handleAction}
                  data-testid="comment"
                />
                <Action
                  type="retweet"
                  isActive={isRetweeted}
                  count={retweetCount}
                  onAction={handleAction}
                  data-testid="retweet"
                />
                <Action
                  type="heart"
                  isActive={isLiked}
                  count={likeCount}
                  onAction={handleAction}
                  data-testid="like"
                />
                <Action
                  type="upload"
                  onAction={handleAction}
                  data-testid="share"
                />
              </Tweet.Actions>
            </Tweet.Main>
          </Tweet.Skeleton>
        </Tweet>
      </Tweet.Interactive>
    </Tweet.Wrapper>
  );
}

TweetPresentator.propTypes = propTypes;
TweetPresentator.defaultProp = defaultProps;

export default TweetPresentator;
