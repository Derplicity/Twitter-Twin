import React from 'react';
import PropTypes from 'prop-types';

import { Hat, Icon, Text } from '../styles';

const propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
};

const defaultProps = {
  to: '/',
  text: null,
};

export function HatPresentator(props) {
  const { to, text } = props;

  if (!text) return null;

  return (
    <Hat data-testid="HatPresentator">
      <Hat.Aside>
        <Icon.Wrapper small>
          <Icon icon={['fas', 'retweet']} color="grey" />
        </Icon.Wrapper>
      </Hat.Aside>
      <Hat.Main>
        <Text.InternalLink
          to={to}
          style={{ flexBasis: '0' }}
          data-testid="hatLink"
        >
          <Text color="grey" decor small data-testid="hatText">
            {text} Retweeted
          </Text>
        </Text.InternalLink>
      </Hat.Main>
    </Hat>
  );
}

HatPresentator.propTypes = propTypes;
HatPresentator.defaultProps = defaultProps;

export default HatPresentator;
