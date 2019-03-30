import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getUserAuth } from '../../actions/authActions';

import Header from '../../components/container/Header';
import Main from './Main';
import Aside from './Aside';
import Footer from '../../components/presentational/Footer';

import {
	PageContainer,
	HeaderContainer,
	MainContainer,
	AsideContainer,
} from '../../components/styled-components';

class Page extends Component {
	componentDidMount() {
		this.props.getUserAuth();
	}

	render() {
		const { isAuthenticated } = this.props;

		return (
			<div>
				{isAuthenticated === true ? (
					<PageContainer>
						<HeaderContainer>
							<Header />
						</HeaderContainer>
						<MainContainer>
							<Main />
						</MainContainer>
						<AsideContainer>
							<Aside />
							<Footer />
						</AsideContainer>
					</PageContainer>
				) : isAuthenticated === false ? (
					<Redirect to={{ pathname: '/' }} />
				) : null}
			</div>
		);
	}
}

Page.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(
	mapStateToProps,
	{ getUserAuth },
)(Page);
