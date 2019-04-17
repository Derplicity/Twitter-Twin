import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Image } from '../styles';

const propTypes = {
  to: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  isCircle: PropTypes.bool,
  isSmall: PropTypes.bool,
  custom: PropTypes.objectOf(PropTypes.string.isRequired),
};

const defaultProps = {
  to: null,
  src: null,
  alt: '',
  isCircle: false,
  isSmall: false,
  custom: null,
};

export function ImagePresentator(props) {
  const { to, src, alt, isCircle, isSmall, custom } = props;

  if (!src) return null;

  const imageContents = (
    <Fragment>
      <Image.Overlay url={src} data-testid="imageOverlay" />
      <Image src={src} alt={alt} data-testid="image" />
    </Fragment>
  );

  return (
    <Image.Wrapper
      circle={isCircle}
      small={isSmall}
      data-testid="ImagePresentator"
    >
      {to ? (
        <Image.InternalLink
          to={to}
          tabIndex="-1"
          style={custom}
          data-testid="imageLink"
        >
          {imageContents}
        </Image.InternalLink>
      ) : (
        imageContents
      )}
    </Image.Wrapper>
  );
}

ImagePresentator.propTypes = propTypes;
ImagePresentator.defaultProps = defaultProps;

export default ImagePresentator;
