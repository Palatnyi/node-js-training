const fs = require("fs");
const path = require("path");

function isDirSync(file) {
    return fs.statSync(file).isDirectory();
}

function isFileSync(file) {
    return fs.statSync(file).isFile();
}

function deleteFolderSync(filePath) {

    if(!fs.existsSync(filePath)) {
        throw new Error("File doesn't exists");
    }

    if (!isDirSync(filePath)) {
        throw new Error("File isn't directory");
    }

    const files = fs.readdirSync(filePath);
    
    files.forEach((file) => {
        const innerPath = path.join(filePath, file);
        if (isFileSync(innerPath)) {
            fs.unlinkSync(innerPath);
            return;
        }
        deleteFolderSync(innerPath);
    });

    if (!fs.readdirSync(filePath).length) {
        fs.rmdirSync(filePath);
    }
};

module.exports = deleteFolderSync;