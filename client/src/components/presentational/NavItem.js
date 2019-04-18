import React from 'react';
import PropTypes from 'prop-types';

import { Icon, NavItem } from '../styles';

const propTypes = {
  exact: PropTypes.bool,
  to: PropTypes.string,
  icon: PropTypes.arrayOf(PropTypes.string.isRequired),
};

const defaultProps = {
  exact: false,
  to: '/',
  icon: null,
};

export function NavItemPresentator(props) {
  const { exact, to, icon } = props;

  if (!icon) return;

  return (
    <NavItem.Wrapper data-testid="NavItemPresentator">
      <NavItem.InternalLink exact={exact} to={to} data-testid="link">
        <NavItem tabIndex="-1">
          <Icon.Wrapper large>
            <Icon.Bubble tabIndex="-1" />
            <Icon icon={icon} color="grey" data-testid="icon" />
          </Icon.Wrapper>
        </NavItem>
      </NavItem.InternalLink>
    </NavItem.Wrapper>
  );
}

NavItemPresentator.propTypes = propTypes;
NavItemPresentator.defaultProps = defaultProps;

export default NavItemPresentator;
