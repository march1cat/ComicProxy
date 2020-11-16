'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;
const WebImageSaveProcessor = require("./WebImageSaveProcessor").WebImageSaveProcessor;
const PackageZipProcessor = require("./PackageZipProcessor").PackageZipProcessor;
const HistroryRecordProcessor = require("./HistroryRecordProcessor").HistroryRecordProcessor;
const WebIndexProcessor = require("./WebIndexProcessor").WebIndexProcessor;
const BookMetaProcessor = require("./BookMetaProcessor").BookMetaProcessor;
const WorkSpace = require("../env/WorkSpace").WorkSpace;
class DownloadProcessor extends Basis {

    webImageSaveProcessor = null;
    packageZipProcessor = null;
    histroryRecordProcessor = null;
    webIndexProcessor = null;
    bookMetaProcessor = null;

    constructor(){
        super();
        this.webImageSaveProcessor = new WebImageSaveProcessor();
        this.packageZipProcessor = new PackageZipProcessor();
        this.histroryRecordProcessor = new HistroryRecordProcessor();
        this.webIndexProcessor = new WebIndexProcessor();
        this.bookMetaProcessor = new BookMetaProcessor();
    }

    async processDownloadBook(webBook){
        let isParsingSuccess = true;
        webBook.embedWebLoaders();
        this.log("Start Process donwload book  , " , webBook.getName());


        

        while(webBook.hasNext()) {
            const WebLoaderType = webBook.next();
            if( WebLoaderType ) {
                const groupCodeBefore = webBook.getGroupEncryption();

                const webLoader = new WebLoaderType();
                webLoader.setWebBook(webBook);
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

                const groupCodeAfter = webBook.getGroupEncryption();

                if(groupCodeBefore != groupCodeAfter) {
                    this.log("Notice Web book group changed , start filter process");
                    const groups = await this.histroryRecordProcessor.filterDoneGroups( webBook , webBook.getGroups());
                    webBook.setGroups(groups);
                }
            }
            await this.hold(3 * 1000);
        }
        if(isParsingSuccess) {
            const webIndex = await this.webIndexProcessor.buildIndexByBook(webBook);
            webBook.setWebIndex(webIndex);
            this.webIndexProcessor.record(webIndex);
        }
        
        if(isParsingSuccess) {
            this.log("Prepare save book , Book = "  , webBook.getName());
            await this.webImageSaveProcessor.save(webBook , this.histroryRecordProcessor , this.bookMetaProcessor);

            if( WorkSpace.target.isEnableZipPack() ) await this.packageZipProcessor.pack(webBook);
        } else {
            this.log("Parsing fail , skip save process , book = " , webBook.getName());
        }

    }
}

module.exports.DownloadProcessor = DownloadProcessor;