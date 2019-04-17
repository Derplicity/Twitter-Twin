import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Wrapper,
  Container,
  ButtonWrapper,
  Button,
} from '../styled-components';

const propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

const defaultProps = {
  onClick: () => null,
  disabled: false,
};

export function AuthButtonPresentator(props) {
  const { onClick, disabled } = props;

  return (
    <Wrapper data-testid="AuthButtonPresentator">
      <Container>
        <ButtonWrapper>
          <Button
            onClick={onClick}
            disabled={disabled}
            data-testid="authButton"
          >
            <FontAwesomeIcon icon={['fab', 'twitter']} />
          </Button>
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
}

AuthButtonPresentator.propTypes = propTypes;
AuthButtonPresentator.defaultProps = defaultProps;

export default AuthButtonPresentator;
