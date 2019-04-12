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

const ProfileSection = ({ user, onClick }) => (
  <ProfileSectionWrapper>
    <ProfileLink to={`/${user.screen_name}`} onClick={onClick}>
      <ProfileImg src={user.profile_image_url_https} alt={user.name} />
      <ProfileName>{user.name}</ProfileName>
      <ProfileUsername>@{user.screen_name}</ProfileUsername>
    </ProfileLink>
    <ProfileFollow>
      <ProfileFollowLink to="/following" onClick={onClick}>
        <ProfileFollowNum>{user.friends_count_formatted}</ProfileFollowNum>{' '}
        Following
      </ProfileFollowLink>
      <ProfileFollowLink to="/followers" onClick={onClick}>
        <ProfileFollowNum>{user.followers_count_formatted}</ProfileFollowNum>{' '}
        Followers
      </ProfileFollowLink>
    </ProfileFollow>
  </ProfileSectionWrapper>
);

ProfileSection.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProfileSection;
