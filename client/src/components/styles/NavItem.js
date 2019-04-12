import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { globals, flexParent, flexChild, interactive } from './shared';
import Icon from './Icon';

const NavItem = styled.nav`
  ${globals};
  ${flexParent};
  ${flexChild};
  ${interactive};

  width: 100%;
  height: calc(100% + 2px);
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  width: 100%;
  height: 100%;
`;

const activeClassName = 'active';
const { Wrapper: IconWrapper, Bubble } = Icon;

const InternalLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${globals};
  ${flexParent};
  ${flexChild};
  ${interactive};
  width: 100%;
  height: 100%;
  outline: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0);

  & ${IconWrapper} {
    margin-top: -2px;
  }

  &:hover {
    & ${Bubble} {
      transition-property: background-color;
      background-color: rgba(29, 161, 242, 0.1);
    }

    & ${Icon} {
      ${interactive};
      transition-property: color;
      color: rgb(29, 161, 242);
    }
  }

  &:focus {
    & ${Bubble} {
      ${interactive};
      transition-property: border;
      border: 2px solid rgb(29, 161, 242);
    }

    & ${Icon} {
      ${interactive};
      transition-property: color;
      color: rgb(29, 161, 242);
    }
  }

  &.${activeClassName} {
    & {
      border-color: rgb(29, 161, 242);
    }

    & svg {
      color: rgb(29, 161, 242);
    }
  }
`;

const navItemStyles = {
  Wrapper,
  InternalLink,
};

export default { ...NavItem, ...navItemStyles };
