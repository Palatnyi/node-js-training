
const net = require("net");
const readline = require("readline");
const port = 8080;

const client = net.createConnection({ port }, () => {
    console.log("Please, introduce yourself: ");
    
    client.on("data", (data) => {
        console.log(data.toString().trim());
    });

    client.on("sendData", (data) => {
        client.write(data);
    })
});

const rl = readline.createInterface({
    input: process.stdin
});

rl.on("line", (data) => {
    client.emit("sendData", data);
});
