const EventEmitter = require('events');
// const emitter = new EventEmitter();
// const log = (msg) => {
//     console.log(msg);
//     emitter.emit('some_events', {id: 1, key: 2});
// }

class Logger extends EventEmitter {
    log = (msg) => {
        console.log(msg);
        this.emit('some_events', {id: 1, key: 2});
    }
}

const userName = 'Tony';

module.exports = {Logger, userName};