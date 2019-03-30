const express = require('express');
const passport = require('passport');

const authRouter = express.Router();
const twitterAuth = passport.authenticate('twitter');

const addSocketIdtoSession = (req, res, next) => {
	req.session.socketId = req.query.socketId;
	next();
};

authRouter.get('/twitter', addSocketIdtoSession, twitterAuth);

authRouter.get('/twitter/callback', twitterAuth, (req, res) => {
	const io = req.app.get('io');
	const userAuth = {
		_id: req.user._id,
		success: req.user.token ? true : false,
	};
	return io.in(req.session.socketId).emit('twitter', userAuth);
});

module.exports = authRouter;
