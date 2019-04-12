const express = require('express');

const twitController = require('./twitController');
const { numFormatter } = require('./helpers');

const usersRouter = express.Router();

usersRouter.get('/show', twitController, (req, res) => {
  const T = res.locals.Twit;

  T.get('users/show', { user_id: req.query.user_id })
    .then(result => {
      const data = result.data;
      data.followers_count_formatted = numFormatter(data.followers_count);
      data.friends_count_formatted = numFormatter(data.friends_count);

      return res.json(data);
    })
    .catch(console.error);
});

usersRouter.get('/search', twitController, (req, res) => {
  const T = res.locals.Twit;

  T.get('users/search', {
    q: encodeURIComponent(req.query.q),
    count: req.query.count,
  })
    .then(result => res.json(result.data))
    .catch(console.error);
});

usersRouter.get('/suggestions', twitController, (req, res) => {
  const T = res.locals.Twit;

  T.get('users/suggestions')
    .then(suggest => {
      const len = suggest.data.length;
      const rand = Math.floor(Math.random() * Math.floor(len));
      const slug = suggest.data[rand].slug;
      T.get(`users/suggestions/${slug}`)
        .then(result => res.json(result.data.users))
        .catch(console.error);
    })
    .catch(console.error);
});

module.exports = usersRouter;
