import React from 'react';

import Text from '../styles/Text';

export default function formatTweet(tweetData) {
  if (!tweetData || Object.keys(tweetData).length === 0) {
    return null;
  }

  let tweet = tweetData;

  let json = tweet.retweeted_status
    ? tweet.retweeted_status.entities
    : tweet.entities;
  let text = tweet.retweeted_status
    ? tweet.retweeted_status.full_text
    : tweet.full_text;

  if (json.user_mentions) {
    for (let i = 0; i < json.user_mentions.length; i++) {
      json.user_mentions[i].screenName = json.user_mentions[i].screen_name;
    }
  }

  if (json.hashtags) {
    for (let i = 0; i < json.hashtags.length; i++) {
      json.hashtags[i].hashtag = json.hashtags[i].text;
    }
  }

  if (json.symbols) {
    for (let i = 0; i < json.symbols.length; i++) {
      json.symbols[i].cashtag = json.symbols[i].text;
    }
  }

  let entities = [];
  for (const key in json) {
    entities = entities.concat(json[key]);
  }

  // sort entities by start index
  entities.sort(function(a, b) {
    return a.indices[0] - b.indices[0];
  });

  let result = [];

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const entityText = entity.hashtag
      ? `#${entity.hashtag}`
      : entity.screenName
      ? `@${entity.screenName}`
      : entity.cashtag
      ? `$${entity.cashtag}`
      : entity.url
      ? entity.url
      : null;
    const len = entityText.length;
    const startIdx = text.indexOf(entityText);
    const endIdx = startIdx + len;

    if (startIdx !== 0) {
      result.push(<span key={`span${i}`}>{text.slice(0, startIdx)}</span>);
    }

    if (entity.hashtag) {
      result.push(
        <Text.InternalLink
          to={`/search?q=%23${entity.hashtag}`}
          key={`${entity.hashtag}${i}`}
          inline="true"
          data-testid="hashtagLink"
        >
          <Text color="blue" decor data-testid="hashtag">
            &#35;{entity.hashtag}
          </Text>
        </Text.InternalLink>,
      );
    } else if (entity.screenName) {
      result.push(
        <Text.InternalLink
          to={`/${entity.screenName}`}
          key={`${entity.screenName}${i}`}
          inline="true"
          data-testid="userMentionLink"
        >
          <Text color="blue" decor data-testid="userMention">
            &#64;{entity.screenName}
          </Text>
        </Text.InternalLink>,
      );
    } else if (entity.cashtag) {
      result.push(
        <Text.InternalLink
          to={`/search?q=%24${entity.cashtag}`}
          key={`${entity.cashtag}${i}`}
          inline="true"
          data-testid="cashtagLink"
        >
          <Text color="blue" decor data-testid="cashtag">
            &#36;{entity.cashtag}
          </Text>
        </Text.InternalLink>,
      );
    } else if (entity.url && !entity.media_url && i !== entities.length - 1) {
      result.push(
        <Text.ExternalLink
          href={entity.url}
          key={`${entity.url}${i}`}
          target="_blank"
          rel="noopener noreferrer"
          inline="true"
          data-testid="urlLink"
        >
          <Text color="blue" decor data-testid="url">
            {entity.display_url}
          </Text>
        </Text.ExternalLink>,
      );
    }

    text = text.slice(endIdx);
  }

  if (text !== undefined && text.length !== 0) {
    result.push(<span key={'span-end'}>{text.slice(0)}</span>);
  }

  return result;
}
