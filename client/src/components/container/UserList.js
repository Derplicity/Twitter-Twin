import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import UserCell from '../presentational/UserCell';

import { UserList, Text } from '../styles';

const propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			screen_name: PropTypes.string.isRequired,
			profile_image_url_https: PropTypes.string.isRequired,
			verified: PropTypes.bool.isRequired,
		}),
	),
	count: PropTypes.number.isRequired,
};

const defaultProps = {
	list: [
		{ name: '', screen_name: '', profile_image_url_https: '', verified: false },
	],
	count: 0,
};

class UserListContainer extends Component {
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
		console.log('followed');
	}

	getUserCells(list, count) {
		const newList = list.slice(0, count);
		const userCells = [];

		newList.map(item =>
			userCells.push(
				<UserCell
					user={item}
					onUserClick={this.onUserClick}
					onFollowClick={this.onFollowClick}
					key={item.name}
				/>,
			),
		);

		return userCells;
	}

	render() {
		const { list, count } = this.props;

		return (
			<UserList.Wrapper>
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
