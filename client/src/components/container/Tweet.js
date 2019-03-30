import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
	addStatusAction,
	removeStatusAction,
} from '../../actions/statusActions';

import getTimeSince from '../util/getTimeSince';
import formatTweet from '../util/formatTweet';

import Tweet from '../presentational/Tweet';

const propTypes = {
	data: PropTypes.shape({
		id_str: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired,
		entities: PropTypes.object.isRequired,
		extended_entities: PropTypes.object,
		user: PropTypes.shape({
			name: PropTypes.string.isRequired,
			screen_name: PropTypes.string.isRequired,
			profile_image_url_https: PropTypes.string.isRequired,
			verified: PropTypes.bool.isRequired,
		}),
		retweeted_status: PropTypes.shape({
			created_at: PropTypes.string,
			user: PropTypes.shape({
				name: PropTypes.string,
				screen_name: PropTypes.string,
				profile_image_url_https: PropTypes.string,
				verified: PropTypes.bool,
			}),
		}),
	}),
	calcItemHeight: PropTypes.func.isRequired,
};

const defaultProps = {
	data: {
		id_str: '',
		created_at: '',
		entities: {},
		user: {
			name: '',
			screen_name: '',
			profile_image_url_https: '',
			verified: false,
		},
	},
	calcItemHeight: () => null,
};

class TweetContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			likeCount: 0,
			isLiked: false,
			retweetCount: 0,
			isRetweeted: false,
		};

		this.handleTweetClick = this.handleTweetClick.bind(this);
		this.handleAction = this.handleAction.bind(this);
	}

	componentDidMount() {
		const { data } = this.props;
		if (this.node) {
			this.props.calcItemHeight(this.node, data.index);
		}

		const {
			favorite_count: likeCount,
			favorited: isLiked,
			retweet_count: retweetCount,
			retweeted: isRetweeted,
		} = data;

		this.setState({
			likeCount,
			isLiked,
			retweetCount,
			isRetweeted,
		});
	}

	handleTweetClick(e) {
		const { data } = this.props;
		if (e.target === e.currentTarget) {
			return this.props.history.push(
				`/${data.user.screen_name}/status/${data.id_str}`,
			);
		}
	}

	handleAction(type) {
		const { likeCount, isLiked, retweetCount, isRetweeted } = this.state;
		const { data } = this.props;
		const { id_str: id } = data;
		if (type === 'comment') {
			console.log('go to comments');
		} else if (type === 'retweet') {
			let isRtw = isRetweeted;
			let rtwCount = retweetCount;
			if (!isRetweeted) {
				this.props.addStatusAction('retweet', id);
				isRtw = true;
				rtwCount++;
			} else {
				this.props.removeStatusAction('unretweet', id);
				isRtw = false;
				rtwCount--;
			}

			this.setState((state, props) => ({
				isRetweeted: isRtw,
				retweetCount: rtwCount,
			}));
		} else if (type === 'heart') {
			let isLkd = isLiked;
			let lkCount = likeCount;
			if (!isLiked) {
				this.props.addStatusAction('like', id);
				isLkd = true;
				lkCount++;
			} else {
				this.props.removeStatusAction('unlike', id);
				isLkd = false;
				lkCount--;
			}

			this.setState((state, props) => ({
				isLiked: isLkd,
				likeCount: lkCount,
			}));
		} else if (type === 'upload') {
			console.log('share the tweet');
		}
	}

	render() {
		const { likeCount, isLiked, retweetCount, isRetweeted } = this.state;
		const { data } = this.props;

		const author = data.user;
		const username = author.screen_name;
		const isRetweet = !!data.retweeted_status;
		const retweetData = data.retweeted_status;
		const oAuthor = isRetweet ? retweetData.user : data.user;
		const oUsername = oAuthor.screen_name;
		const timeCreated = isRetweet ? retweetData.created_at : data.created_at;

		const time = getTimeSince(timeCreated);

		const formattedText = formatTweet(data);

		const slimData = {
			likeCount,
			isLiked,
			retweetCount,
			isRetweeted,
			entities: isRetweet ? retweetData.entities : data.entities,
			extended_entities: isRetweet
				? !!retweetData.extended_entities
					? retweetData.extended_entities
					: false
				: !!data.extended_entities
				? data.extended_entities
				: false,
			name: author.name,
			username,
			authorUrl: `/${username}`,
			tweetUrl: `/${username}/status/${data.id_str}`,
			isRetweet,
			oAuthor,
			oImgSrc: oAuthor.profile_image_url_https,
			oName: oAuthor.name,
			oUsername,
			oIsVerified: oAuthor.verified,
			oAuthorUrl: `/${oUsername}`,
			timeCreated,
			time,
			formattedText,
		};

		return (
			<div ref={node => (this.node = node)}>
				<Tweet props={slimData} />
			</div>
		);
	}
}

TweetContainer.propTypes = propTypes;
TweetContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{ addStatusAction, removeStatusAction },
)(withRouter(TweetContainer));
