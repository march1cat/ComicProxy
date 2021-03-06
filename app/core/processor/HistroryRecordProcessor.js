'use strict'


const Basis = require("../../../libs/ec/system/Basis").Basis;
const FileTool = require("../../../libs/ec/common/FileTool").FileTool;
const StringTool = require("../../../libs/ec/common/StringTool").StringTool;
const WorkSpace = require("../env/WorkSpace").WorkSpace;

class HistroryRecordProcessor extends Basis {

    fileTool = new FileTool();
    stringTool = new StringTool();
    hisStorageDir = WorkSpace.target.getHistoryDirectory();
    
    constructor(){
        super();
    }

    async filterDoneGroups(webBook , groups){
        if(groups) {
            const orgAmount = groups.length;
            const hisRecordFile = this.hisStorageDir.Uri() + webBook.getDomain() + ".txt";
            const records = await this.fileTool.readFileInLines(hisRecordFile);
            if(records){
                const isRecordExist = group => {
                    return records.includes(group.getUrl());
                }
                groups = groups.filter( g => {
                    if(isRecordExist(g)) {
                        this.log(`Group ${g.getUrl()} has been downloaded , remove it !! `);
                        return false;
                    } else return true;
                })
            }
            this.log(`Start filter done group , Original amount =  ${orgAmount} , new = ${groups.length}`);
        }
        return groups;
    }

    recordDownload(webBook){
        const groups = webBook.getGroups();
        if(groups){
            for(var i = 0 ;i < groups.length;i++){
                const group = groups[i];
                this.recordDownloadGroup(group);
            }
        }
    }

    recordDownloadGroup(webBook  , group){
        const saveTo = this.hisStorageDir.Uri() + webBook.getDomain() + ".txt";
        this.fileTool.writeFile(saveTo , `${group.getUrl().trim()}\r\n` , true);
    }
}

module.exports.HistroryRecordProcessor = HistroryRecordProcessor;