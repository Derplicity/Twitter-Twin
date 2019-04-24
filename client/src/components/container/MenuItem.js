import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MenuItem, Icon, Text, Switch } from '../styles';

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
      <MenuItem.Wrapper data-testid="MenuItemContainer">
        <MenuItem.InternalLink
          exact={exact}
          to={to}
          onClick={onClick}
          data-testid="menuLink"
        >
          {icon ? (
            <Icon.Wrapper>
              <Icon icon={icon} color="grey" data-testid="menuIcon" />
            </Icon.Wrapper>
          ) : null}
          <Text color="white" data-testid="header">
            {header}
          </Text>
        </MenuItem.InternalLink>
        {hasToggle && (
          <Switch>
            <Switch.Label>
              <Switch.Input
                type="checkbox"
                checked={isChecked}
                onChange={this.handleCheck}
                onKeyDown={e =>
                  e.keyCode === 13 && !e.shiftKey ? this.handleCheck() : null
                }
                data-testid="switchInput"
              />
              <Switch.Slider />
            </Switch.Label>
          </Switch>
        )}
      </MenuItem.Wrapper>
    );
  }
}

MenuItemContainer.propTypes = propTypes;
MenuItemContainer.defaultProps = defaultProps;

export default MenuItemContainer;
