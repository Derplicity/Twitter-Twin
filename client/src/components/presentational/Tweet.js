import React from 'react';

import MediaSelector from '../functional/MediaSelector';

import Hat from './Hat';
import Image from './Image';
import Action from './Action';

import { Tweet, Text, Icon, Body } from '../styles';

export default function({ data }) {
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
    <Tweet.Wrapper>
      <Tweet.Interactive
        transitionto="blueGrey__light"
        onClick={handleTweetClick}
      >
        <Tweet role="article" tabIndex="0">
          {isRetweet && <Hat to={userUrl} text={name} />}
          <Tweet.Skeleton>
            <Tweet.Aside>
              <Image
                to={oUserUrl}
                src={oImgSrc}
                alt={oUsername}
                isCircle
                isSmall
              />
            </Tweet.Aside>
            <Tweet.Main>
              <Tweet.Content>
                <Tweet.Header>
                  <Tweet.Header.Content>
                    <Text.InternalLink to={oUserUrl}>
                      <Text.Group>
                        <Text enableCrop bold decor color="white">
                          {oName}
                        </Text>
                        {oIsVerified && (
                          <Icon.Wrapper
                            style={{
                              marginLeft: '2px',
                            }}
                            small
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
                      <Text.InternalLink to={tweetUrl} title={time.createdStr}>
                        <Text
                          as="time"
                          dateTime={timeCreated}
                          color="grey"
                          decor
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
                  <Text color="white">{formattedText}</Text>
                </Body>
                <MediaSelector
                  entities={entities}
                  extended_entities={extended_entities}
                />
              </Tweet.Content>
              <Tweet.Actions>
                <Action type="comment" onAction={handleAction} />
                <Action
                  type="retweet"
                  isActive={isRetweeted}
                  count={retweetCount}
                  onAction={handleAction}
                />
                <Action
                  type="heart"
                  isActive={isLiked}
                  count={likeCount}
                  onAction={handleAction}
                />
                <Action type="upload" onAction={handleAction} />
              </Tweet.Actions>
            </Tweet.Main>
          </Tweet.Skeleton>
        </Tweet>
      </Tweet.Interactive>
    </Tweet.Wrapper>
  );
}
