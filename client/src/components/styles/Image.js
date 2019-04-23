import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { globals, interactive } from './shared';

const Image = styled.img`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Wrapper = styled.div`
  ${globals};
  width: 100%;
  height: ${props => (props.small ? '49px' : '100%')};
  overflow-y: hidden;
  overflow-x: hidden;
  border-radius: ${props => (props.circle ? '9999px' : '14px')};
`;

const Overlay = styled.div`
  ${globals};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${props => (props.url ? `url('${props.url}')` : 'none')};
  background-size: cover;
  background-color: rgba(0, 0, 0, 0);
`;

const InternalLink = styled(Link)`
  ${globals};
  ${interactive};
  width: 100%;
  height: 100%;
`;

const imageStyles = {
  Wrapper,
  Overlay,
  InternalLink,
};

export default { ...Image, ...imageStyles };
