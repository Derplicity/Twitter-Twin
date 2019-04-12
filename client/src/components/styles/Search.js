import styled from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';
import Icon from './Icon';

const { Wrapper: IconWrapper } = Icon;

const Search = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};

  width: 100%;
  height: 100%;

  & ${IconWrapper} {
    position: absolute;
    top: 21px;
    left: 11px;
  }
`;

const Wrapper = styled.form`
  ${globals};
  ${flexParent};
  ${flexChild};

  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  ${globals};
  ${flexChild};

  position: absolute;
  top: 13px;
  left: 0;
  width: 100%;
  pointer-events: auto;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 5px 35px;
  background-color: rgb(16, 23, 30);
  color: rgb(255, 255, 255);
  font-weight: 500;

  &::placeholder {
    color: rgb(136, 153, 166);
  }

  &:focus {
    outline: none;
    border-color: rgb(29, 161, 242);

    & + ${IconWrapper} svg {
      color: rgb(29, 161, 242);
    }
  }
`;

const Clear = styled.div`
  ${globals};
  ${flexParent};
  ${interactive};

  position: absolute;
  top: 14px;
  right: 1px;
  width: 29px;
  height: 29px;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  transition-property: background-color;

  &:hover {
    background-color: rgba(29, 161, 242, 0.1);
  }

  svg {
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    color: rgb(29, 161, 242);
  }
`;

const searchStyles = {
  Wrapper,
  Input,
  Clear,
};

export default { ...Search, ...searchStyles };
