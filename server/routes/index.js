const express = require('express');

const authRouter = require('./auth');
const usersRouter = require('./users');
const trendsRouter = require('./trends');
const statusesRouter = require('./statuses');

const routes = express.Router();

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/trends', trendsRouter);
routes.use('/statuses', statusesRouter);

module.exports = routes;
