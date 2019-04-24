import styled, { keyframes } from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AuthButton = styled.button`
  ${globals};
  ${interactive};

  animation: ${fadeIn} 2s;
  padding-left: 30px;
  border-radius: 9999px;
  width: 215px;
  height: 215px;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);
  transition-timing-function: ease-in;
  transition: 0.3s;
  transform: scale(0.7);
  border: 3px solid #ffffff;
  background: ${props => (props.disabled ? '#999' : '#326ada')};
  cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};

  svg {
    font-size: 10em !important;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);
    transition: 0.3s;
    color: #fff;
  }

  &:hover {
    background: ${props => (props.disabled ? '#999' : '#433e90')};
    box-shadow: ${props =>
      props.disabled
        ? '1px 2px 2px rgba(0, 0, 0, 0.25)'
        : '2px 5px 5px rgba(0, 0, 0, 0.5)'};

    svg {
      text-shadow: ${props =>
        props.disabled
          ? '1px 2px 2px rgba(0, 0, 0, 0.25)'
          : '2px 5px 5px rgba(0, 0, 0, 0.5)'};
      transform: rotate(-1.1deg);
    }
  }
`;

const Wrapper = styled.div`
  ${globals};
  ${flexParent};

  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 20px 10px;
`;

const authButtonStyles = {
  Wrapper,
};

export default { ...AuthButton, ...authButtonStyles };
