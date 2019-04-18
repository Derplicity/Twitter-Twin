import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  MenuItemWrapper,
  MenuLink,
  LinkIcon,
  LinkHeader,
  MenuSwitch,
  MenuSwitchLabel,
  MenuSwitchInput,
  MenuSwitchSlider,
} from '../styled-components';

const propTypes = {
  exact: PropTypes.bool,
  to: PropTypes.string,
  icon: PropTypes.arrayOf(PropTypes.string.isRequired),
  header: PropTypes.string,
  hasToggle: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  exact: false,
  to: '/',
  icon: null,
  header: null,
  hasToggle: false,
  onClick: () => null,
};

export class MenuItemContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: true,
    };

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {
    const { exact, to, icon, header, hasToggle, onClick } = this.props;
    const { isChecked } = this.state;

    if (!header) return null;

    return (
      <MenuItemWrapper data-testid="MenuItemContainer">
        <MenuLink
          exact={exact}
          to={to}
          onClick={onClick}
          data-testid="menuLink"
        >
          {icon ? (
            <LinkIcon>
              <FontAwesomeIcon icon={icon} data-testid="menuIcon" />
            </LinkIcon>
          ) : null}
          <LinkHeader data-testid="header">{header}</LinkHeader>
        </MenuLink>
        {hasToggle && (
          <MenuSwitch>
            <MenuSwitchLabel>
              <MenuSwitchInput
                type="checkbox"
                checked={isChecked}
                onChange={this.handleCheck}
                onKeyDown={e =>
                  e.keyCode === 13 && !e.shiftKey ? this.handleCheck() : null
                }
                data-testid="switchInput"
              />
              <MenuSwitchSlider />
            </MenuSwitchLabel>
          </MenuSwitch>
        )}
      </MenuItemWrapper>
    );
  }
}

MenuItemContainer.propTypes = propTypes;
MenuItemContainer.defaultProps = defaultProps;

export default MenuItemContainer;
