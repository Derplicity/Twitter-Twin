import styled from 'styled-components';
import { globals } from './shared';

const Video = styled.div``;

const Wrapper = styled.div`
  ${globals};
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  border-radius: 14px;
  pointer-events: auto;
`;

const videoStyles = {
  Wrapper,
};

export default { ...Video, ...videoStyles };
