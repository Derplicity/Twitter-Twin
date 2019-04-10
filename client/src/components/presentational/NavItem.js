import React from 'react';
import PropTypes from 'prop-types';

import { Icon, NavItem } from '../styles';

const propTypes = {
	exact: PropTypes.bool,
	to: PropTypes.string,
	icon: PropTypes.arrayOf(PropTypes.string.isRequired),
};

const defaultProps = {
	exact: false,
	to: '/',
	icon: ['fas', 'home'],
};

function NavItemPresentator({ exact, to, icon }) {
	return (
		<NavItem.Wrapper>
			<NavItem.InternalLink exact={exact} to={to}>
				<NavItem tabIndex="-1">
					<Icon.Wrapper large>
						<Icon.Bubble tabIndex="-1" />
						<Icon icon={icon} color="grey" />
					</Icon.Wrapper>
				</NavItem>
			</NavItem.InternalLink>
		</NavItem.Wrapper>
	);
}

NavItemPresentator.propTypes = propTypes;
NavItemPresentator.defaultProps = defaultProps;

export default NavItemPresentator;
