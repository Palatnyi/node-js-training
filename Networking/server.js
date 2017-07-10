const net = require("net");
const clients = new Array(3);
let socketKey = 0;
const sockets = {};

const server = net.createServer((socket) => {
    let id, name;
    socket.on("data", (data) => {
        
        if(!socket.id) {
            id = `socketKey-${socketKey}`;
            socketKey += 1;
            socket.id = id;
            socket.name = data; 
            name = data;
            sockets[id] = socket;
            return;
        };

        for(key in sockets) {
            if(sockets.hasOwnProperty(key) && sockets[key].id !== socket.id) {
                sockets[key].write(`${name}: ${data.toString().trim()}`);
            }
        }

    });

    socket.on("end", () => {
        delete sockets[socket.id];
        console.log("session closed");
    });


});

const port = 8080;
server.listen({port}, () => {
    console.log(`port listening on port ${port}`);
});