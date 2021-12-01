const Logger = require('./logger')

const logger = new Logger();

logger.on('even', ({message}) => console.log('Listener called. ', message))

logger.log('Solta o sinal!');




