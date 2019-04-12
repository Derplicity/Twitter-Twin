import styled from 'styled-components';
import { globals, flexParent, flexChild } from './shared';
import { Aside, Main } from './Tweet';

const Hat = styled.div`
  ${globals};
  ${flexChild};
  ${flexParent};
  margin: 0 -5px 5px;
`;

const hatStyles = {
  Aside,
  Main,
};

export default { ...Hat, ...hatStyles };
