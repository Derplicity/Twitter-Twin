import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/userActions';

import SearchContainer from './Search';
import ClickController from '../functional/ClickController';

import NavItemPresentator from '../presentational/NavItem';
import NavDropdownContainer from './NavDropdown';
import Loading from '../presentational/Loading';

import { Navbar } from '../styles';

const propTypes = {
  getCurrentUser: PropTypes.func,
  user: PropTypes.object,
};

const defaultProps = {
  getCurrentUser: () => null,
  user: null,
};

export class NavbarContainer extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { user } = this.props;

    return (
      <Navbar.Wrapper data-testid="NavbarContainer">
        <Navbar role="navigation">
          <Navbar.Nav left>
            <NavItemPresentator
              exact
              to="/home"
              icon={['fas', 'home']}
              data-testid="NavItemPresentator"
            />
            <NavItemPresentator
              to="/explore"
              icon={['fas', 'hashtag']}
              data-testid="NavItemPresentator"
            />
            <NavItemPresentator
              to="/notifications"
              icon={['fas', 'bell']}
              data-testid="NavItemPresentator"
            />
            <NavItemPresentator
              to="/messages"
              icon={['fas', 'envelope']}
              data-testid="NavItemPresentator"
            />
          </Navbar.Nav>
          <Navbar.Search>
            <ClickController data-testid="ClickController">
              <SearchContainer data-testid="SearchContainer" />
            </ClickController>
          </Navbar.Search>
          <Navbar.Nav right>
            {user ? (
              <NavDropdownContainer
                user={user}
                data-testid="NavDropdownContainer"
              />
            ) : (
              <Loading data-testid="Loading" />
            )}
          </Navbar.Nav>
        </Navbar>
      </Navbar.Wrapper>
    );
  }
}

NavbarContainer.propTypes = propTypes;
NavbarContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(
  mapStateToProps,
  { getCurrentUser },
)(NavbarContainer);
