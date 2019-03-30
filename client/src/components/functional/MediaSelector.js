import React from 'react';

import TweetVideo from '../presentational/TweetVideo';
import Image from '../presentational/Image';

import { Video, LinkCard, Media } from '../styles';

export default function({ entities, extended_entities }) {
	const media = entities.media;
	const urls = entities.urls;

	const extended_media = extended_entities ? extended_entities.media : null;

	if (
		extended_media &&
		extended_media.length !== 0 &&
		extended_media[0].type !== 'photo'
	) {
		const media_url = extended_media[0].media_url_https;
		const media_type = extended_media[0].type;
		const video_info = extended_media[0].video_info;
		const variants = video_info.variants;

		variants.sort((a, b) => {
			const aBit = a.bitrate ? a.bitrate : 0;
			const bBit = b.bitrate ? b.bitrate : 0;

			return bBit - aBit;
		});

		const variant = variants[0];
		const content_type = variant.content_type;
		const content_url = variant.url;

		const sizes = extended_media[0].sizes.large;
		const w = sizes.w;
		const h = sizes.h;
		let ratio = (100 / w) * h;

		if (ratio > 100) ratio = 100;

		return (
			<Media.Wrapper>
				<Video.Wrapper style={{ paddingBottom: `${ratio}%` }}>
					<TweetVideo
						media_url={media_url}
						media_type={media_type}
						content_url={content_url}
						content_type={content_type}
					/>
				</Video.Wrapper>
			</Media.Wrapper>
		);
	} else if (media && media.length !== 0) {
		const media_url = media[0].media_url_https;
		const media_type = media[0].type;

		const sizes = media[0].sizes.large;
		const w = sizes.w;
		const h = sizes.h;
		let ratio = (100 / w) * h;

		if (ratio > 100) ratio = 100;

		return (
			<Media.Wrapper>
				<Image
					to={'/home'}
					src={media_url}
					alt={media_type}
					custom={{ paddingBottom: `${ratio}%` }}
				/>
			</Media.Wrapper>
		);
	} else if (urls && urls.length !== 0) {
		const url = urls[urls.length - 1].url;

		return (
			<Media.Wrapper>
				<LinkCard
					autoPlay={false}
					image={['screenshot', 'image', 'logo']}
					muted={false}
					size="normal"
					url={url}
					video
				/>
			</Media.Wrapper>
		);
	}

	return null;
}
