const readline = require("readline");
const server = require("http").createServer();
const rd = readline.createInterface({input: process.stdin});

server.on("request", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    rd.on("line", function readDataLine(data) {
        if(data.toString().trim() === ".exit") {
            res.end();
            rd.removeListener("line", readDataLine);
            return;
        }
        res.write(data);
    });
});

server.listen(8080, () => {console.log("server listening on potr 8080");});


