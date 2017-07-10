const fs = require("fs");
const path = require("path");

function isDirSync(file) {
    return fs.statSync(file).isDirectory();;
}

function isFileSync(file) {
    return fs.statSync(file).isFile();
}

module.exports = function deleteRecursively(filePath) {

    if(!fs.existsSync(filePath)) {
        return;
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
        deleteRecursively(innerPath);
    });

    if (!fs.readdirSync(filePath).length) {
        fs.rmdirSync(filePath);
    }
};