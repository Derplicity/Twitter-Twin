import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadingWrapper } from '../styled-components';

const Loading = () => (
  <LoadingWrapper>
    <FontAwesomeIcon icon={['fas', 'spinner']} />
  </LoadingWrapper>
);

export default Loading;
