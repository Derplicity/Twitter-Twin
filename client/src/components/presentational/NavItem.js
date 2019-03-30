import React from 'react';
import PropTypes from 'prop-types';

import {
	NavItemWrapper,
	NavItemLink,
	ItemLinkActive,
	LinkIcon,
} from '../styled-components';

const NavItem = ({ exact, to, children }) => (
	<NavItemWrapper>
		<NavItemLink exact={exact} to={to}>
			<ItemLinkActive tabIndex='-1'>
				<LinkIcon>{children}</LinkIcon>
			</ItemLinkActive>
		</NavItemLink>
	</NavItemWrapper>
);

NavItem.propTypes = {
	exact: PropTypes.bool.isRequired,
	to: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};

export default NavItem;
