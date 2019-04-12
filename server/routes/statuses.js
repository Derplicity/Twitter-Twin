const express = require('express');

const twitController = require('./twitController');
const { numFormatter } = require('./helpers');

const statusesRouter = express.Router();

statusesRouter.get('/home_timeline', twitController, (req, res) => {
  const T = res.locals.Twit;

  const options = { count: 200, exclude_replies: true, tweet_mode: 'extended' };

  if (req.query.max_id) {
    options.max_id = req.query.max_id;
  }

  T.get('statuses/home_timeline', options)
    .then(result => {
      let data = result.data;

      if (req.query.max_id) data.shift();

      return res.json(data);
    })
    .catch(console.error);
});

statusesRouter.get('/user_timeline', twitController, (req, res) => {
  const T = res.locals.Twit;

  const options = {
    screen_name: req.query.screen_name,
    count: 200,
    include_rts: 1,
    tweet_mode: 'extended',
  };

  if (req.query.max_id) {
    options.max_id = req.query.max_id;
  }

  T.get('statuses/user_timeline', options)
    .then(result => {
      let data = result.data;

      if (req.query.max_id) data.shift();

      return res.json(data);
    })
    .catch(console.error);
});

statusesRouter.get('/retweet', twitController, (req, res) => {
  const T = res.locals.Twit;

  const tweetId = req.query.id;

  T.post('statuses/retweet/:id', { id: tweetId, tweet_mode: 'extended' }).then(
    result => res.json(result.data),
  );
});

statusesRouter.get('/like', twitController, (req, res) => {
  const T = res.locals.Twit;

  const tweetId = req.query.id;

  T.post('favorites/create', { id: tweetId, tweet_mode: 'extended' }).then(
    result => res.json(result.data),
  );
});

statusesRouter.get('/unretweet', twitController, (req, res) => {
  const T = res.locals.Twit;

  const tweetId = req.query.id;

  T.post('statuses/unretweet/:id', {
    id: tweetId,
    tweet_mode: 'extended',
  }).then(result => res.json(result.data));
});

statusesRouter.get('/unlike', twitController, (req, res) => {
  const T = res.locals.Twit;

  const tweetId = req.query.id;

  T.post('favorites/destroy', { id: tweetId, tweet_mode: 'extended' }).then(
    result => res.json(result.data),
  );
});

module.exports = statusesRouter;
