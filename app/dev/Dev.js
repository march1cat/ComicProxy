'use strict'
const StringTool = require("../../libs/ec/common/StringTool").StringTool;
const WebClient = require("../../libs/ec/net/WebClient").WebClient;

class Dev {
    strTool = new StringTool();

    async test(){
       const client = new WebClient();
       try {
           let client = new WebClient();
           await client.download("http://10.55.64.89/t.jpg" , "test.jpg" , true);
       } catch(err){
        console.log("err = " , err);
        console.log("is time out" , err.code == 'ETIMEDOUT');
       }
       
    }

}

module.exports.Dev = Dev;