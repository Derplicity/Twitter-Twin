import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

import { UserCell, Button, Text, Icon } from '../styles';

const propTypes = {
	user: PropTypes.shape({
		name: PropTypes.string,
		screen_name: PropTypes.string,
		verified: PropTypes.bool,
		profile_image_url_https: PropTypes.string,
	}),
	onUserClick: PropTypes.func,
	onFollowClick: PropTypes.func,
};

const defaultProps = {
	user: null,
	onUserClick: () => null,
	onFollowClick: () => null,
};

export default function UserCellPresentator({
	user,
	onUserClick,
	onFollowClick,
}) {
	if (!user) return null;

	const name = user.name;
	const isVerified = user.verified;
	const username = user.screen_name;
	const url = `/${username}`;
	const imgsrc = user.profile_image_url_https;

	return (
		<UserCell.Interactive
			transitionto="blueGrey__light"
			onClick={e => onUserClick(e, url)}
			data-testid="userCellLinkWrapper"
		>
			<UserCell.Wrapper data-testid="userCellComponent">
				<UserCell>
					<UserCell.Image>
						<Image
							to={url}
							src={imgsrc}
							alt={name}
							isCircle
							isSmall
							data-testid="userCellImage"
						/>
					</UserCell.Image>
					<UserCell.Content>
						<UserCell.Header>
							<Text.InternalLink
								to={url}
								inline="true"
								data-testid="userCellLink"
							>
								<Text.Group>
									<Text enableCrop bold decor color="white">
										{name}
									</Text>
									{isVerified && (
										<Icon.Wrapper
											style={{
												marginLeft: '2px',
											}}
											small
											data-testid="userCellVerified"
										>
											<Icon icon={['fas', 'check-circle']} color="white" />
										</Icon.Wrapper>
									)}
								</Text.Group>
								<Text enableCrop color="grey">
									@{username}
								</Text>
							</Text.InternalLink>
						</UserCell.Header>
						<UserCell.Button>
							<Button.Wrapper
								onClick={onFollowClick}
								data-testid="userCellButton"
							>
								<Button>
									<Text bold color="blue" enableCrop>
										Follow
									</Text>
								</Button>
							</Button.Wrapper>
						</UserCell.Button>
					</UserCell.Content>
				</UserCell>
			</UserCell.Wrapper>
		</UserCell.Interactive>
	);
}

UserCellPresentator.propTypes = propTypes;
UserCellPresentator.defaultProps = defaultProps;
