import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Wrapper,
  Container,
  ButtonWrapper,
  Button,
} from '../styled-components';

const AuthButton = ({ onClick, disabled }) => (
  <Wrapper>
    <Container>
      <ButtonWrapper>
        <Button onClick={onClick} disabled={disabled}>
          <FontAwesomeIcon icon={['fab', 'twitter']} />
        </Button>
      </ButtonWrapper>
    </Container>
  </Wrapper>
);

export default AuthButton;
