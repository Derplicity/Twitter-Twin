import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getUserTimeline,
  getNewUserTimeline,
} from '../../actions/statusActions';

import ErrorBoundary from '../functional/ErrorBoundary';
import VirtualScroller from '../functional/VirtualScroller';

import { Main, Text } from '../styles';

const propTypes = {
  getUserTimeline: PropTypes.func,
  getNewUserTimeline: PropTypes.func,
  user_timeline: PropTypes.arrayOf(PropTypes.object.isRequired),
  more_data: PropTypes.bool,
  is_loading: PropTypes.bool,
};

const defaultProps = {
  getUserTimeline: () => null,
  getNewUserTimeline: () => null,
  user_timeline: [],
  more_data: false,
  is_loading: true,
};

export class UserView extends Component {
  constructor(props) {
    super(props);

    this.getNewData = this.getNewData.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this.props.match.params.username);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      // remove prev user_timeline data from localstorage
      this.getData(this.props.match.params.username);
    }
  }

  getData(username) {
    this.props.getUserTimeline(username);
  }

  getNewData(max_id) {
    if (this.props.more_data)
      this.props.getNewUserTimeline(this.props.match.params.username, max_id);
  }

  render() {
    const { user_timeline, is_loading } = this.props;

    return (
      <ErrorBoundary>
        <div style={{ position: 'relative' }} data-testid="UserView">
          <div
            style={{
              backgroundColor: 'rgb(21, 32, 43)',
              width: '540px',
              height: window.scrollY + window.innerHeight,
              position: 'fixed',
              zIndex: '-1',
            }}
          />
          <Main.Header>
            <Text color="white" large bolder enableCrop data-testid="header">
              {this.props.match.params.username}
            </Text>
          </Main.Header>
          {user_timeline.length !== 0 && !is_loading ? (
            <VirtualScroller
              items={user_timeline}
              getNewData={this.getNewData}
              data-testid="VirtualScroller"
            />
          ) : null}
        </div>
      </ErrorBoundary>
    );
  }
}

UserView.propTypes = propTypes;
UserView.defaultTypes = defaultProps;

const mapStateToProps = state => ({
  user_timeline: state.status.user_timeline,
  more_data: state.status.more_data,
  is_loading: state.status.is_loading,
});

export default connect(
  mapStateToProps,
  { getUserTimeline, getNewUserTimeline },
)(withRouter(UserView));
