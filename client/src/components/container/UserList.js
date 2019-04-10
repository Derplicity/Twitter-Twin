import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import UserCellPresentator from '../presentational/UserCell';

import { UserList, Text } from '../styles';

const propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
		}),
	),
	count: PropTypes.number,
};

const defaultProps = {
	list: [],
	count: 0,
};

export class UserListContainer extends Component {
	constructor(props) {
		super(props);

		this.getUserCells = this.getUserCells.bind(this);
		this.onUserClick = this.onUserClick.bind(this);
		this.onFollowClick = this.onFollowClick.bind(this);
	}

	onUserClick(e, url) {
		if (e.target === e.currentTarget) {
			return this.props.history.push(url);
		}
	}

	onFollowClick() {
		// console.log('followed');
		return null;
	}

	getUserCells(list, count) {
		const newList = list.slice(0, count);
		const userCells = [];

		newList.map(item =>
			userCells.push(
				<UserCellPresentator
					user={item}
					onUserClick={this.onUserClick}
					onFollowClick={this.onFollowClick}
					key={item.name}
					data-testid="UserCellPresentator"
				/>,
			),
		);

		return userCells;
	}

	render() {
		const { list, count } = this.props;

		if (list.length === 0 || count === 0) {
			return null;
		}

		return (
			<UserList.Wrapper data-testid="UserListContainer">
				<UserList>{this.getUserCells(list, count)}</UserList>
				<UserList.Interactive transitionto="blueGrey__light">
					<UserList.Button to="/i/who_to_follow">
						<Text color="blue">Show more</Text>
					</UserList.Button>
				</UserList.Interactive>
			</UserList.Wrapper>
		);
	}
}

UserListContainer.propTypes = propTypes;
UserListContainer.defaultProps = defaultProps;

export default withRouter(UserListContainer);
