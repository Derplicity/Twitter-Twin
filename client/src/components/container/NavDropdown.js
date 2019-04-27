import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropdownContentPresentator from '../presentational/DropdownContent';
import Image from '../presentational/Image';

import { NavDropdown, Text, Icon } from '../styles';

const propTypes = {
  setClickContainer: PropTypes.func,
  startClickListen: PropTypes.func,
  stopClickListen: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    screen_name: PropTypes.string.isRequired,
    profile_image_url_https: PropTypes.string.isRequired,
    friends_count_formatted: PropTypes.string.isRequired,
    followers_count_formatted: PropTypes.string.isRequired,
  }),
  isOutside: PropTypes.bool,
};

const defaultProps = {
  setClickContainer: () => null,
  startClickListen: () => null,
  stopClickListen: () => null,
  user: null,
  isOutside: false,
};

export class NavDropdownContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isOutside } = this.props;
    if (isOutside !== prevProps.isOutside) {
      this.setState({
        isOpen: !isOutside,
      });
    }
  }

  handleOpen() {
    this.setState(
      {
        isOpen: true,
      },
      () => {
        document.getElementById('drop-menu').scrollTop = 0;
        this.props.startClickListen();
      },
    );
  }

  handleClose() {
    this.setState(
      {
        isOpen: false,
      },
      () => this.props.stopClickListen(),
    );
  }

  render() {
    const { user, setClickContainer } = this.props;
    const { isOpen } = this.state;

    if (!user) return null;

    return (
      <NavDropdown.Wrapper data-testid="NavDropdownContainer">
        <NavDropdown.Button
          role="button"
          tabIndex="0"
          onClick={this.handleOpen}
          onKeyDown={e =>
            e.keyCode === 13 && !e.shiftKey ? this.handleOpen() : null
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
          isOpen={isOpen}
          setClickContainer={setClickContainer}
          setNode={node => (this.node = node)}
          handleClose={this.handleClose}
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
