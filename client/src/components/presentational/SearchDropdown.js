import React from 'react';
import PropTypes from 'prop-types';
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

const propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id_str: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      screen_name: PropTypes.string.isRequired,
      profile_image_url_https: PropTypes.string.isRequired,
      following: PropTypes.bool,
    }),
  ),
  trends: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      query: PropTypes.string.isRequired,
      tweet_volume: PropTypes.string,
    }),
  ),
  handleClickSubmit: PropTypes.func,
};

const defaultProps = {
  users: [],
  trends: [],
  handleClickSubmit: () => null,
};

export function SearchDropdownPresentator(props) {
  const { users, trends, handleClickSubmit } = props;

  return (
    <SearchDropdownContainer data-testid="SearchDropdownPresentator">
      <SearchDropdownList id="search-list">
        {trends.length !== 0
          ? trends.map(trend => (
              <SearchDropdownItem
                key={trend.name}
                small
                data-testid="trendItem"
              >
                <SearchDropdownLink
                  to={`/search?q=${trend.query}`}
                  onClick={handleClickSubmit}
                  data-testid="trendLink"
                >
                  <SearchProfileWrapper>
                    <ProfileName small data-testid="trendName">
                      {trend.name}
                    </ProfileName>
                    {trend.tweet_volume ? (
                      <ProfileUsername small data-testid="trendVolume">
                        {trend.tweet_volume} Tweets
                      </ProfileUsername>
                    ) : null}
                  </SearchProfileWrapper>
                </SearchDropdownLink>
              </SearchDropdownItem>
            ))
          : null}
        {trends.length !== 0 && users.length !== 0 ? (
          <Separator dark transparent data-testid="separator" />
        ) : null}
        {users.length !== 0
          ? users.map(user => (
              <SearchDropdownItem key={user.id_str} data-testid="userItem">
                <SearchDropdownLink
                  to={`/${user.screen_name}`}
                  onClick={handleClickSubmit}
                  data-testid="userLink"
                >
                  <ProfileImg
                    src={user.profile_image_url_https}
                    alt={user.name}
                    data-testid="userImage"
                  />
                  <SearchProfileWrapper>
                    {user.following ? (
                      <IsFollowing data-testid="userFollowing">
                        <FontAwesomeIcon icon={['far', 'user']} /> Following
                      </IsFollowing>
                    ) : null}
                    <ProfileName small data-testid="userName">
                      {user.name}
                    </ProfileName>
                    <ProfileUsername small data-testid="userUsername">
                      @{user.screen_name}
                    </ProfileUsername>
                  </SearchProfileWrapper>
                </SearchDropdownLink>
              </SearchDropdownItem>
            ))
          : null}
        {users.length === 0 && trends.length === 0 ? (
          <SearchDropdownPlaceholder data-testid="placeholder">
            Try searching for people, topics, or keywords
          </SearchDropdownPlaceholder>
        ) : null}
      </SearchDropdownList>
    </SearchDropdownContainer>
  );
}

SearchDropdownPresentator.propTypes = propTypes;
SearchDropdownPresentator.defaultProps = defaultProps;

export default SearchDropdownPresentator;
