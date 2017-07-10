const fs = require("fs");
const path = require("path");
const Emitter = require("events");
const dirPath = path.join(__dirname, "watchMe");
const deleteFolder = require("./deleteFolder");

class MyEmitter extends Emitter { };
const myEmitter = new MyEmitter();

//create data
function createData(dirPath) {

    fs.stat(dirPath, (err, stat) => {
        if (err) {
            if (err.code === "ENOENT") {
                myEmitter.emit("createData");
            } else {
                throw err;
            };
            return;
        };

        stat.isDirectory() ? deleteFolder(dirPath) : fs.unlinkSync(dirPath);
        myEmitter.emit("createData");
    });

    myEmitter.on("createData", () => {
        fs.mkdirSync(dirPath);
        for (var i = 0; i < 5; i += 1) {
            const filePath = path.join(dirPath, `file-${i}`)
            fs.writeFileSync(filePath, " ");
        }
        myEmitter.emit("watchDir", dirPath);
    });
}

function watchDir(dirPath) {
    const filePath = path.join(__dirname, "logs.txt");

    fs.watch(dirPath, (eventType, filename) => {
        const log = `Date: ${Date.now()}, event: ${eventType}, file: ${filename} \r\n`;
        fs.appendFile(filePath, log, (err) => {
            if(err) throw err;
            myEmitter.emit("unwatchLogFile");
        });
    });

    myEmitter.once("unwatchLogFile", () => {
        fs.unwatchFile(filePath);
    });
}



createData(dirPath);
myEmitter.on("watchDir", watchDir);