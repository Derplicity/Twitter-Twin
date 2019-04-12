import styled from 'styled-components';
import { globals, flexParent, flexChild } from './shared';

const Action = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 0;
  align-items: center;
`;

const Group = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  align-items: center;
`;

const actionStyles = {
  Group,
};

export default { ...Action, ...actionStyles };
