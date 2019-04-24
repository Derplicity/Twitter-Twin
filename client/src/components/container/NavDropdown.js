import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropdownContentPresentator from '../presentational/DropdownContent';
import Image from '../presentational/Image';

import { NavDropdown, Text, Icon } from '../styles';

const propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    screen_name: PropTypes.string.isRequired,
    profile_image_url_https: PropTypes.string.isRequired,
    friends_count_formatted: PropTypes.string.isRequired,
    followers_count_formatted: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

export class NavDropdownContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropped: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      return null;
    }
    this.handleClickOutside();
  }

  handleClickOutside() {
    this.setState({
      isDropped: false,
    });
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleDrop() {
    this.setState(
      {
        isDropped: !this.state.isDropped,
      },
      () => (document.getElementById('drop-menu').scrollTop = 0),
    );
    document.addEventListener('mousedown', this.handleClick, false);
  }

  render() {
    const { user } = this.props;
    const { isDropped } = this.state;

    if (!user) return null;

    return (
      <NavDropdown.Wrapper data-testid="NavDropdownContainer">
        <NavDropdown.Button
          role="button"
          tabIndex="0"
          onClick={this.handleDrop}
          onKeyDown={e =>
            e.keyCode === 13 && !e.shiftKey ? this.handleDrop() : null
          }
          data-testid="dropLink"
        >
          <NavDropdown.Group tabIndex="-1">
            <NavDropdown.Image>
              <Image
                src={user.profile_image_url_https}
                alt="Profile"
                isCircle
                isSmall
                data-testid="profileImage"
              />
            </NavDropdown.Image>
            <NavDropdown.Content>
              <Text color="white" lessbold data-testid="profileName">
                {user.name}
              </Text>{' '}
              <Icon color="grey" icon={['fas', 'caret-down']} />
            </NavDropdown.Content>
          </NavDropdown.Group>
        </NavDropdown.Button>
        <DropdownContentPresentator
          isDropped={isDropped}
          setNode={node => (this.node = node)}
          handleDrop={this.handleDrop}
          user={user}
          data-testid="DropdownContentPresentator"
        />
      </NavDropdown.Wrapper>
    );
  }
}

NavDropdownContainer.propTypes = propTypes;
NavDropdownContainer.defaultProps = defaultProps;

export default NavDropdownContainer;
