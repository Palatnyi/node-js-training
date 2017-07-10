const readline = require("readline");
const Emitter = require("events");
const Server = require("./server")();

class Client extends Emitter{
    constructor(server) {
        super();
        this.server = server;
        this.handleResponse();
    }
    sendCommand(data) {
        this.server.emit("command", data);
    }
    handleResponse() {
        this.server.on("response", function(response) {
            console.log(`--- ${response} ---`);
        });
    }
}

const client = new Client(Server);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on("line", function(data) {
    client.sendCommand(data);
});
