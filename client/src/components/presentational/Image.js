import React, { Fragment } from 'react';

import { Image } from '../styles';

export default function({ to, src, alt, isCircle, isSmall, custom }) {
	const imageContents = (
		<Fragment>
			<Image.Overlay url={src} />
			<Image src={src} alt={alt} />
		</Fragment>
	);

	return (
		<Image.Wrapper circle={isCircle} small={isSmall}>
			{to ? (
				<Image.InternalLink to={to} tabIndex="-1" style={custom}>
					{imageContents}
				</Image.InternalLink>
			) : (
				imageContents
			)}
		</Image.Wrapper>
	);
}
