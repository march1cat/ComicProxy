'use strict'

const AppMain = require("./app/AppMain").AppMain;
const Config = require("./config.json");
const FileTool = require("./libs/ec/common/FileTool").FileTool;


async function main(){
    const main = new AppMain();
    await main.process(Config);




}

main().then( () => {
    console.log("System exit");
});


// const p = "/Volumes/64G/Temp/comic/scan/mm18h.txt";
// const file = new FileTool();
// const ar = await file.readFileInLines(p);
// console.log(ar.length);

