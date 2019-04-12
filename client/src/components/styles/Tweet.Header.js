import styled from 'styled-components';
import { globals, flexParent, flexChild } from './shared';

const Header = styled.div`
  ${globals};
  ${flexChild};
  ${flexParent};
  justify-content: space-between;
  margin-bottom: 2px;
`;

const Content = styled.div`
  ${globals};
  ${flexChild};
  ${flexParent};
  align-items: baseline;
`;

const Actions = styled.div`
  ${globals};
  ${flexChild};
  ${flexParent};
  align-items: center;
  margin-left: 20px;
`;

const headerStyles = {
  Content,
  Actions,
};

export default { ...Header, ...headerStyles };
