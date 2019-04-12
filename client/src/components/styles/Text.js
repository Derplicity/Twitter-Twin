import styled, { css } from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';
import { Link } from 'react-router-dom';

const Text = styled.div`
  ${globals};
  display: inline;
  max-width: 100%;
  pointer-events: inherit;
  text-align: ${props => (props.center ? 'center' : null)};
  font-weight: ${props => (props.bold ? 'bold' : props.bolder ? '800' : null)};
  font-size: ${props =>
    props.small ? '12px' : props.large ? '19px' : props.xlarge ? '23px' : null};
  color: ${props =>
    props.color === 'grey'
      ? 'rgb(136, 153, 166)'
      : props.color === 'blue'
      ? 'rgb(27, 149, 224)'
      : props.color === 'white'
      ? 'rgb(255, 255, 255)'
      : 'inherit'};
  overflow-wrap: break-word;
  white-space: pre-wrap;
  ${props =>
    props.enableCrop &&
    css`
      text-overflow: ellipsis;
      overflow-y: hidden;
      overflow-x: hidden;
      white-space: nowrap;
    `}

  &:hover {
    ${props =>
      props.decor &&
      css`
        text-decoration: underline;
        text-decoration-color: currentColor;
      `}
  }
`;

const InternalLink = styled(Link)`
  ${globals};
  ${flexParent};
  ${flexChild};
  ${interactive};

  display: ${props => props.inline && 'inline'};
`;

const ExternalLink = styled.a`
  ${globals};
  ${flexParent};
  ${flexChild};
  ${interactive};

  display: ${props => props.inline && 'inline'};
`;

const Interactive = styled.div`
  ${globals};
  ${interactive};
  transition-property: color;
  color: inherit;

  &:hover {
    color: ${props =>
      props.transitionto === 'blue' ? 'rgb(27, 149, 224)' : null};
  }
`;

const Group = styled.div`
  ${globals};
  ${flexChild};
  ${flexParent};
  max-width: 100%;
  pointer-events: inherit;
  align-items: center;
  flex-shrink: 0;
`;

const textStyles = {
  InternalLink,
  ExternalLink,
  Interactive,
  Group,
};

export default { ...Text, ...textStyles };
