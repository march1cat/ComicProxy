'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;
const WebImageSaveProcessor = require("./WebImageSaveProcessor").WebImageSaveProcessor;
const PackageZipProcessor = require("./PackageZipProcessor").PackageZipProcessor;
const HistroryRecordProcessor = require("./HistroryRecordProcessor").HistroryRecordProcessor;

class DownloadProcessor extends Basis {

    webImageSaveProcessor = null;
    packageZipProcessor = null;
    histroryRecordProcessor = null;

    constructor(){
        super();
        this.webImageSaveProcessor = new WebImageSaveProcessor();
        this.packageZipProcessor = new PackageZipProcessor();
        this.histroryRecordProcessor = new HistroryRecordProcessor();
    }

    async processDownloadBook(webBook){
        let isParsingSuccess = true;
        webBook.embedWebLoaders();
        this.log("Start Process donwload book  , " , webBook.getName());
        while(webBook.hasNext()) {
            const webLoader = webBook.next();
            if( webLoader ) {
                webLoader.setHistoryRecordProc(this.histroryRecordProcessor);
                try {
                    isParsingSuccess = await webLoader.process();
                } catch(err){
                    this.log("Fail Error = " , err);
                    isParsingSuccess = false;
                }
                if(!isParsingSuccess) {
                    this.log("Parsing Fail , Book name = " , webBook.getName());
                    this.log("Parsing Fail ,  Loader = " , webLoader);
                    break;
                }
            }
        }

        if(isParsingSuccess) {
            this.log("Prepare save book , Book = "  , webBook.getName());
            await this.webImageSaveProcessor.save(webBook);
            if(!this.AppConfig().IsDev) await this.packageZipProcessor.pack(webBook);
            if(!this.AppConfig().IsDev) await this.histroryRecordProcessor.recordDownload(webBook);
        } else {
            this.log("Parsing fail , skip save process , book = " , webBook.getName());
        }

    }
}

module.exports.DownloadProcessor = DownloadProcessor;