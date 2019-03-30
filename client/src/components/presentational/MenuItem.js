import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	MenuItemWrapper,
	MenuLink,
	LinkIcon,
	LinkHeader,
	MenuSwitch,
	MenuSwitchLabel,
	MenuSwitchInput,
	MenuSwitchSlider,
} from '../styled-components';

class MenuItem extends React.Component {
	state = {
		isChecked: true,
	};

	handleCheck = () => {
		this.setState({
			isChecked: !this.state.isChecked,
		});
	};

	render() {
		const { exact, to, icon, header, hasToggle, onClick } = this.props;
		const { isChecked } = this.state;
		return (
			<MenuItemWrapper>
				<MenuLink exact={exact} to={to} onClick={onClick}>
					{icon ? (
						<LinkIcon>
							<FontAwesomeIcon icon={icon} />
						</LinkIcon>
					) : null}
					<LinkHeader>{header}</LinkHeader>
				</MenuLink>
				{hasToggle && (
					<MenuSwitch>
						<MenuSwitchLabel>
							<MenuSwitchInput
								type='checkbox'
								checked={isChecked}
								onChange={this.handleCheck}
								onKeyDown={e =>
									e.keyCode === 13 && !e.shiftKey ? this.handleCheck() : null
								}
							/>
							<MenuSwitchSlider />
						</MenuSwitchLabel>
					</MenuSwitch>
				)}
			</MenuItemWrapper>
		);
	}
}

MenuItem.propTypes = {
	exact: PropTypes.bool.isRequired,
	to: PropTypes.string.isRequired,
	icon: PropTypes.array,
	header: PropTypes.string.isRequired,
	hasToggle: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default MenuItem;
