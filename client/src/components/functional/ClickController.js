import React, { Component } from 'react';

export class ClickController extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOutside: false,
		};

		this.setClickContainer = this.setClickContainer.bind(this);
		this.startClickListen = this.startClickListen.bind(this);
		this.stopClickListen = this.stopClickListen.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillUnmount() {
		this.stopClickListen();
	}

	setClickContainer(node) {
		this.clickContainer = node;
	}

	startClickListen() {
		this.setState({ isOutside: false }, () =>
			document.addEventListener('mousedown', this.handleClick, false),
		);
	}

	stopClickListen() {
		document.removeEventListener('mousedown', this.handleClick, false);
	}

	handleClick = e => {
		if (this.clickContainer.contains(e.target)) {
			return null;
		}

		this.setState({ isOutside: true }, () => this.stopClickListen());
	};

	render() {
		const { isOutside } = this.state;

		return React.cloneElement(this.props.children, {
			setClickContainer: this.setClickContainer,
			startClickListen: this.startClickListen,
			stopClickListen: this.stopClickListen,
			isOutside: isOutside,
		});
	}
}

export default ClickController;
