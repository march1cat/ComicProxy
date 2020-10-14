'use strict'

const ApplicationMain = require("../libs/ec/system/ApplicationMain").ApplicationMain;
const Book = require("./parser/mm18h/Book").Book;
const Group = require("./core/entity/Group").Group;
const DownloadProcessor = require("./core/processor/DownloadProcessor").DownloadProcessor;
const IndexScanner = require("./scan/mm18h/IndexScanner").IndexScanner;

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
            const scanner = new IndexScanner();
            await scanner.reloadRecorded();
            await scanner.scan('http://18h.mm-cg.com');
        }
        

        

    }

}


module.exports.AppMain = AppMain;