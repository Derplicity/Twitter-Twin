import styled from 'styled-components';
import { globals, flexParent, flexChild } from './shared';

const Footer = styled.footer`
  ${globals};
  ${flexChild};
  ${flexParent};

  width: 100%;
  flex-wrap: wrap;
  padding: 10px;
  flex-shrink: 0;
`;

const Wrapper = styled.div`
  ${globals};
  ${flexChild};
  ${flexParent};

  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  margin-bottom: 10px;
  flex-shrink: 0;
`;

const footerStyles = {
  Wrapper,
};

export default { ...Footer, ...footerStyles };
