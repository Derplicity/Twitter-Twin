import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DropdownContent from './DropdownContent';

import {
  NavDropdownWrapper,
  NavDropdownLink,
  NavDropdownDrop,
  NavUserImg,
  NavUserName,
} from '../styled-components';

class NavDropdown extends React.Component {
  state = {
    isDropped: false,
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClickOutside();
  };

  handleClickOutside = () => {
    this.setState({
      isDropped: false,
    });
    document.removeEventListener('mousedown', this.handleClick, false);
  };

  handleDrop = () => {
    this.setState(
      {
        isDropped: !this.state.isDropped,
      },
      () => (document.getElementById('drop-menu').scrollTop = 0),
    );
    document.addEventListener('mousedown', this.handleClick, false);
  };

  render() {
    const { user } = this.props;
    const { isDropped } = this.state;
    return (
      <NavDropdownWrapper>
        <NavDropdownLink
          role="button"
          tabIndex="0"
          onClick={this.handleDrop}
          onKeyDown={e =>
            e.keyCode === 13 && !e.shiftKey ? this.handleDrop() : null
          }
        >
          <NavDropdownDrop tabIndex="-1">
            <NavUserImg src={user.profile_image_url_https} alt="Profile" />
            <NavUserName>{user.name}</NavUserName>{' '}
            <FontAwesomeIcon icon={['fas', 'caret-down']} />
          </NavDropdownDrop>
        </NavDropdownLink>
        <DropdownContent
          isDropped={isDropped}
          setNode={node => (this.node = node)}
          handleDrop={this.handleDrop}
          user={user}
        />
      </NavDropdownWrapper>
    );
  }
}

NavDropdown.propTypes = {
  user: PropTypes.object.isRequired,
};

export default NavDropdown;
