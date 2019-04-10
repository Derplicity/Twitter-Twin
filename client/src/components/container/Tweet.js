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

import TweetPresentator from '../presentational/Tweet';

const propTypes = {
	data: PropTypes.shape({
		id_str: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired,
		entities: PropTypes.object.isRequired,
		favorite_count: PropTypes.number.isRequired,
		favorited: PropTypes.bool.isRequired,
		retweet_count: PropTypes.number.isRequired,
		retweeted: PropTypes.bool.isRequired,
		extended_entities: PropTypes.object,
		user: PropTypes.shape({
			name: PropTypes.string.isRequired,
			screen_name: PropTypes.string.isRequired,
			verified: PropTypes.bool.isRequired,
			profile_image_url_https: PropTypes.string.isRequired,
		}).isRequired,
		retweeted_status: PropTypes.shape({
			created_at: PropTypes.string.isRequired,
			entities: PropTypes.object.isRequired,
			extended_entities: PropTypes.object,
			user: PropTypes.shape({
				name: PropTypes.string.isRequired,
				screen_name: PropTypes.string.isRequired,
				verified: PropTypes.bool.isRequired,
				profile_image_url_https: PropTypes.string.isRequired,
			}).isRequired,
		}),
	}),
	calcItemHeight: PropTypes.func,
	addStatusAction: PropTypes.func,
	removeStatusAction: PropTypes.func,
};

const defaultProps = {
	data: null,
	calcItemHeight: () => null,
	addStatusAction: () => null,
	removeStatusAction: () => null,
};

export class TweetContainer extends Component {
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

		if (!data) return;

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

		if (!data) return null;

		const retweetData = data.retweeted_status;
		const isRetweet = !!retweetData;

		let oUser = data.user;
		let entities = data.entities;
		let extended_entities = data.extended_entities;
		let timeCreated = data.created_at;

		if (isRetweet) {
			oUser = retweetData.user;
			entities = retweetData.entities;
			extended_entities = retweetData.extended_entities;
			timeCreated = retweetData.created_at;
		}

		const id_str = data.id_str;
		const user = data.user;
		const name = user.name;
		const username = user.screen_name;
		const oImgSrc = oUser.profile_image_url_https;
		const oName = oUser.name;
		const oUsername = oUser.screen_name;
		const oIsVerified = oUser.verified;

		const time = getTimeSince(timeCreated);
		const formattedText = formatTweet(data);

		const handleTweetClick = this.handleTweetClick;
		const handleAction = this.handleAction;

		const slimData = {
			likeCount,
			isLiked,
			retweetCount,
			isRetweeted,
			entities,
			extended_entities,
			name,
			username,
			id_str,
			isRetweet,
			oImgSrc,
			oName,
			oUsername,
			oIsVerified,
			timeCreated,
			time,
			formattedText,
			handleTweetClick,
			handleAction,
		};

		return (
			<div ref={node => (this.node = node)} data-testid="TweetContainer">
				<TweetPresentator data={slimData} data-testid="TweetPresentator" />
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
