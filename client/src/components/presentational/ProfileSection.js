import React from 'react';
import PropTypes from 'prop-types';

import {
  ProfileSectionWrapper,
  ProfileLink,
  ProfileImg,
  ProfileName,
  ProfileUsername,
  ProfileFollow,
  ProfileFollowLink,
  ProfileFollowNum,
} from '../styled-components';

const propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    screen_name: PropTypes.string.isRequired,
    profile_image_url_https: PropTypes.string.isRequired,
    friends_count_formatted: PropTypes.string.isRequired,
    followers_count_formatted: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
};

const defaultProps = {
  user: null,
  onClick: () => null,
};

export function ProfileSectionPresentator(props) {
  const { user, onClick } = props;

  if (!user) return null;

  return (
    <ProfileSectionWrapper data-testid="ProfileSectionPresentator">
      <ProfileLink
        to={`/${user.screen_name}`}
        onClick={onClick}
        data-testid="profileLink"
      >
        <ProfileImg
          src={user.profile_image_url_https}
          alt={user.name}
          data-testid="profileImage"
        />
        <ProfileName data-testid="profileName">{user.name}</ProfileName>
        <ProfileUsername data-testid="profileUsername">
          @{user.screen_name}
        </ProfileUsername>
      </ProfileLink>
      <ProfileFollow>
        <ProfileFollowLink
          to="/following"
          onClick={onClick}
          data-testid="followLink"
        >
          <ProfileFollowNum data-testid="friendCount">
            {user.friends_count_formatted}
          </ProfileFollowNum>{' '}
          Following
        </ProfileFollowLink>
        <ProfileFollowLink
          to="/followers"
          onClick={onClick}
          data-testid="followLink"
        >
          <ProfileFollowNum data-testid="followCount">
            {user.followers_count_formatted}
          </ProfileFollowNum>{' '}
          Followers
        </ProfileFollowLink>
      </ProfileFollow>
    </ProfileSectionWrapper>
  );
}

ProfileSectionPresentator.propTypes = propTypes;
ProfileSectionPresentator.defaultProps = defaultProps;

export default ProfileSectionPresentator;
