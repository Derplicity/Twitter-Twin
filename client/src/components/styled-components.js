import styled, { keyframes, css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import MicrolinkCard from '@microlink/react';

const activeClassName = 'active';

/*__________MEDIA QUERIES__________*/

const sizes = {
  desktop: 930,
  tablet: 768,
  phone: 574,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

/*___________ANIMATIONS___________*/

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

/*_____________SHARED_____________*/

export const LinkIcon = styled.div`
  width: 45px;
  height: 45px;
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 100%;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    color: ${props =>
      props.inverse ? 'rgb(29, 161, 242)' : 'rgb(136, 153, 166)'};
  }
`;

/*___________COMPONENTS___________*/

export const AsideContainer = styled.div`
  grid-area: aside;
  width: 100%;
  backface-visibility: hidden;
  justify-self: left;

  position: sticky;
  top: calc(3.5em + 8px);

  overflow-y: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  max-height: calc(100vh - 3.5rem);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 0 3.5em;

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  ${media.desktop`
    display: none;
  `}
`;

export const Button = styled.button`
  border-radius: 50%;
  width: 215px;
  height: 215px;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);
  transition-timing-function: ease-in;
  transition: 0.3s;
  transform: scale(0.7);
  border: 3px solid #ffffff;
  background: ${props => (props.disabled ? '#999' : '#326ada')};
  cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};

  svg {
    font-size: 10em !important;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);
    transition: 0.3s;
    color: #fff;
  }

  &:hover {
    background: ${props => (props.disabled ? '#999' : '#433e90')};
    box-shadow: ${props =>
      props.disabled
        ? '1px 2px 2px rgba(0, 0, 0, 0.25)'
        : '2px 5px 5px rgba(0, 0, 0, 0.5)'};

    svg {
      text-shadow: ${props =>
        props.disabled
          ? '1px 2px 2px rgba(0, 0, 0, 0.25)'
          : '2px 5px 5px rgba(0, 0, 0, 0.5)'};
      transform: rotate(-1.1deg);
    }
  }
`;

export const ButtonWrapper = styled.div`
  height: 215px;
  animation: ${fadeIn} 2s;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 90vw;

  ${media.tablet`flex-wrap: wrap;`}
  ${media.phone`
  flex-direction: column;
		flex-wrap: nowrap;
  `}
`;

export const DotSpacer = styled.span`
  color: rgb(136, 153, 166);
  font-size: 15px;
  font-weight: 400;
  padding: 0 5px;
`;

export const DropdownBackdrop = styled.div`
  display: ${props => (props.isDropped ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3;
  pointer-events: none;
`;

export const DropdownClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  cursor: pointer;
  height: 3.5rem;
  outline: none;

  &:hover ${LinkIcon} {
    background-color: rgba(29, 161, 242, 0.1);
  }

  &:focus ${LinkIcon} {
    border-color: rgb(29, 161, 242);
  }
`;

export const DropdownContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 251px;
  height: 100vh;
  background-color: rgb(28, 41, 56);
  z-index: 4;
  pointer-events: auto;
  overflow: hidden;
`;

export const DropdownHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  border-bottom: 1px solid rgb(56, 68, 77);
  padding: 0 10px;
  line-height: 3.5rem;

  h2 {
    font-weight: 800;
    font-size: 19px;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(255, 255, 255);
    overflow-wrap: break-word;
    max-width: 100%;
    height: 100%;
    text-decoration: none;
    margin: 0;
  }
`;

export const DropdownMenu = styled.ul`
  overscroll-behavior-y: contain;
  overflow-y: scroll;
  height: calc(100vh - 3.5rem);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 10px 0;
`;

export const FooterContainer = styled.div`
  grid-area: footer;
  width: 100%;
  height: 133px;
  background-color: rgb(21, 32, 43);
  justify-self: left;

  ${media.desktop`
    display: none;
  `}
`;

export const HeaderContainer = styled.div`
  grid-area: header;
  width: 100%;
  height: 3.5rem;
  z-index: 1000;
`;

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 3.5rem;
  background-color: rgb(28, 41, 56);
  position: fixed;
`;

export const ItemLinkActive = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IsFollowing = styled.span`
  position: relative;
  color: rgb(136, 153, 166);
  font-size: 10px;
  font-weight: 400;
`;

export const IsRetweeted = styled.span`
  position: relative;
  width: 100%;
  text-align: left;
  color: rgb(136, 153, 166);
  font-size: 12px;
  font-weight: 400;
  margin-left: -12px;

  &:hover {
    text-decoration: underline;
    text-decoration-color: rgb(136, 153, 166);
  }

  & svg {
    margin-right: 3px;
    text-decoration: none;
  }
`;

export const LinkHeader = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 400;
  font-size: 15px;
  color: rgb(255, 255, 255);
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  svg {
    color: rgb(29, 161, 242);
    font-size: 1.5em;
    animation: ${rotate} 1.5s linear infinite;
  }
`;

export const MainContainer = styled.div`
  grid-area: main;
  width: 100%;
  height: 100%;
  background-color: rgb(21, 32, 43);
  justify-self: right;

  ${media.desktop`
    height: calc(100vh - 3.5rem);
  `}
`;

export const MainHeaderText = styled.h2`
  width: 100%;
  color: rgb(255, 255, 255);
  font-size: 19px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-wrap: break-word;
`;

export const MainHeaderWrapper = styled.div`
  width: 100%;
  height: 3.5em;
  background-color: rgb(28, 41, 56);
  border-bottom: 1px solid rgb(56, 68, 77);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

export const MenuItemWrapper = styled.li`
  position: relative;
  height: 3.5rem;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: rgb(21, 32, 43);
  }
`;

export const MenuLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${LinkIcon} {
    width: 35px;
    height: 35px;
    padding: 0;
    svg {
      margin-right: 10px;
      font-size: 1rem;
    }
  }

  &:hover {
    text-decoration: none;
  }
`;

export const MenuSwitch = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 10px;
  cursor: default;
`;

export const MenuSwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const MenuSwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 35px;
  height: 12px;
`;

export const MenuSwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.2s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 0;
    top: -3px;
    background-color: white;
    transition: 0.2s;
    border-radius: 50%;
  }

  ${MenuSwitchInput}:checked + & {
    background-color: rgb(113, 201, 248);
  }

  ${MenuSwitchInput}:focus + &:before {
    box-shadow: 0 0 10px rgb(28, 41, 56);
  }

  ${MenuSwitchInput}:checked + &:before {
    background-color: rgb(29, 161, 242);
    transform: translateX(17px);
  }
`;

export const NavbarNav = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding: 0;
  white-space: nowrap;
  margin: ${props =>
    props.left ? '0 20px 0 0' : props.right ? '0 0 0 20px' : null};
  min-width: ${props => (props.left ? '360px' : null)};
  max-width: ${props => (props.right ? '100%' : null)};
`;

export const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  max-width: 882px;
  height: 100%;
  margin: auto;
`;

export const NavDropdownDrop = styled.div`
  padding-right: 5px;
  border-radius: 25px;
  border: 2px solid rgba(0, 0, 0, 0);

  svg {
    color: rgb(136, 153, 166);
    width: 20px;
    height: 20px;
  }
`;

export const NavDropdownLink = styled.div`
  display: block;
  outline: none;
  border-radius: 25px;

  &:hover {
    ${NavDropdownDrop} {
      outline: none;
      background-color: rgba(29, 161, 242, 0.1);
      cursor: pointer;

      svg {
        color: rgb(29, 161, 242);
      }
    }
  }

  &:focus {
    ${NavDropdownDrop} {
      outline: none;
      border-color: rgb(29, 161, 242);
    }
  }
`;

export const NavDropdownWrapper = styled.li`
  border-radius: 25px;
`;

export const NavItemWrapper = styled.li`
  width: 100%;
  text-align: center;
`;

export const NavItemLink = styled(NavLink).attrs({
  activeClassName,
})`
  display: block;
  width: 100%;
  height: 3.5rem;
  outline: none;

  &:hover ${LinkIcon} {
    background-color: rgba(29, 161, 242, 0.1);

    svg {
      color: rgb(29, 161, 242);
    }
  }

  &:focus ${LinkIcon} {
    border-color: rgb(29, 161, 242);

    svg {
      color: rgb(29, 161, 242);
    }
  }

  &.${activeClassName} {
    ${ItemLinkActive} {
      border-color: rgb(29, 161, 242);
    }

    ${LinkIcon} svg {
      color: rgb(29, 161, 242);
    }
  }
`;

export const NavUserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 10px;
`;

export const NavUserName = styled.span`
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-weight: 600;
`;

export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 540px 325px 1fr;
  grid-template-rows: auto;
  grid-column-gap: 17px;
  grid-row-gap: 8px;
  grid-template-areas:
    'header header header header'
    '.      main   aside  .     '
    '.      main   aside .     '
    '.      main   .      .     ';

  ${media.desktop`
    grid-template-columns: 1fr 540px 1fr;
    grid-row-gap: 0px;
    grid-template-areas:
      'header header header'
      '.      main   .     ';
  `}

  ${media.phone`
    grid-template-columns: 1fr;
		grid-template-areas:
			'header'
			'main  ';
  `}
`;

export const ProfileFollow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px 10px 20px;
`;

export const ProfileFollowLink = styled(NavLink)`
  color: rgb(136, 153, 166);
  font-size: 13px;
  margin-right: 10px;

  &:hover {
    color: rgb(136, 153, 166);
    text-decoration: underline;
    text-decoration-color: rgb(255, 255, 255);
  }
`;

export const ProfileFollowNum = styled.span`
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 700;
`;

export const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
`;

export const ProfileLink = styled(NavLink)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;

  &:hover {
    text-decoration: none;
  }
`;

export const ProfileName = styled.span`
  width: 100%;
  margin-top: 5px;
  color: rgb(255, 255, 255);
  font-size: ${props => (props.small ? '13px' : '15px')};
  font-weight: 500;
`;

export const ProfileSectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ProfileUsername = styled.span`
  width: 100%;
  color: rgb(136, 153, 166);
  font-size: ${props => (props.small ? '12px' : '14px')};
  font-weight: 400;
  line-height: 1;
`;

export const Search = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 13px;
  pointer-events: auto;

  svg {
    position: absolute;
    top: 16px;
    left: 8px;
    z-index: 2;
    margin-top: 5px;
    margin-left: 3px;
    width: 15px;
    height: 15px;
    color: rgb(136, 153, 166);
  }
`;

export const SearchBox = styled.input`
  pointer-events: auto;
  width: 100%;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 5px 35px;
  position: absolute;
  top: 13px;
  left: 0;
  background-color: rgb(16, 23, 30);
  color: rgb(255, 255, 255);
  font-weight: 500;

  &::placeholder {
    color: rgb(136, 153, 166);
  }

  &:focus {
    outline: none;
    border-color: rgb(29, 161, 242);

    & + svg {
      color: rgb(29, 161, 242);
    }
  }
`;

export const SearchClear = styled.div`
  pointer-events: auto;
  position: absolute;
  top: 14px;
  right: 1px;
  width: 29px;
  height: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background: rgba(29, 161, 242, 0.1);
  }

  svg {
    position: static;
    z-index: 2;
    margin: 0;
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    color: rgb(29, 161, 242);
  }
`;

export const SearchDropdownContainer = styled.div`
  pointer-events: auto;
  position: absolute;
  top: 3.5em;
  right: 0;
  left: 0;
  width: 100%;
  min-height: 100px;
  max-height: calc(80vh - 53px);
  background-color: rgb(21, 32, 43);
  border-radius: 5px;
  z-index: 4;
  pointer-events: auto;
  overscroll-behavior-y: contain;
  overflow: scroll;
`;

export const SearchDropdownItem = styled.li`
  pointer-events: auto;
  position: relative;
  height: ${props => (props.small ? '3.5rem' : '4.5rem')};
  width: 100%;
  cursor: pointer;
  border-bottom: 1px solid rgb(56, 68, 77);

  &:hover {
    background-color: rgba(29, 161, 242, 0.05);
  }
`;

export const SearchDropdownLink = styled(NavLink)`
  pointer-events: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 10px;

  &:hover {
    text-decoration: none;
  }
`;

export const SearchDropdownList = styled.ul`
  pointer-events: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 10px 0;
`;

export const SearchDropdownPlaceholder = styled.span`
  pointer-events: auto;
  width: 100%;
  text-align: center;
  margin-top: 10px;
  color: rgb(136, 153, 166);
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
`;

export const SearchForm = styled.form`
  pointer-events: auto;
  width: 100%;
  height: 100%;
`;

export const SearchProfileWrapper = styled.div`
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px;

  ${IsFollowing} svg {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: -2px;
    margin-left: -13px;
    color: rgb(136, 153, 166);
    font-size: 10px;
  }
`;

export const Separator = styled.span`
  width: 100%;
  border-bottom: ${props =>
    props.transparent
      ? '1px solid rgba(0, 0, 0, 0)'
      : '1px solid rgb(56, 68, 77)'};
  margin: ${props => (props.dark ? null : '10px 0')};
  padding: ${props => (props.dark ? '5px 0' : null)};
  background-color: ${props => (props.dark ? 'rgb(16,23,30)' : null)};
`;

export const SkipToMain = styled.a`
  position: absolute;
  top: -1000px;
  left: -1000px;
  height: 1px;
  width: 1px;
  text-align: left;
  overflow: hidden;

  &:focus,
  &:active,
  &:hover {
    left: 0;
    top: 0;
    width: auto;
    height: auto;
    overflow: visible;
  }
`;

export const TweetBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const TimeCreated = styled(NavLink)`
  color: rgb(136, 153, 166);
  font-size: 15px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-wrap: break-word;

  &:hover {
    color: rgb(136, 153, 166);
    text-decoration: underline;
    text-decoration-color: rgb(136, 153, 166);
  }
`;

export const TweetContent = styled.div`
  width: calc(100% - 55px);
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
`;

export const TweetHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 5px;
`;

export const TweetImageWrapper = styled.div`
  width: 100%;
  background-color: transparent;
  background-image: ${props => `url('${props.url}')`};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 14px;
`;

export const TweetImage = styled.img`
  width: 100%;
  max-height: 300px;
  opacity: 0;
`;

export const LinkCard = styled(MicrolinkCard)`
  width: 100%;
  height: 100px;
  border-radius: 14px;

  body & {
    background-color: transparent;
    border: none;
    color: rgb(136, 153, 166);

    &:hover {
      background-color: rgba(29, 161, 242, 0.05);
      border: none;
      text-decoration: none;
    }
  }

  & .microlink_card__content_title {
    color: rgb(255, 255, 255);
    font-size: 15px;
    font-weight: 400;
  }
`;

export const TweetProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
`;

export const TweetText = styled.span`
  color: rgb(255, 255, 255);
  width: 100%;
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  white-space: pre-line;
  padding-bottom: 5px;
`;

export const TweetUserLink = styled(NavLink)`
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    text-decoration: none;
  }
`;

export const TweetUserName = styled.span`
  min-width: 0;
  display: inline;
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  overflow-wrap: break-word;

  ${TweetUserLink}:hover & {
    text-decoration: underline;
    text-decoration-color: rgb(255, 255, 255);
  }

  & svg {
    margin-left: 3px;
    text-decoration: none;
  }
`;

export const TweetUserUsername = styled.span`
  min-width: 0;
  display: inline;
  margin-left: 5px;
  color: rgb(136, 153, 166);
  font-size: 15px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  overflow-wrap: break-word;
`;

export const TweetVideoFrame = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  margin-bottom: -6px;
  cursor: pointer;
  background-color: rgb(0, 0, 0);
`;

export const TweetVideoOverlay = styled.div`
  display: ${props => (props.isControls ? 'none' : 'block')};
  position: absolute;
  bottom: 8px;
  left: 8px;
  background-color: rgb(20, 23, 26);
  height: 17px;
  cursor: default;
  padding: 0 5px;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  font-size: 11px;
  font-weight: ${props => (props.gif ? '800' : '400')};
  font-variant-numeric: tabular-nums;
  text-align: center;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  user-select: none;
`;

export const TweetVideoWrapper = styled.figure`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  border-radius: 14px;
`;

export const TweetWrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid rgb(56, 68, 77);
  padding: 15px 10px;
  cursor: pointer;
`;

export const VideoControls = styled.li`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 10px 5px;
`;

export const VideoControlsButton = styled.div`
  width: 1.25em;
  height: 1.25em;
  display: ${props => (props.supportsFullScreen ? 'none' : 'block')};
  position: relative;
  appearance: none;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.85);
  font-size: 18px;
  padding: 2px 6px 6px;
  border: none;
  box-shadow: none;
  cursor: pointer;
  outline: none;
  user-select: none;
  margin: 0 5px;

  & svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  &:hover {
    color: rgb(255, 255, 255);
  }
`;

export const VideoControlsButtonSlider = styled.input`
  width: 115px;
  height: 26px;
  position: absolute;
  bottom: 1em;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  cursor: pointer;
  outline: none;
  padding: 15px;

  -webkit-appearance: none;
  transform-origin: calc(0% + 10px);
  transform: rotate(-90deg);

  &::-webkit-slider-runnable-track {
    width: 115px;
    height: 5px;
    background-color: rgba(136, 153, 166, 0.75);
    border: none;
    border-radius: 15px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;

    margin-top: -5px;
    width: 15px;
    height: 15px;
    background-color: rgb(255, 255, 255);
    border: none;
    border-radius: 19px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 3px;
  }

  &::-moz-range-track {
    margin-top: 13px;
    width: 115px;
    height: 5px;
    background-color: rgba(136, 153, 166, 0.75);
    border: none;
    border-radius: 15px;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background-color: rgb(255, 255, 255);
    border-radius: 19px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 3px;
  }

  &::-ms-fill-lower {
    margin-top: 13px;
    width: 115px;
    height: 5px;
    background-color: rgba(136, 153, 166, 0.75);
    border: none;
    border-radius: 15px;
  }

  &::-ms-fill-upper {
    margin-top: 13px;
    width: 115px;
    height: 5px;
    background-color: rgba(136, 153, 166, 0.75);
    border: none;
    border-radius: 15px;
  }

  &::-ms-track {
    width: 15px;
    height: 15px;
    background-color: rgb(255, 255, 255);
    border-radius: 19px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 3px;
    border-color: transparent;
    cursor: pointer;
    color: transparent;
  }

  ${VideoControlsButton} & {
    display: none;
  }

  ${VideoControlsButton}:hover & {
    display: block;
  }
`;

export const VideoControlsLeft = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const VideoControlsRight = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const VideoControlsText = styled.div`
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  cursor: default;
  user-select: none;
  margin-right: 10px;
`;

export const VideoControlsWrapper = styled.ul`
  width: 100%;
  height: 65px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: ${props =>
    props.supportsVideo && props.isControls ? 'flex' : 'none'};
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.65));
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  cursor: default;
`;

export const VideoProgress = styled.li`
  width: 100%;
  height: 30px;
  display: block;
  position: relative;
  margin: 0 15px 15px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
`;

export const VideoProgressBar = styled.progress`
  width: 100%;
  height: 3px;
  position: relative;
  border: none;
  color: rgb(255, 255, 255);

  ${VideoProgress}:hover & {
    height: 5px;
  }

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
  }

  &::-webkit-progress-value {
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
  }

  &::-moz-progress-bar {
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
  }
`;

export const VideoProgressSlider = styled.input`
  display: none;
  width: 100%;
  position: absolute;
  top: 5px;
  left: 0;
  background-color: transparent;
  outline: none;
  cursor: pointer;

  -webkit-appearance: none;

  ${VideoProgress}:hover & {
    display: block;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;

    width: 15px;
    height: 15px;
    background-color: rgb(255, 255, 255);
    border-radius: 19px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 3px;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background-color: rgb(255, 255, 255);
    border-radius: 19px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 3px;
  }

  &::-ms-track {
    width: 15px;
    height: 15px;
    background-color: rgb(255, 255, 255);
    border-radius: 19px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 3px;
    border-color: transparent;
    cursor: pointer;
    color: transparent;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
