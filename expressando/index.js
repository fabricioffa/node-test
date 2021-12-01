const debug = require('debug')('app:startup')
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('config')

const {logger} = require('./middlewares/logger');
const {authenticator} = require('./middlewares/authenticator');
const { courseRouter } = require('./routes/courses');
const { homeRouter } = require('./routes/home');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use(authenticator);
app.use('/api/courses', courseRouter);
app.use('/', homeRouter);

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}

// Configuration
console.log(`Aplication name: ${config.get('name')}`);
console.log(`Aplication email server: ${config.get('email.host')}`);

app.listen(port, () => console.log(`Listening on port ${port}`));
