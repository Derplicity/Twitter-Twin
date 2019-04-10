import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { setUserAuth } from '../../actions/authActions';
import PropTypes from 'prop-types';

import AuthButtonPresentator from '../presentational/AuthButton';

const api_url = 'https://localhost:5000';

const propTypes = {
	isAuthenticated: PropTypes.bool,
	setUserAuth: PropTypes.func,
};

const defaultProps = {
	isAuthenticated: null,
	setUserAuth: () => null,
};

export class LandingContainer extends Component {
	constructor(props) {
		super(props);

		this.socket = io(api_url);
		this.check = null;

		this.state = {
			disabled: false,
		};

		this.checkPopup = this.checkPopup.bind(this);
		this.openPopup = this.openPopup.bind(this);
		this.startAuth = this.startAuth.bind(this);
	}

	componentDidMount() {
		this.socket.on('twitter', userAuth => {
			if (this.popup) this.popup.close();
			this.props.setUserAuth(userAuth);
		});
	}

	componentWillUnmount() {
		clearInterval(this.check);
	}

	checkPopup() {
		const { popup } = this;
		if (!popup || popup.closed || popup.closed === undefined) {
			clearInterval(this.check);
			this.setState({ disabled: false });
		}
	}

	openPopup() {
		const width = 600,
			height = 600;
		const left = window.innerWidth / 2 - width / 2;
		const top = window.innerHeight / 2 - height / 2;
		const url = `${api_url}/api/auth/twitter?socketId=${this.socket.id}`;

		return window.open(
			url,
			'',
			`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`,
		);
	}

	startAuth(e) {
		if (!this.state.disabled) {
			e.preventDefault();
			this.popup = this.openPopup();
			this.check = setInterval(this.checkPopup, 1000);
			this.setState({ disabled: true });
		}
	}

	render() {
		const { isAuthenticated } = this.props;
		const { disabled } = this.state;

		return (
			<div data-testid="LandingContainer">
				{isAuthenticated ? (
					<Redirect to={{ pathname: '/home' }} data-testid="redirect" />
				) : (
					<AuthButtonPresentator
						onClick={this.startAuth}
						disabled={disabled}
						data-testid="AuthButtonPresentator"
					/>
				)}
			</div>
		);
	}
}

LandingContainer.propTypes = propTypes;
LandingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
	mapStateToProps,
	{ setUserAuth },
)(LandingContainer);
