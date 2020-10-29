'use strict'


const Basis = require("../../../libs/ec/system/Basis").Basis;
const Zipper = require("../../../libs/ec/zip/Zipper").Zipper;
const FileTool = require("../../../libs/ec/common/FileTool").FileTool;
const EcDirectory = require("../../../libs/ec/common/EcDirectory").EcDirectory;
const WebImageSaveProcessor = require("../processor/WebImageSaveProcessor").WebImageSaveProcessor;
const WorkSpace = require("../env/WorkSpace").WorkSpace;
class PackageZipProcessor extends Basis {

    fileTool = new FileTool();
    zipStorageDir = WorkSpace.target.getZipDirectory();
    zipper = new Zipper();

    constructor(){
        super();
    }

    async pack(webIndex){ 
        this.log("Start Process pack book  , " , webIndex.getName());
        const bookSavePosDir = new EcDirectory(`${WorkSpace.target.getStorageDirectory().Uri()}${webIndex.getDomain()}/${webIndex.getName()}`  , true);
        
        const groups = this.fileTool.viewFiles(bookSavePosDir.Uri());
        if(groups){
            const zipDestination = new EcDirectory(`${this.zipStorageDir.Uri()}${webIndex.getDomain()}/${webIndex.getName()}` , true);
            const retryItems = [];
            for(let i = 0;i < groups.length;i++){
                let directoryName = groups[i];
                let source = bookSavePosDir.Uri() + directoryName;
                if(this.fileTool.isDirectory(source)) {
                    const saveTo = zipDestination.Uri() + webIndex.getName() + "_" + directoryName + ".zip";
                    const retryItem = await this.zip(source , saveTo);
                    if( retryItem ) retryItems.push(retryItem);
                }
            }
            if(retryItems) {
                await this.retryProcess(retryItems);
            }
        } else {
            this.log("Not group found for book " + webIndex.getName() + " , path = " + bookSavePosDir.Uri());
        }
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