import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSuggestedUsers } from '../../actions/userActions';

import ErrorBoundary from '../functional/ErrorBoundary';

import UserListContainer from '../container/UserList';

import { Aside, Text } from '../styles';

const propTypes = {
	suggested_users: PropTypes.array.isRequired,
	getSuggestedUsers: PropTypes.func.isRequired,
};

const defaultProps = {
	suggested_users: [],
	getSuggestedUsers: () => null,
};

class DefaultAsideView extends Component {
	componentDidMount() {
		this.props.getSuggestedUsers();
	}

	render() {
		const { suggested_users } = this.props;
		return (
			<ErrorBoundary>
				<Aside>
					<Aside.Header>
						<Text color="white" large bolder enableCrop>
							Who To Follow
						</Text>
					</Aside.Header>
					<Aside.Body>
						{suggested_users.length !== 0 && (
							<UserListContainer list={suggested_users} count={3} />
						)}
					</Aside.Body>
				</Aside>
			</ErrorBoundary>
		);
	}
}

const mapStateToProps = state => ({
	suggested_users: state.user.suggested_users,
});

DefaultAsideView.propTypes = propTypes;
DefaultAsideView.defaultProps = defaultProps;

export default connect(
	mapStateToProps,
	{ getSuggestedUsers },
)(DefaultAsideView);
