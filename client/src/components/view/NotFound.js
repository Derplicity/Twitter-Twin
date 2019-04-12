import React from 'react';

import { NotFound, Text } from '../styles';

export default function NotFoundView() {
  return (
    <NotFound.Wrapper data-testid="NotFoundView">
      <NotFound>
        <Text bold xlarge center color="white">
          Sorry, that page doesn't exist!
        </Text>
        <Text.Group style={{ marginTop: '39px' }}>
          <Text center color="white">
            Why not try a {''}
          </Text>
          <Text.InternalLink to="/explore">
            <Text color="blue" decor>
              search
            </Text>
          </Text.InternalLink>
          <Text center color="white">
            {''} to find something else?
          </Text>
        </Text.Group>
      </NotFound>
    </NotFound.Wrapper>
  );
}
