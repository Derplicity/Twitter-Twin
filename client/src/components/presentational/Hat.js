import React from 'react';

import { Hat, Icon, Text } from '../styles';

export default function({ to, text }) {
  return (
    <Hat>
      <Hat.Aside>
        <Icon.Wrapper small>
          <Icon icon={['fas', 'retweet']} color="grey" />
        </Icon.Wrapper>
      </Hat.Aside>
      <Hat.Main>
        <Text.InternalLink to={to} style={{ flexBasis: '0' }}>
          <Text color="grey" decor small>
            {text} Retweeted
          </Text>
        </Text.InternalLink>
      </Hat.Main>
    </Hat>
  );
}
