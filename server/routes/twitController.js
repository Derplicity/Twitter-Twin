const mongoose = require('mongoose');
const Twit = require('twit');

const User = require('../models/user');

const twitController = (req, res, next) => {
  User.findById(req.query.user_id)
    .then(user => {
      const T = new Twit({
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET,
        access_token: user.token,
        access_token_secret: user.tokenSecret,
      });
      res.locals.Twit = T;
      next();
    })
    .catch(console.error);
};

module.exports = twitController;
