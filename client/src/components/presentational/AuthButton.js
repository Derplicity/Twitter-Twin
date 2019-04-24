import React from 'react';
import PropTypes from 'prop-types';

import { AuthButton, Icon } from '../styles';

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
    <AuthButton.Wrapper data-testid="AuthButtonPresentator">
      <AuthButton
        onClick={onClick}
        disabled={disabled}
        data-testid="authButton"
      >
        <Icon color="white" icon={['fab', 'twitter']} />
      </AuthButton>
    </AuthButton.Wrapper>
  );
}

AuthButtonPresentator.propTypes = propTypes;
AuthButtonPresentator.defaultProps = defaultProps;

export default AuthButtonPresentator;
