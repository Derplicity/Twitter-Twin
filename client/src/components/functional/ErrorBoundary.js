import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	children: PropTypes.element.isRequired,
};

export class ErrorBoundary extends Component {
	constructor(props) {
		super(props);

		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// Log error
		console.log(error, info);
	}

	render() {
		if (this.state.hasError) {
			// Fallback UI
			return <h1 data-testid="fallback">Something went wrong.</h1>;
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = propTypes;

export default ErrorBoundary;
