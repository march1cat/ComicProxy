'use strict'

const Basis = require("../../libs/ec/system/Basis").Basis;
const Zipper = require("../../libs/ec/zip/Zipper").Zipper;
const FileTool = require("../../libs/ec/common/FileTool").FileTool;
const EcDirectory = require("../../libs/ec/common/EcDirectory").EcDirectory;

class PackageZipProcessor extends Basis {

    fileTool = new FileTool();
    zipStorageDir = new EcDirectory(this.AppConfig().ZipStorage , true);
    zipper = new Zipper();

    constructor(){
        super();
    }

    async pack(webBook){ 
        this.log("Start Process pack book  , " , webBook.getName());
        const sourceStorageDir = new EcDirectory(`${this.AppConfig().Storoage}`);
        const bookSavePosDir = new EcDirectory(`${sourceStorageDir.Uri()}${webBook.getDomain()}/${webBook.getName()}`  , true);
        
        const groups = this.fileTool.viewFiles(bookSavePosDir.Uri());
        if(groups){
            for(let i = 0;i < groups.length;i++){
                let directoryName = groups[i];
                let source = bookSavePosDir.Uri() + directoryName;
                if(this.fileTool.isDirectory(source)) {
                    const saveTo = this.zipStorageDir.Uri() + webBook.getName() + "_" + directoryName + ".zip";
                    await this.zip(source , saveTo);
                }
            }
        } else {
            this.log("Not group found for book " + webBook.getName() + " , path = " + bookSavePosDir.Uri());
        }
    }

    async zip(source , saveTo){
        this.log("Prepare zip folder = " + source + " , save to " + saveTo);
        await this.zipper.zipDirectory(source , saveTo);
        this.log("Zip folder = " + source + " , save to " + saveTo + ' success');
    }


}

module.exports.PackageZipProcessor = PackageZipProcessor;