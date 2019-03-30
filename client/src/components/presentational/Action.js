import React from 'react';

import { Action, Icon, Text } from '../styles';

export default function({ type, isSmall, isActive, count, onAction }) {
	return (
		<Action>
			<Icon.Interactive
				transitionto={
					type === 'heart' ? 'red' : type === 'retweet' ? 'green' : 'blue'
				}
				onClick={() => onAction(type)}
			>
				<Action.Group>
					<Icon.Container>
						<Icon.Bubble
							small
							transitionto={
								type === 'heart'
									? 'red_lighter'
									: type === 'retweet'
									? 'green_lighter'
									: 'blueGrey__lighter'
							}
						/>
						<Icon.Wrapper small={isSmall}>
							<Icon
								icon={['fas', type]}
								color={
									isActive
										? type === 'heart'
											? 'red'
											: type === 'retweet'
											? 'green'
											: 'blue'
										: 'grey'
								}
							/>
						</Icon.Wrapper>
					</Icon.Container>
					{count > 0 && (
						<Text small color="grey" style={{ marginLeft: '8px' }}>
							{count}
						</Text>
					)}
				</Action.Group>
			</Icon.Interactive>
		</Action>
	);
}
