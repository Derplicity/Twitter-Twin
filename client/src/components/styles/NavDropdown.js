import styled from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';
import ImageStyles from './Image';
import Icon from './Icon';

const NavDropdown = styled.div``;

const Wrapper = styled.li`
  border-radius: 25px;
`;

const Group = styled.div`
  display: flex;
  padding-right: 5px;
  border-radius: 25px;
  border: 2px solid rgba(0, 0, 0, 0);

  & ${Icon} {
    color: rgb(136, 153, 166);
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
`;

const Button = styled.div`
  ${interactive};

  display: block;
  outline: none;
  border-radius: 25px;

  &:hover {
    ${Group} {
      outline: none;
      background-color: rgba(29, 161, 242, 0.1);
      cursor: pointer;

      & ${Icon} {
        color: rgb(29, 161, 242);
      }
    }
  }

  &:focus {
    ${Group} {
      outline: none;
      border-color: rgb(29, 161, 242);
    }
  }
`;

const Image = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  max-width: 30px;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 1;
  flex-basis: 0;
  margin: 0 5px 0 0;

  & ${ImageStyles.Wrapper} {
    width: 30px;
    height: 30px;
  }
`;

const Content = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 1;
  flex-basis: 0;
  margin: 0 5px;
`;

const navDropdownStyles = {
  Wrapper,
  Group,
  Button,
  Image,
  Content,
};

export default { ...NavDropdown, ...navDropdownStyles };
