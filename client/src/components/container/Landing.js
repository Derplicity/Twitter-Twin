import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { setUserAuth } from '../../actions/authActions';
import PropTypes from 'prop-types';

import AuthButton from '../presentational/AuthButton';

const api_url = 'https://localhost:5000';
const socket = io(api_url);

let check;

class Landing extends Component {
	state = {
		disabled: false,
	};

	componentDidMount() {
		socket.on('twitter', userAuth => {
			this.popup.close();
			this.props.setUserAuth(userAuth);
		});
	}

	componentWillUnmount() {
		clearInterval(check);
	}

	checkPopup = () => {
		check = setInterval(() => {
			const { popup } = this;
			if (!popup || popup.closed || popup.closed === undefined) {
				clearInterval(check);
				this.setState({ disabled: false });
			}
		}, 1000);
	};

	openPopup = () => {
		const width = 600,
			height = 600;
		const left = window.innerWidth / 2 - width / 2;
		const top = window.innerHeight / 2 - height / 2;
		const url = `${api_url}/api/auth/twitter?socketId=${socket.id}`;

		return window.open(
			url,
			'',
			`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`,
		);
	};

	startAuth = e => {
		if (!this.state.disabled) {
			e.preventDefault();
			this.popup = this.openPopup();
			this.checkPopup();
			this.setState({ disabled: true });
		}
	};

	render() {
		const { isAuthenticated } = this.props;
		const { disabled } = this.state;

		return (
			<div>
				{isAuthenticated ? (
					<Redirect to={{ pathname: '/home' }} />
				) : (
					<AuthButton onClick={this.startAuth} disabled={disabled} />
				)}
			</div>
		);
	}
}

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
	setUserAuth: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
	mapStateToProps,
	{ setUserAuth },
)(Landing);
