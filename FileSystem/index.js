const fs =  require("fs");
const path = require("path"); 
const filesPath = path.join(__dirname, "watchMe");
const deleteFolder = require("./deleteFolder");

deleteFolder(filesPath);

//create data
// fs.mkdirSync(filesPath);
// const dayInMilisec = 24*60*60*1000;
// for(var i = 0; i < 10; i += 1) {
//     const filePath = path.join(filesPath, `file${i}`)
//     const time = (Date.now() - dayInMilisec)/1000;
//     fs.writeFile(filePath, " ", () => {
//         fs.utimes(filePath, time, time);
//     });
// }


