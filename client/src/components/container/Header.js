import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser, getUsers } from '../../actions/userActions';
import { getTrends } from '../../actions/trendActions';

import Navbar from '../presentational/Navbar';

import { HeaderWrapper, SkipToMain } from '../styled-components';

class Header extends React.Component {
	state = {
		searchInput: '',
		isDropped: false,
	};

	componentWillMount() {
		this.props.getCurrentUser();
		this.timer = null;
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClick, false);
	}

	setNode = node => {
		this.node = node;
	};

	handleClickOutside = () => {
		this.setState({
			isDropped: false,
		});
		document.removeEventListener('mousedown', this.handleClick, false);
	};

	handleClick = e => {
		if (this.node.contains(e.target)) {
			return;
		}
		this.handleClickOutside();
	};

	handleDrop = () => {
		this.setState(
			{
				isDropped: true,
			},
			() => (document.getElementById('search-list').scrollTop = 0),
		);
		document.addEventListener('mousedown', this.handleClick, false);
	};

	clearSearchInput = () => {
		document.getElementById('searchInput').focus();
		this.props.getUsers('');
		this.props.getTrends('');
		this.setState({
			searchInput: '',
		});
	};

	handleSearchInput = e => {
		const value = e.target.value;

		clearTimeout(this.timer);

		this.setState({
			searchInput: value,
		});

		this.timer = setTimeout(this.triggerSearchData, 500);
	};

	triggerSearchData = () => {
		const { searchInput } = this.state;

		this.props.getUsers(searchInput);
		this.props.getTrends(searchInput);
	};

	handleClickSubmit = () => {
		this.setState(
			{
				searchInput: '',
				isDropped: false,
			},
			() => {
				this.props.getUsers('');
				this.props.getTrends('');
			},
		);
	};

	handleSearchSubmit = e => {
		if (e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault();
			e.target.blur();
			if (this.state.searchInput.trim().length !== 0) {
				const userQuery = encodeURIComponent(this.state.searchInput);
				this.props.history.push(`/search?q=${userQuery}`);
			}
			this.setState({
				isDropped: false,
			});
		}
	};

	render() {
		const { searchInput, isDropped } = this.state;
		const { user, users, trends } = this.props;

		return (
			<HeaderWrapper role='banner'>
				<SkipToMain href='#main'>Skip to main content</SkipToMain>
				<Navbar
					user={user}
					setNode={this.setNode}
					search={{ input: searchInput, users: users, trends: trends }}
					handleSearchInput={this.handleSearchInput}
					handleSearchSubmit={this.handleSearchSubmit}
					isDropped={isDropped}
					clearSearchInput={this.clearSearchInput}
					handleDrop={this.handleDrop}
					handleClickSubmit={this.handleClickSubmit}
				/>
			</HeaderWrapper>
		);
	}
}

Header.propTypes = {
	getCurrentUser: PropTypes.func.isRequired,
	getUsers: PropTypes.func.isRequired,
	getTrends: PropTypes.func.isRequired,
	user: PropTypes.object,
	users: PropTypes.array,
	trends: PropTypes.array,
};

const mapStateToProps = state => ({
	user: state.user.user,
	users: state.user.users,
	trends: state.trend.trends,
});

export default withRouter(
	connect(
		mapStateToProps,
		{ getCurrentUser, getUsers, getTrends },
	)(Header),
);
