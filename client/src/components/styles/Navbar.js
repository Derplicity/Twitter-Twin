import styled from 'styled-components';
import { globals, flexParent, flexChild } from './shared';

const Navbar = styled.nav`
  ${globals};
  ${flexParent};
  ${flexChild};

  width: 100%;
  height: 100%;
  align-items: center;
`;

const Wrapper = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  max-width: 882px;
  height: 100%;
  margin: auto;
`;

const Nav = styled.ul`
  ${globals};
  ${flexParent};
  ${flexChild};

  height: 100%;
  flex-shrink: 0;
  justify-content: space-around;
  align-items: center;
  white-space: nowrap;
  margin: ${props =>
    props.left ? '0 20px 0 0' : props.right ? '0 0 0 20px' : null};
  min-width: ${props => (props.left ? '360px' : null)};
  max-width: ${props => (props.right ? '100%' : null)};
`;

const Search = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  width: 100%;
  height: 100%;
  align-items: center;
`;

const navbarStyles = {
  Wrapper,
  Nav,
  Search,
};

export default { ...Navbar, ...navbarStyles };
