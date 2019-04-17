import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadingWrapper } from '../styled-components';

export function LoadingPresentator() {
  return (
    <LoadingWrapper data-testid="LoadingPresentator">
      <FontAwesomeIcon icon={['fas', 'spinner']} data-testid="loadingIcon" />
    </LoadingWrapper>
  );
}

export default LoadingPresentator;
