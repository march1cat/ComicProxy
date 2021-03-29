'use strict'

const { EcDirectory } = require("../../../libs/ec/common/EcDirectory");
const Basis = require("../../../libs/ec/system/Basis").Basis;

class WorkSpace extends Basis {

    static target = null;

    workingDirectory = null;

    storageDirectory = null;
    historageDirectory = null;
    zipDirectory = null;
    scanDirectory = null;

    enableWriteHistory = true;
    enableZipPack = true;
    enableRecordMeta = true;

    indexFile = null;

    constructor(){
        super();
        this.enableWriteHistory = !this.AppConfig().IsDev;
        this.enableZipPack =  !this.AppConfig().IsDev && this.AppConfig().zipMode;
        this.enableRecordMeta = !this.AppConfig().IsDev;
    }

    static init(workspace){
        WorkSpace.target = new WorkSpace();
        WorkSpace.target.setWorkingDirectory(workspace);
    }

    setWorkingDirectory(workspace){
        this.log(`Mount ${workspace} as working space!!`);
        this.workingDirectory = new EcDirectory(workspace , true);
        this.storageDirectory = new EcDirectory(this.workingDirectory.Uri() + "storage" , true);
        this.zipDirectory = new EcDirectory(this.workingDirectory.Uri() + "zips", true);
        this.scanDirectory = new EcDirectory(this.workingDirectory.Uri() + "scan", true);
        this.historageDirectory = new EcDirectory(this.workingDirectory.Uri() + "history", true);
    }

    getWorkingDirectory(){
        return this.workingDirectory;
    }

    getStorageDirectory(){
        return this.storageDirectory ;
    }

    getHistoryDirectory(){
        return this.historageDirectory;
    }

    getScanDirectory(){
        return this.scanDirectory;
    }

    getZipDirectory(){
        return this.zipDirectory;
    }

    getIndexFile(){
        if(!this.indexFile)
            this.indexFile = this.workingDirectory.Uri() + "index.txt";
        return this.indexFile;
    }

    isEnableWriteHistory(){
        return this.enableWriteHistory;
    }

    isEnableZipPack(){
        return this.enableZipPack;
    }

    isEnableRecordMeta(){
        return this.enableRecordMeta;
    }

}


module.exports.WorkSpace = WorkSpace;