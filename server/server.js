require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https');

const passportInit = require('./routes/passportInit');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;
const certOptions = {
	key: fs.readFileSync(path.resolve('certs/server.key')),
	cert: fs.readFileSync(path.resolve('certs/server.crt')),
};
const server = https.createServer(certOptions, app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	}),
);
app.use(passport.initialize());
passportInit();

const io = socketio(server);
app.set('io', io);

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
}

mongoose.connect(process.env.MONGOOSE_CREDENTIALS, { useNewUrlParser: true });

mongoose.connection
	.on('connecting', () => console.log('Connecting to MongoDB'))
	.on('connected', () => console.log('Connected to MongoDB'))
	.on('disconnecting', () => console.log('Disconnecting from MongoDB'))
	.on('disconnected', () => console.log('Disconnected from MongoDB'))
	.on('close', () => console.log('Disconnection from MongoDB errorless'))
	.on('reconnected', () => console.log('Reconnected to MongoDB'))
	.on('error', console.error);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
