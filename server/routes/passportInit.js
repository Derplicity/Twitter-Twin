const passport = require('passport');
const mongoose = require('mongoose');
const { Strategy: TwitterStrategy } = require('passport-twitter');

const User = require('../models/user');

const TWITTER_CONFIG = {
	consumerKey: process.env.TWITTER_KEY,
	consumerSecret: process.env.TWITTER_SECRET,
	callbackURL: 'https://localhost:5000/api/auth/twitter/callback',
};

module.exports = () => {
	passport.serializeUser((user, cb) => cb(null, user));
	passport.deserializeUser((obj, cb) => cb(null, obj));

	const callback = (token, tokenSecret, profile, cb) => {
		User.findByIdAndUpdate(profile.id, {
			token: token,
			tokenSecret: tokenSecret,
		})
			.then(user => {
				if (user) {
					return cb(null, user);
				}

				User.create({
					_id: profile.id,
					token: token,
					tokenSecret: tokenSecret,
				})
					.then(user => cb(null, user))
					.catch(err => cb(err));
			})
			.catch(err => cb(err));
	};

	passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
};
