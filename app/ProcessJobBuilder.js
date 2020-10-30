'use strict'
const Basis = require("../libs/ec/system/Basis").Basis;
const StringTool = require("../libs/ec/common/StringTool").StringTool;
class ProcessJobBuilder extends Basis {

    
    static ProcessJob = {
        Download : "Download" , 
        Scan : "Scan" , 
        BatchDownload : "BatchDownload" , 
        RunDevCode : "RunDevCode" , 
        ZipIndex : "ZipIndex" , 
        Help : "Help"
    }

    stringTool = new StringTool();

    constructor(){super()}

    buildProcessJob(procArgs){
        if(this.AppConfig().IsDev && procArgs && procArgs[0] == 'dev'){
            return ProcessJobBuilder.ProcessJob.RunDevCode;
        }

        if(procArgs && procArgs.length > 0){
            if(procArgs[0] == 'scan') {
                return ProcessJobBuilder.ProcessJob.Scan;
            } else if(this.stringTool.isNumber(procArgs[0])){
                return ProcessJobBuilder.ProcessJob.ZipIndex;
            } else if(procArgs[0] == 'help') {
                return ProcessJobBuilder.ProcessJob.Help;
            }
        }

        if(procArgs && procArgs.length > 0){
            if( String(procArgs[0]).endsWith("txt") ) 
                return ProcessJobBuilder.ProcessJob.BatchDownload;
            else 
                return ProcessJobBuilder.ProcessJob.Download;
        } else {
            return ProcessJobBuilder.ProcessJob.Scan;
        }
    }
}

module.exports.ProcessJobBuilder = ProcessJobBuilder;