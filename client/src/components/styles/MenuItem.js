import styled from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';

const MenuItem = styled.div``;

const Wrapper = styled.div`
  ${globals};
  ${flexParent};
  ${interactive};
  transition-property: background-color;

  width: 100%;
  height: 3.5em;
  align-items: center;

  &:hover {
    background-color: rgb(21, 32, 43);
  }
`;

const InternalLink = styled(NavLink)`
  ${globals};
  ${flexParent};
  ${flexChild};

  width: 100%;
  align-items: center;
  padding: 15px 20px;

  & ${Icon.Wrapper} {
    margin-right: 10px;
  }
`;

const menuItemStyles = {
  Wrapper,
  InternalLink,
};

export default { ...MenuItem, ...menuItemStyles };
