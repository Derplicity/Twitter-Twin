import styled from 'styled-components';
import { globals, flexParent, flexChild } from './shared';

const Media = styled.div``;

const Wrapper = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};
  max-width: 100%;
  max-height: 100%;
  border-width: 1px;
  border-color: rgb(56, 68, 77);
  border-radius: 14px;
  margin-top: 10px;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const mediaStyles = {
  Wrapper,
};

export default { ...Media, ...mediaStyles };
