import styled from 'styled-components';
import { globals, flexParent, flexChild, interactive } from './shared';

const Switch = styled.div`
  ${globals};
  ${flexParent};
  ${flexChild};
  ${interactive};

  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  align-items: center;
  margin: 0 10px;
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 35px;
  height: 12px;
  margin: 0;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.2s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 0;
    top: -3px;
    background-color: white;
    transition: 0.2s;
    border-radius: 50%;
  }

  ${Input}:checked + & {
    background-color: rgb(113, 201, 248);
  }

  ${Input}:focus + &:before {
    box-shadow: 0 0 10px rgb(28, 41, 56);
  }

  ${Input}:checked + &:before {
    background-color: rgb(29, 161, 242);
    transform: translateX(17px);
  }
`;

const switchStyles = {
  Label,
  Input,
  Slider,
};

export default { ...Switch, ...switchStyles };
