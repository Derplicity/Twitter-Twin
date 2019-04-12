import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { globals, flexParent, flexChild, interactive } from './shared';

const UserList = styled.div`
  ${globals};
  ${flexChild};
  ${flexParent};

  width: 100%;
  flex-direction: column;
`;

const Wrapper = styled.div`
  ${globals};
  ${flexChild};
  ${flexParent};

  width: 100%;
  flex-direction: column;
`;

const Button = styled(Link)`
  ${globals};
  ${flexChild};
  ${flexParent};
  ${interactive};

  padding: 15px 10px;
  flex-shrink: 0;
`;

const Interactive = styled.div`
  ${globals};
  ${interactive};
  transition-property: background-color;

  &:hover {
    background-color: ${props =>
      props.transitionto === 'blueGrey__light'
        ? 'rgb(24, 36, 48)'
        : props.transitionto === 'blueGrey__lighter'
        ? 'rgba(29, 161, 242, 0.1)'
        : null};
  }
`;

const userListStyles = {
  Wrapper,
  Button,
  Interactive,
};

export default { ...UserList, ...userListStyles };
