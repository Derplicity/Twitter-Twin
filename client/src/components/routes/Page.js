import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import HeaderView from '../view/Header';
import Footer from '../presentational/Footer';

import MainRoutes from './Main';
import AsideRoutes from './Aside';

import {
	PageContainer,
	HeaderContainer,
	MainContainer,
	AsideContainer,
} from '../styled-components';

export default function PageRouter() {
	return (
		<Router data-testid="PageRouter">
			<PageContainer>
				<HeaderContainer>
					<HeaderView data-testid="HeaderView" />
				</HeaderContainer>
				<MainContainer>
					<main id="main" role="main">
						<MainRoutes data-testid="MainRoutes" />
					</main>
				</MainContainer>
				<AsideContainer>
					<AsideRoutes data-testid="AsideRoutes" />
					<Footer data-testid="FooterPresentator" />
				</AsideContainer>
			</PageContainer>
		</Router>
	);
}
