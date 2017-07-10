const Emitter = require("events");

class Server extends Emitter {
    constructor(client) {
        super();
        this.client = client;
        this.handleCommands();
    };

    handleCommands() {
        
        process.nextTick(() => {
            this.emit("response", "type command to see the magic(help, add, delete, ls)");
        });

        this.on("command", function (command) {
            this.emit("response", typeof this[command] === "function" ? this[command]() : "No Comamnd Found");
        });
    }

    help() {
        return "help"
    }

    add() {
        return "add"
    }

    ls() {
        return "ls";
    }

    delete() {
        return "delete";
    }
}

module.exports = function (Client) {
    return new Server(Client);
};




