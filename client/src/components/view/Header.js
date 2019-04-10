import React from 'react';

import NavbarContainer from '../container/Navbar';

import { Header } from '../styles';

export class HeaderView extends React.Component {
	render() {
		return (
			<Header.Wrapper role="banner" data-testid="HeaderView">
				<Header>
					<Header.SkipToMain href="#main">
						Skip to main content
					</Header.SkipToMain>
					<NavbarContainer data-testid="NavbarContainer" />
				</Header>
			</Header.Wrapper>
		);
	}
}

export default HeaderView;
