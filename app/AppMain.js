'use strict'

const ApplicationMain = require("../libs/ec/system/ApplicationMain").ApplicationMain;
const DownloadProcessor = require("./core/processor/DownloadProcessor").DownloadProcessor;
const IndexScanner = require("./scan/mm18h/IndexScanner").IndexScanner;
const ParserController = require("./parser/ParserController").ParserController;

class AppMain extends ApplicationMain {

    constructor(){
        super();
    }

    async main(args){
        if(this.AppConfig().IsDev) this.log("Run Dev Mode!!");

        if(this.AppConfig().IsDev && args && args[0] == 'dev'){
            await new (require("./dev/Dev").Dev)().test();
            return;
        }  

        if(args && args.length > 0){
            this.log("Download Mode!!");
            //const url = args.length > 0 ? args[0] : "https://18h.mm-cg.com/18H_5086.html";
            const url = args.length > 0 ? args[0] : "https://comicbus.com/html/6997.html";

            const parserControl = new ParserController();
            const webBook = parserControl.generateWebBook(url);

            if(webBook){
                const downloadProcessor = new DownloadProcessor();
                await downloadProcessor.processDownloadBook(webBook);
            }
        } else {
            this.log("Scan Mode!!");
            const scanner = new IndexScanner();
            await scanner.reloadRecorded();
            await scanner.scan('http://18h.mm-cg.com');
        }


        
    }

}


module.exports.AppMain = AppMain;