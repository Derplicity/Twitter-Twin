import styled from 'styled-components';
import { globals, flexParent, flexChild } from './shared';

const Main = styled.div``;

const Header = styled.div`
  ${globals};
  ${flexChild};
  ${flexParent};

  width: 100%;
  height: 3.5em;
  background-color: rgb(28, 41, 56);
  border-bottom: 1px solid rgb(56, 68, 77);
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const mainStyles = {
  Header,
};

export default { ...Main, ...mainStyles };
