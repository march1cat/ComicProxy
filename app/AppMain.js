'use strict'

const ApplicationMain = require("../libs/ec/system/ApplicationMain").ApplicationMain;
const Book = require("./parser/mm18h/Book").Book;
const Group = require("./core/entity/Group").Group;
const DownloadProcessor = require("./processor/DownloadProcessor").DownloadProcessor;
const BookFactory = require("./scan/mm18h/BookFactory").BookFactory;

class AppMain extends ApplicationMain {

    constructor(){
        super();
    }

    async main(args){
        if(this.AppConfig().IsDev) this.log("Run Dev Mode!!");
        if(args && args.length > 0){
            this.log("Download Mode!!");
            const url = args.length > 0 ? args[0] : "https://18h.mm-cg.com/18H_5086.html";
            const book = new Book();
            book.setName("test");
            const g = Group.buildGroup(url);
            book.addGroup(g);

            const downloadProcessor = new DownloadProcessor();
            await downloadProcessor.processDownloadBook(book);
        } else {
            this.log("Scan Mode!!");
            const fac = new BookFactory();
            await fac.reloadRecorded();
            await fac.scan('http://18h.mm-cg.com');
        }
        

        

    }

}


module.exports.AppMain = AppMain;