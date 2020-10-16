'use strict'
const StringTool = require("../../libs/ec/common/StringTool").StringTool;
const WebClient = require("../../libs/ec/net/WebClient").WebClient;

class Dev {
    strTool = new StringTool();

    async test(){
       const client = new WebClient();
       try {
        await client.download("https://img8.8comic.com/3/10574/64/057_373.jpg" , "test.jpg" , true);
       } catch(err){
        console.log("err = " , err);
       }
       
    }

}

module.exports.Dev = Dev;