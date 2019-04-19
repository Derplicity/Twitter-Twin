import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MenuItem from '../container/MenuItem';
import ProfileSection from './ProfileSection';

import {
  DropdownBackdrop,
  DropdownContainer,
  DropdownHeader,
  DropdownClose,
  LinkIcon,
  ItemLinkActive,
  DropdownMenu,
  Separator,
} from '../styled-components';

const propTypes = {
  isDropped: PropTypes.bool,
  setNode: PropTypes.func,
  handleDrop: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    screen_name: PropTypes.string.isRequired,
    profile_image_url_https: PropTypes.string.isRequired,
    friends_count_formatted: PropTypes.string.isRequired,
    followers_count_formatted: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  isDropped: false,
  user: null,
  setNode: () => null,
  handleDrop: () => null,
};

export function DropdownContentPresentator(props) {
  const { isDropped, setNode, handleDrop, user } = props;

  if (!user) return null;

  return (
    <DropdownBackdrop isDropped={isDropped} data-testid="backdrop">
      <DropdownContainer
        ref={node => setNode(node)}
        data-testid="DropdownContentPresentator"
      >
        <DropdownHeader>
          <h2>Account info</h2>
          <DropdownClose
            role="button"
            tabIndex="0"
            onClick={handleDrop}
            onKeyDown={e =>
              e.keyCode === 13 && !e.shiftKey ? handleDrop() : null
            }
            data-testid="closeButton"
          >
            <ItemLinkActive tabIndex="-1">
              <LinkIcon inverse>
                <FontAwesomeIcon icon={['fas', 'times']} />
              </LinkIcon>
            </ItemLinkActive>
          </DropdownClose>
        </DropdownHeader>
        <DropdownMenu id="drop-menu">
          <ProfileSection
            user={user}
            onClick={handleDrop}
            data-testid="ProfileSectionPresentator"
          />
          <MenuItem
            exact={false}
            to={`/${user.screen_name}`}
            icon={['far', 'user']}
            header="Profile"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/lists"
            icon={['far', 'list-alt']}
            header="Lists"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/bookmarks"
            icon={['far', 'bookmark']}
            header="Bookmarks"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/moments"
            icon={['fas', 'bolt']}
            header="Moments"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <Separator />
          <MenuItem
            exact={false}
            to="/promote-mode"
            icon={['fab', 'react']}
            header="Promote Mode"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/twitter-ads"
            icon={['fas', 'share-square']}
            header="Twitter Ads"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/analytics"
            icon={['far', 'chart-bar']}
            header="Analytics"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <Separator />
          <MenuItem
            exact={false}
            to="/settings-and-privacy"
            header="Settings and privacy"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/help-center"
            header="Help Center"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/log-out"
            header="Log out"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/send-feedback"
            header="Send feedback"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/switch-to-legacy-twitter"
            header="Switch to legacy Twitter"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/settings-and-privacy"
            header="Settings and privacy"
            hasToggle={false}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <Separator transparent />
          <MenuItem
            exact={false}
            to="/data-saver"
            header="Data saver"
            hasToggle={true}
            onClick={handleDrop}
            data-testid="menuItem"
          />
          <MenuItem
            exact={false}
            to="/night-mode"
            header="Night mode"
            hasToggle={true}
            onClick={handleDrop}
            data-testid="menuItem"
          />
        </DropdownMenu>
      </DropdownContainer>
    </DropdownBackdrop>
  );
}

DropdownContentPresentator.propTypes = propTypes;
DropdownContentPresentator.defaultProps = defaultProps;

export default DropdownContentPresentator;
