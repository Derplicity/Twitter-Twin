import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserAuth } from '../../actions/authActions';

import Landing from '../container/Landing';
import Page from './Page';

const propTypes = {
	isAuthenticated: PropTypes.bool,
	getUserAuth: PropTypes.func,
};

const defaultProps = {
	isAuthenticated: null,
	getUserAuth: () => null,
};

export class Routes extends Component {
	componentDidMount() {
		this.props.getUserAuth();
	}

	render() {
		const { isAuthenticated } = this.props;

		return (
			<Router data-testid="Routes">
				<Switch>
					<Route exact path="/" component={Landing} />
					{isAuthenticated ? (
						<Route component={Page} data-testid="PageRouter" />
					) : isAuthenticated === false ? (
						<Redirect to={{ pathname: '/' }} data-testid="Redirect" />
					) : null}
				</Switch>
			</Router>
		);
	}
}

Routes.propTypes = propTypes;
Routes.defaultProps = defaultProps;

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
	mapStateToProps,
	{ getUserAuth },
)(Routes);
