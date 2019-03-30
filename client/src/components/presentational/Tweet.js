import React from 'react';

import MediaSelector from '../functional/MediaSelector';

import Hat from './Hat';
import Image from './Image';
import Action from './Action';

import { Tweet, Header, Text, Icon, Body } from '../styles';

export default function({ props }) {
	const {
		isRetweet,
		authorUrl,
		name,
		oAuthorUrl,
		oImgSrc,
		oUsername,
		oName,
		oIsVerified,
		tweetUrl,
		time,
		timeCreated,
		formattedText,
		entities,
		extended_entities,
		isRetweeted,
		retweetCount,
		isLiked,
		likeCount,
		handleTweetClick,
		handleAction,
	} = props;

	return (
		<Tweet.Wrapper>
			<Tweet.Interactive
				transitionto="blueGrey__light"
				onClick={handleTweetClick}
			>
				<Tweet role="article" tabIndex="0">
					{isRetweet && <Hat to={authorUrl} text={name} />}
					<Tweet.Skeleton>
						<Tweet.Aside>
							<Image
								to={oAuthorUrl}
								src={oImgSrc}
								alt={oUsername}
								isCircle
								isSmall
							/>
						</Tweet.Aside>
						<Tweet.Main>
							<Tweet.Content>
								<Header>
									<Header.Content>
										<Text.InternalLink to={oAuthorUrl}>
											<Text.Group>
												<Text enableCrop bold decor color="white">
													{oName}
												</Text>
												{oIsVerified && (
													<Icon.Wrapper
														style={{
															marginLeft: '2px',
														}}
														small
													>
														<Icon
															icon={['fas', 'check-circle']}
															color="white"
														/>
													</Icon.Wrapper>
												)}
											</Text.Group>
											<Text
												enableCrop
												color="grey"
												style={{ margin: '0 0 0 5px' }}
											>
												@{oUsername}
											</Text>
										</Text.InternalLink>
										<Text.Group>
											<Text
												style={{
													padding: '0 5px',
												}}
												color="grey"
											>
												•
											</Text>
											<Text.InternalLink to={tweetUrl} title={time.createdStr}>
												<Text
													as="time"
													dateTime={timeCreated}
													color="grey"
													decor
												>
													{time.since}
												</Text>
											</Text.InternalLink>
										</Text.Group>
									</Header.Content>
									<Header.Actions>
										<Action type="caret-down" isSmall />
									</Header.Actions>
								</Header>
								<Body>
									<Text color="white">{formattedText}</Text>
								</Body>
								<MediaSelector
									entities={entities}
									extended_entities={extended_entities}
								/>
							</Tweet.Content>
							<Tweet.Actions>
								<Action type="comment" onAction={handleAction} />
								<Action
									type="retweet"
									isActive={isRetweeted}
									count={retweetCount}
									onAction={handleAction}
								/>
								<Action
									type="heart"
									isActive={isLiked}
									count={likeCount}
									onAction={handleAction}
								/>
								<Action type="upload" onAction={handleAction} />
							</Tweet.Actions>
						</Tweet.Main>
					</Tweet.Skeleton>
				</Tweet>
			</Tweet.Interactive>
		</Tweet.Wrapper>
	);
}
