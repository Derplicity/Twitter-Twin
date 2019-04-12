import React from 'react';

import Text from '../styles/Text';

function convertUnicodeIndices(text, entities, indicesInUTF16) {
  if (entities.length === 0) {
    return;
  }

  let charIndex = 0;
  let codePointIndex = 0;

  // sort entities by start index
  entities.sort(function(a, b) {
    return a.indices[0] - b.indices[0];
  });
  let entityIndex = 0;
  let entity = entities[0];

  while (charIndex < text.length) {
    if (entity.indices[0] === (indicesInUTF16 ? charIndex : codePointIndex)) {
      const len = entity.indices[1] - entity.indices[0];
      entity.indices[0] = indicesInUTF16 ? codePointIndex : charIndex;
      entity.indices[1] = entity.indices[0] + len;

      entityIndex++;
      if (entityIndex === entities.length) {
        break;
      }
      entity = entities[entityIndex];
    }

    let c = text.charCodeAt(charIndex);
    if (c >= 0xd800 && c <= 0xdbff && charIndex < text.length - 1) {
      c = text.charCodeAt(charIndex + 1);
      if (c >= 0xdc00 && c <= 0xdfff) {
        charIndex++;
      }
    }
    codePointIndex++;
    charIndex++;
  }
}

export default function(tweetData) {
  let tweet = tweetData;

  if (Object.keys(tweet).length === 0) {
    tweet = {
      full_text: '',
      entities: {},
    };
  }

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

  convertUnicodeIndices(text, entities, false);

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
          to={`/search/q=%23${entity.hashtag}`}
          key={`${entity.hashtag}${i}`}
          inline="true"
        >
          <Text color="blue" decor>
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
        >
          <Text color="blue" decor>
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
        >
          <Text color="blue" decor>
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
        >
          <Text color="blue" decor>
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
