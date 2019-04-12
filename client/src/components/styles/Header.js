import styled from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';

const Header = styled.div`
  ${globals};
  ${flexChild};

  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  width: 100%;
  height: 3.5rem;
  background-color: rgb(28, 41, 56);
  position: fixed;
`;

const SkipToMain = styled.a`
  ${globals};
  ${interactive};

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

const headerStyles = {
  Wrapper,
  SkipToMain,
};

export default { ...Header, ...headerStyles };
