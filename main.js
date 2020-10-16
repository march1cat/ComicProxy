'use strict'

const AppMain = require("./app/AppMain").AppMain;
const Config = require("./config.json");


async function main(){
    const main = new AppMain();
    await main.process(Config);
}

main().then( () => {
    console.log("System exit");
});


