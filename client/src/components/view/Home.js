import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	getHomeTimeline,
	getNewHomeTimeline,
} from '../../actions/statusActions';

import ErrorBoundary from '../functional/ErrorBoundary';
import VirtualScroller from '../functional/VirtualScroller';

import { Main, Text } from '../styles';

const propTypes = {
	getHomeTimeline: PropTypes.func.isRequired,
	getNewHomeTimeline: PropTypes.func.isRequired,
	home_timeline: PropTypes.arrayOf(PropTypes.object.isRequired),
};

const defaultProps = {
	getHomeTimeline: () => null,
	getNewHomeTimeline: () => null,
	home_timeline: null,
};

class HomeView extends Component {
	componentDidMount() {
		this.props.getHomeTimeline();
	}

	render() {
		const { home_timeline, getNewHomeTimeline } = this.props;

		return (
			<ErrorBoundary>
				<div style={{ position: 'relative' }}>
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
						<Text color="white" large bolder enableCrop>
							Home
						</Text>
					</Main.Header>
					{home_timeline.length !== 0 ? (
						<VirtualScroller
							items={home_timeline}
							getNewData={getNewHomeTimeline}
						/>
					) : null}
				</div>
			</ErrorBoundary>
		);
	}
}

HomeView.propTypes = propTypes;
HomeView.defaultTypes = defaultProps;

const mapStateToProps = state => ({
	home_timeline: state.status.home_timeline,
});

export default connect(
	mapStateToProps,
	{ getHomeTimeline, getNewHomeTimeline },
)(HomeView);
