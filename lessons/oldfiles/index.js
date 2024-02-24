const EventEmitter = require('events');
const emitter = new EventEmitter();

const {Logger, userName} = require('./server/log');
const logger = new Logger();

logger
.on('some_events', (arg) => {
    const {id, key} = arg;
    console.log(id, key);
})
.log('Test ' + userName);

// emitter.emit('some_events', {id: 1, key: 2});
// console.log('test');

//log('test');