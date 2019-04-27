import styled from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled(FontAwesomeIcon)`
  ${globals};
  ${flexChild};
  max-width: 100%;
  color: ${props =>
    props.color === 'grey'
      ? 'rgb(136, 153, 166)'
      : props.color === 'white'
      ? 'rgb(255, 255, 255)'
      : props.color === 'red'
      ? 'rgb(224, 36, 94)'
      : props.color === 'green'
      ? 'rgb(23, 191, 99)'
      : props.color === 'blue'
      ? 'rgb(29, 161, 242)'
      : 'inherit'};
  user-select: none;
`;

const Container = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};
`;

const Wrapper = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  justify-content: center;
  align-items: center;
  height: ${props => (props.small ? '15px' : props.large ? '25px' : '20px')};
  width: ${props => (props.small ? '15px' : props.large ? '25px' : '20px')};
  color: inherit;

  & svg {
    font-size: ${props =>
      props.small ? '13px' : props.large ? '20px' : 'inherit'};
  }
`;

const Bubble = styled.div`
  ${globals};
  ${flexParent};
  ${interactive};
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: ${props => (props.small ? '-6px' : '-8px')};
  border-radius: 9999px;
  transition-property: background-color;

  &:hover {
    background-color: ${props =>
      props.transitionto === 'blueGrey__light'
        ? 'rgb(24, 36, 48)'
        : props.transitionto === 'blueGrey__lighter'
        ? 'rgba(29, 161, 242, 0.1)'
        : props.transitionto === 'red_lighter'
        ? 'rgba(224, 36, 94, 0.1)'
        : props.transitionto === 'green_lighter'
        ? 'rgba(23, 191, 99, 0.1)'
        : null};
  }
`;

const Interactive = styled.div`
  & ${Icon} {
    ${interactive};
    transition-property: color;
  }

  &:hover ${Icon} {
    color: ${props =>
      props.transitionto === 'blue'
        ? 'rgb(27, 149, 224)'
        : props.transitionto === 'red'
        ? 'rgb(224, 36, 94)'
        : props.transitionto === 'green'
        ? 'rgb(23, 191, 99)'
        : null};
  }
`;

const iconStyles = {
  Container,
  Wrapper,
  Bubble,
  Interactive,
};

export default { ...Icon, ...iconStyles };
