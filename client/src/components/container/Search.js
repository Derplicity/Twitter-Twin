import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUsers } from '../../actions/userActions';
import { getTrends } from '../../actions/trendActions';

import SearchDropdown from '../presentational/SearchDropdown';

import { Search, Icon } from '../styles';

const propTypes = {
  getUsers: PropTypes.func,
  getTrends: PropTypes.func,
  startClickListen: PropTypes.func,
  stopClickListen: PropTypes.func,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id_str: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      screen_name: PropTypes.string.isRequired,
    }),
  ),
  trends: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      query: PropTypes.string.isRequired,
    }),
  ),
  isOutside: PropTypes.bool,
};

const defaultProps = {
  getUsers: () => null,
  getTrends: () => null,
  startClickListen: () => null,
  stopClickListen: () => null,
  users: null,
  trends: null,
  isOutside: false,
};

export class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      input: '',
      isOpen: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handlClose = this.handleClose.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropClick = this.handleDropClick.bind(this);
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
    this.input.focus(); // Focus input

    this.setState(
      {
        isOpen: true,
      },
      () => this.props.startClickListen(),
    );
  }

  handleClose() {
    this.input.blur(); // Unfocus input

    this.setState(
      {
        isOpen: false,
      },
      () => this.props.stopClickListen(),
    );
  }

  handleInput(e) {
    clearTimeout(this.timer);

    this.setState(
      {
        input: e.target.value,
      },
      () => (this.timer = setTimeout(this.getData, 500)),
    );
  }

  clearInput() {
    this.input.focus(); // Refocus input

    // Create clear users/trends
    this.props.getUsers('');
    this.props.getTrends('');

    this.setState({
      input: '',
    });
  }

  getData() {
    const { input } = this.state;
    const { getUsers, getTrends } = this.props;

    getUsers(input);
    getTrends(input);
  }

  handleSubmit(e) {
    // Enter key is pressed
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();

      const { input } = this.state;

      if (input.trim().length !== 0) {
        const userQuery = encodeURIComponent(input);
        this.props.history.push(`/search?q=${userQuery}`);
      }

      this.handleClose();
    }
  }

  handleDropClick() {
    this.clearInput();
    this.handleClose();
  }

  render() {
    const { input, isOpen } = this.state;
    const { users, trends, setClickContainer } = this.props;

    return (
      <Search.Wrapper
        role="search"
        autoComplete="off"
        ref={setClickContainer}
        data-testid="SearchContainer"
      >
        <Search>
          <Search.Input
            ref={node => (this.input = node)}
            onFocus={this.handleOpen}
            type="text"
            name="search"
            placeholder="Search Twitter"
            value={input}
            onChange={this.handleInput}
            onKeyDown={this.handleSubmit}
            autoComplete="off"
            data-testid="input"
          />
          <Icon.Wrapper small>
            <Icon icon={['fas', 'search']} color="grey" />
          </Icon.Wrapper>
          {isOpen && input !== '' && (
            <Search.Clear
              role="button"
              onClick={this.clearInput}
              data-testid="clear-button"
            >
              <Icon icon={['fas', 'times-circle']} />
            </Search.Clear>
          )}
          {isOpen && (
            <SearchDropdown
              users={users}
              trends={trends}
              handleClickSubmit={this.handleDropClick}
              data-testid="SearchDropdown"
            />
          )}
        </Search>
      </Search.Wrapper>
    );
  }
}

SearchContainer.propTypes = propTypes;
SearchContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  users: state.user.users,
  trends: state.trend.trends,
});

export default withRouter(
  connect(
    mapStateToProps,
    { getUsers, getTrends },
  )(SearchContainer),
);
