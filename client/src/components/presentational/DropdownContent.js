import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MenuItem from './MenuItem';
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

const DropdownContent = ({ isDropped, setNode, handleDrop, user }) => (
  <DropdownBackdrop isDropped={isDropped}>
    <DropdownContainer ref={node => setNode(node)}>
      <DropdownHeader>
        <h2>Account info</h2>
        <DropdownClose
          role="button"
          tabIndex="0"
          onClick={handleDrop}
          onKeyDown={e =>
            e.keyCode === 13 && !e.shiftKey ? handleDrop() : null
          }
        >
          <ItemLinkActive tabIndex="-1">
            <LinkIcon inverse>
              <FontAwesomeIcon icon={['fas', 'times']} />
            </LinkIcon>
          </ItemLinkActive>
        </DropdownClose>
      </DropdownHeader>
      <DropdownMenu id="drop-menu">
        <ProfileSection user={user} onClick={handleDrop} />
        <MenuItem
          exact={false}
          to={`/${user.screen_name}`}
          icon={['far', 'user']}
          header="Profile"
          hasToggle={false}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/lists"
          icon={['far', 'list-alt']}
          header="Lists"
          hasToggle={false}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/bookmarks"
          icon={['far', 'bookmark']}
          header="Bookmarks"
          hasToggle={false}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/moments"
          icon={['fas', 'bolt']}
          header="Moments"
          hasToggle={false}
          onClick={handleDrop}
        />
        <Separator />
        <MenuItem
          exact={false}
          to="/promote-mode"
          icon={['fab', 'react']}
          header="Promote Mode"
          hasToggle={false}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/twitter-ads"
          icon={['fas', 'share-square']}
          header="Twitter Ads"
          hasToggle={false}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/analytics"
          icon={['far', 'chart-bar']}
          header="Analytics"
          hasToggle={false}
          onClick={handleDrop}
        />
        <Separator />
        <MenuItem
          exact={false}
          to="/settings-and-privacy"
          header="Settings and privacy"
          hasToggle={false}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/help-center"
          header="Help Center"
          hasToggle={false}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/log-out"
          header="Log out"
          hasToggle={false}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/send-feedback"
          header="Send feedback"
          hasToggle={false}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/switch-to-legacy-twitter"
          header="Switch to legacy Twitter"
          hasToggle={false}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/settings-and-privacy"
          header="Settings and privacy"
          hasToggle={false}
          onClick={handleDrop}
        />
        <Separator transparent />
        <MenuItem
          exact={false}
          to="/data-saver"
          header="Data saver"
          hasToggle={true}
          onClick={handleDrop}
        />
        <MenuItem
          exact={false}
          to="/night-mode"
          header="Night mode"
          hasToggle={true}
          onClick={handleDrop}
        />
      </DropdownMenu>
    </DropdownContainer>
  </DropdownBackdrop>
);

DropdownContent.propTypes = {
  isDropped: PropTypes.bool.isRequired,
  setNode: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default DropdownContent;
