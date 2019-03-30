import React from 'react';

import { Footer, Text } from '../styles';

export default function() {
	const itemStyle = {
		paddingRight: '15px',
		margin: '5px 0',
	};

	return (
		<Footer.Wrapper data-testId="footerComponent">
			<Footer role="contentinfo">
				<Text.ExternalLink
					href="https://twitter.com/tos"
					target="_blank"
					data-testId="footerLink"
				>
					<Text small color="grey" decor style={itemStyle}>
						Terms
					</Text>
				</Text.ExternalLink>
				<Text.ExternalLink
					href="https://twitter.com/privacy"
					target="_blank"
					data-testId="footerLink"
				>
					<Text small color="grey" decor style={itemStyle}>
						Privacy policy
					</Text>
				</Text.ExternalLink>
				<Text.ExternalLink
					href="https://support.twitter.com/articles/20170514"
					target="_blank"
					data-testId="footerLink"
				>
					<Text small color="grey" decor style={itemStyle}>
						Cookies
					</Text>
				</Text.ExternalLink>
				<Text.ExternalLink
					href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html"
					target="_blank"
					data-testId="footerLink"
				>
					<Text small color="grey" decor style={itemStyle}>
						Ads info
					</Text>
				</Text.ExternalLink>
				<Text small color="grey" style={itemStyle}>
					&copy; 2019 Twitter Mock
				</Text>
			</Footer>
		</Footer.Wrapper>
	);
}
