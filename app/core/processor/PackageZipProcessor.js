'use strict'


const Basis = require("../../../libs/ec/system/Basis").Basis;
const Zipper = require("../../../libs/ec/zip/Zipper").Zipper;
const FileTool = require("../../../libs/ec/common/FileTool").FileTool;
const EcDirectory = require("../../../libs/ec/common/EcDirectory").EcDirectory;
const WorkSpace = require("../env/WorkSpace").WorkSpace;
const WebIndex = require("../entity/WebIndex").WebIndex;
const WebBook = require("../entity/WebBook").WebBook;


class PackageZipProcessor extends Basis {

    fileTool = new FileTool();
    zipStorageDir = WorkSpace.target.getZipDirectory();
    zipper = new Zipper();

    constructor(){
        super();
    }

    async pack(target){ 
        const packAttrs = target instanceof WebIndex ? this.preparePackByWebIndex(target) : this.preparePackByWebBook(target);
        if(packAttrs){
            const directoryNames = packAttrs.directoryNames;
            const bookSavePosDir  = packAttrs.bookSavePosDir;
            const zipDestination = packAttrs.zipDestination;
            const bookName = packAttrs.name;

            const retryItems = [];
            for(let i = 0;i < directoryNames.length;i++){
                let directoryName = directoryNames[i];
                let source = bookSavePosDir.Uri() + directoryName;
                if(this.fileTool.isDirectory(source)) {
                    const saveTo = zipDestination.Uri() + bookName + "_" + directoryName + ".zip";
                    if(!this.fileTool.isFileExist(saveTo)) {
                        this.log(`Zip from ${source} to ${saveTo}`);
                        const retryItem = await this.zip(source , saveTo);
                        if( retryItem ) retryItems.push(retryItem);
                    } else {
                        this.log(`File ${saveTo} exist , skip zip it!!`);
                    }
                }
                if(this.AppConfig().IsDev) break;
            }
            if(retryItems) {
                await this.retryProcess(retryItems);
            }
        }
    }

    preparePackByWebBook(webBook){
        this.log("Start Process pack book by web book  , " , webBook.getName());
        const groups = webBook.getGroups();
        if(groups && groups.length > 0) {
            const bookSavePosDir = new EcDirectory(`${WorkSpace.target.getStorageDirectory().Uri()}${webBook.getDomain()}/${webBook.getName()}`  , true);
            const zipDestination = new EcDirectory(`${this.zipStorageDir.Uri()}${webBook.getDomain()}/${webBook.getName()}` , true);
            this.log(`Notice (${groups.length}) groups to zip`);
            const directoryNames = groups.map( group => group.getSerNo());
            return {
                bookSavePosDir : bookSavePosDir , 
                zipDestination : zipDestination ,
                directoryNames : directoryNames , 
                name : webBook.getName()
            }
        } else {
            this.log(`No groups to zip`);
        }
        return null;
    }

    preparePackByWebIndex(webIndex){
        this.log("Start Process pack book by index  , " , webIndex.getName());
        const bookSavePosDir = new EcDirectory(`${WorkSpace.target.getStorageDirectory().Uri()}${webIndex.getDomain()}/${webIndex.getName()}`  , true);
        const zipDestination = new EcDirectory(`${this.zipStorageDir.Uri()}${webIndex.getDomain()}/${webIndex.getName()}` , true);
        const groups = this.fileTool.viewFiles(bookSavePosDir.Uri());
        if(groups){
            return {
                bookSavePosDir : bookSavePosDir , 
                zipDestination : zipDestination ,
                directoryNames : groups , 
                name : webIndex.getName()
            }
        } else {
            this.log("Not group found for book " + webIndex.getName() + " , path = " + bookSavePosDir.Uri());
        }
        return null;
    }

    async retryProcess(targetItems){
        let retryItems = targetItems;
        let retryCount = 0 ;
        while(retryItems.length > 0 && retryCount < 3){
            this.log(`Notice [${retryItems.length}] retry items , start retry`);
            let failItems = [];
            for(let i = 0 ;i < retryItems.length;i++){
                const retryItem = retryItems[i];
                this.log(`Retry zip ${retryItem.source} Count ${retryCount}`);
                const failItem = await this.zip(source , saveTo);
                if( failItem ) failItems.push(failItem);
            }
            retryItems = failItems;
            retryCount++;
        }
    }

    async zip(source , saveTo){
        this.log("Prepare zip folder = " + source + " , save to " + saveTo);
        try {
            await this.zipper.zipDirectory(source , saveTo);
            this.log("Zip folder = " + source + " , save to " + saveTo + ' success');
        } catch(err){
            this.log(`Zip[${source}] fail , error = ${err}`);
            return {
                source : source , 
                saveTo : saveTo
            }
        }
    }


}

module.exports.PackageZipProcessor = PackageZipProcessor;