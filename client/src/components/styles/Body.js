import styled from 'styled-components';
import { globals, flexParent, flexChild } from './shared';

const Body = styled.div`
  ${globals};
  ${flexChild};
  ${flexParent};

  flex-grow: 1;
  flex-shrink: 0;
`;

const bodyStyles = {};

export default { ...Body, ...bodyStyles };
