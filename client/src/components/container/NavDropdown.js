import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DropdownContentPresentator from '../presentational/DropdownContent';

import {
  NavDropdownWrapper,
  NavDropdownLink,
  NavDropdownDrop,
  NavUserImg,
  NavUserName,
} from '../styled-components';

const propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    screen_name: PropTypes.string.isRequired,
    profile_image_url_https: PropTypes.string.isRequired,
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
      <NavDropdownWrapper data-testid="NavDropdownContainer">
        <NavDropdownLink
          role="button"
          tabIndex="0"
          onClick={this.handleDrop}
          onKeyDown={e =>
            e.keyCode === 13 && !e.shiftKey ? this.handleDrop() : null
          }
          data-testid="dropLink"
        >
          <NavDropdownDrop tabIndex="-1">
            <NavUserImg
              src={user.profile_image_url_https}
              alt="Profile"
              data-testid="profileImage"
            />
            <NavUserName data-testid="profileName">{user.name}</NavUserName>{' '}
            <FontAwesomeIcon icon={['fas', 'caret-down']} />
          </NavDropdownDrop>
        </NavDropdownLink>
        <DropdownContentPresentator
          isDropped={isDropped}
          setNode={node => (this.node = node)}
          handleDrop={this.handleDrop}
          user={user}
          data-testid="DropdownContentPresentator"
        />
      </NavDropdownWrapper>
    );
  }
}

NavDropdownContainer.propTypes = propTypes;
NavDropdownContainer.defaultProps = defaultProps;

export default NavDropdownContainer;
