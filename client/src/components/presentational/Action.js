import React from 'react';
import PropTypes from 'prop-types';

import { Action, Icon, Text } from '../styles';

const propTypes = {
  type: PropTypes.string,
  isSmall: PropTypes.bool,
  isActive: PropTypes.bool,
  count: PropTypes.number, // should be changed to string
  onActive: PropTypes.func,
};

const defaultProps = {
  type: null,
  isSmall: false,
  isActive: false,
  count: 0,
  onActive: () => null,
};

export function ActionPresentator(props) {
  const { type, isSmall, isActive, count, onAction } = props;

  if (!type) return null;

  const colors = {
    bubble:
      type === 'heart'
        ? 'red_lighter'
        : type === 'retweet'
        ? 'green_lighter'
        : 'blueGrey__lighter',
    icon: isActive
      ? type === 'heart'
        ? 'red'
        : type === 'retweet'
        ? 'green'
        : 'blue'
      : 'grey',
    hover: type === 'heart' ? 'red' : type === 'retweet' ? 'green' : 'blue',
  };

  return (
    <Action data-testid="ActionPresentator">
      <Icon.Interactive
        transitionto={colors.hover}
        onClick={() => onAction(type)}
        data-testid="interactiveWrapper"
      >
        <Action.Group>
          <Icon.Container>
            <Icon.Bubble
              small
              transitionto={colors.bubble}
              data-testid="iconBubble"
            />
            <Icon.Wrapper small={isSmall} data-testid="iconWrapper">
              <Icon
                icon={['fas', type]}
                color={colors.icon}
                data-testid="icon"
              />
            </Icon.Wrapper>
          </Icon.Container>
          {count > 0 && (
            <Text
              small
              color="grey"
              style={{ marginLeft: '8px' }}
              data-testid="countText"
            >
              {count}
            </Text>
          )}
        </Action.Group>
      </Icon.Interactive>
    </Action>
  );
}

ActionPresentator.propTypes = propTypes;
ActionPresentator.defaultProps = defaultProps;

export default ActionPresentator;
