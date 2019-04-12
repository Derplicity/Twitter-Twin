import styled from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';

const Button = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  text-align: center;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  flex-grow: 1;
  flex-shrink: 0;
`;

const Wrapper = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};
  ${interactive};

  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  min-height: 30px;
  border-color: rgb(29, 161, 242);
  border-width: 1px;
  border-radius: 9999px;
  padding: 0 1em;
  transition-property: background-color;
  transition-duration: 0.2s;
  user-select: none;
  flex-shrink: 0;

  &:hover {
    background-color: rgba(29, 161, 242, 0.1);
  }
`;

const buttonStyles = {
  Wrapper,
};

export default { ...Button, ...buttonStyles };
