const express = require('express');

const twitController = require('./twitController');
const { numFormatter } = require('./helpers');

const trendsRouter = express.Router();

trendsRouter.get('/place', twitController, (req, res) => {
	const T = res.locals.Twit;

	T.get('trends/place', { id: req.query.id })
		.then(result => {
			const trends = [];
			const userQuery = req.query.q;
			const withHT = userQuery.startsWith('#') ? true : false;
			result.data[0].trends.map(trend => {
				const name = withHT ? trend.name : trend.name.replace('#', '');
				if (name.toUpperCase().startsWith(userQuery.toUpperCase())) {
					if (trend.tweet_volume) {
						trend.tweet_volume = numFormatter(trend.tweet_volume);
					}
					trends.push(trend);
				}
			});

			res.json(trends.slice(0, 3));
		})
		.catch(console.error);
});

module.exports = trendsRouter;
