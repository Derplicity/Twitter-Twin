import styled from 'styled-components';
import { globals, flexParent, flexChild } from './shared';

const NotFound = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  width: 100%;
  padding: 39px 10px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
`;

const Wrapper = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  width: 100%;
  height: calc(100vh - 64px);
`;

const notFoundStyles = {
  Wrapper,
};

export default { ...NotFound, ...notFoundStyles };
