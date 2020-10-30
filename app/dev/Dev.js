'use strict'
const StringTool = require("../../libs/ec/common/StringTool").StringTool;
const WebClient = require("../../libs/ec/net/WebClient").WebClient;
const DownloadProcessor = require("../core/processor/DownloadProcessor").DownloadProcessor;
class Dev {
    strTool = new StringTool();

    async test(){
       let p2 = new Promise(
           resolve => {
               resolve(2);
           }
       );
       let p1 = new Promise(
           resolve => {
               resolve(1);
           }
       )


       let aa = function(){
           console.log("aa");
           return "1"
       }

       
       console.log(pipe);

       
    }

}

module.exports.Dev = Dev;