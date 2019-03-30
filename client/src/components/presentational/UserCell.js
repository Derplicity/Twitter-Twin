import React from 'react';

import Image from './Image';

import { UserCell, Button, Text, Icon } from '../styles';

export default function({ user, onUserClick, onFollowClick }) {
	const name = user.name;
	const isVerified = user.verified;
	const username = user.screen_name;
	const url = `/${username}`;
	const imgsrc = user.profile_image_url_https;
	return (
		<UserCell.Interactive
			transitionto="blueGrey__light"
			onClick={e => onUserClick(e, url)}
		>
			<UserCell.Wrapper>
				<UserCell>
					<UserCell.Image>
						<Image to={url} src={imgsrc} alt={name} isCircle isSmall />
					</UserCell.Image>
					<UserCell.Content>
						<UserCell.Header>
							<Text.InternalLink to={url} inline="true">
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
							<Button.Wrapper onClick={onFollowClick}>
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
