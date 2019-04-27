import styled from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';
import Icon from './Icon';

const DropdownContent = styled.div``;

const Backdrop = styled.div`
  ${globals};

  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3;
  pointer-events: auto;
`;

const Wrapper = styled.div`
  ${globals};

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

const Header = styled.div`
  ${globals};
  ${flexParent};

  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  border-bottom: 1px solid rgb(56, 68, 77);
  padding: 0 10px;
  line-height: 3.5rem;
`;

const Close = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};
  ${interactive};

  justify-content: center;
  align-items: center;
  width: 35px;
  height: 3.5rem;
  outline: none;

  &:hover ${Icon.Bubble} {
    background-color: rgba(29, 161, 242, 0.1);
  }

  &:focus ${Icon.Bubble} {
    transition-property: border;
    border: 2px solid rgb(29, 161, 242);
  }
`;

const TabBlock = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};
  ${interactive};

  width: 100%;
  height: calc(100% + 2px);
  align-items: center;
  justify-content: center;
`;

const Menu = styled.ul`
  ${globals};
  ${flexParent};

  pointer-events: auto;
  overscroll-behavior-y: contain;
  overflow-y: scroll;
  height: calc(100vh - 3.5rem);
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
`;

const Separator = styled.span`
  ${globals};

  width: 100%;
  border-bottom: ${props =>
    props.transparent
      ? '1px solid rgba(0, 0, 0, 0)'
      : '1px solid rgb(56, 68, 77)'};
  margin: ${props => (props.dark ? '0' : '10px 0')};
  padding: ${props => (props.dark ? '5px 0' : '0')};
  background-color: ${props =>
    props.dark ? 'rgb(16,23,30)' : 'rgba(0,0,0,0)'};
`;

const dropdownContentStyles = {
  Backdrop,
  Wrapper,
  Header,
  Close,
  TabBlock,
  Menu,
  Separator,
};

export default { ...DropdownContent, ...dropdownContentStyles };
