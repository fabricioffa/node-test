const EventEmitter = require("events");
const emitter = new EventEmitter();

class Logger extends EventEmitter {
    log (message) {
      console.log(message);
      this.emit("even", { message: "It works!" });
    };
}

module.exports = Logger;
