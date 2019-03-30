import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	SearchDropdownContainer,
	SearchDropdownList,
	SearchDropdownPlaceholder,
	SearchDropdownItem,
	SearchDropdownLink,
	SearchProfileWrapper,
	ProfileImg,
	ProfileName,
	ProfileUsername,
	IsFollowing,
	Separator,
} from '../styled-components';

const SearchDropdown = ({ users, trends, handleClickSubmit }) => (
	<SearchDropdownContainer>
		<SearchDropdownList id='search-list'>
			{trends.length !== 0
				? trends.map(trend => (
						<SearchDropdownItem key={trend.name} small>
							<SearchDropdownLink
								to={`/search?q=${trend.query}`}
								onClick={handleClickSubmit}
							>
								<SearchProfileWrapper>
									<ProfileName small>{trend.name}</ProfileName>
									{trend.tweet_volume ? (
										<ProfileUsername small>
											{trend.tweet_volume} Tweets
										</ProfileUsername>
									) : null}
								</SearchProfileWrapper>
							</SearchDropdownLink>
						</SearchDropdownItem>
				  ))
				: null}
			{trends.length !== 0 && users.length !== 0 ? (
				<Separator dark transparent />
			) : null}
			{users.length !== 0
				? users.map(user => (
						<SearchDropdownItem key={user.id_str}>
							<SearchDropdownLink
								to={`/${user.screen_name}`}
								onClick={handleClickSubmit}
							>
								<ProfileImg
									src={user.profile_image_url_https}
									alt={user.name}
								/>
								<SearchProfileWrapper>
									{user.following ? (
										<IsFollowing>
											<FontAwesomeIcon icon={['far', 'user']} /> Following
										</IsFollowing>
									) : null}
									<ProfileName small>{user.name}</ProfileName>
									<ProfileUsername small>@{user.screen_name}</ProfileUsername>
								</SearchProfileWrapper>
							</SearchDropdownLink>
						</SearchDropdownItem>
				  ))
				: null}
			{users.length === 0 && trends.length === 0 ? (
				<SearchDropdownPlaceholder>
					Try searching for people, topics, or keywords
				</SearchDropdownPlaceholder>
			) : null}
		</SearchDropdownList>
	</SearchDropdownContainer>
);

export default SearchDropdown;
