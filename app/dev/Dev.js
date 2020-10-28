'use strict'
const StringTool = require("../../libs/ec/common/StringTool").StringTool;
const WebClient = require("../../libs/ec/net/WebClient").WebClient;
const DownloadProcessor = require("../core/processor/DownloadProcessor").DownloadProcessor;
class Dev {
    strTool = new StringTool();

    async test(){
       const client = new WebClient();
       try {
           const WebBook = require("../parser/comicbus/Book").Book;
           const Group = require("../core/entity/Group").Group;
           let g = Group.buildGroup("https://comicbus.live/online/a-11313.html?ch=66");
           g.setSerNo(66);
           let book = WebBook.build("https://www.comicbus.com/html/11313.html");
           book.addGroup(g);
           const downloadProcessor = new DownloadProcessor();
           await downloadProcessor.processDownloadBook(book);
       } catch(err){
        console.log("err = " , err);
        console.log("is time out" , err.code == 'ETIMEDOUT');
       }
       
    }

}

module.exports.Dev = Dev;