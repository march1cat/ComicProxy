'use strict'

const ApplicationMain = require("../libs/ec/system/ApplicationMain").ApplicationMain;
const ProcessJobBuilder = require("./ProcessJobBuilder").ProcessJobBuilder;
const Downloader = require("./modules/Downloader").Downloader;
const BatchDownloader = require("./modules/BatchDownloader").BatchDownloader;
const Scanner = require("./modules/Scanner").Scanner;

class AppMain extends ApplicationMain {

    constructor(){
        super();
    }

    async main(args){
        if(this.AppConfig().IsDev) this.log("Run Dev Mode!!");


        let jobBuilder = new ProcessJobBuilder();
        const processJob = jobBuilder.buildProcessJob(args);


        switch (processJob) {
            case ProcessJobBuilder.ProcessJob.RunDevCode:
                await new (require("./dev/Dev").Dev)().test();
                break;
            case ProcessJobBuilder.ProcessJob.Scan:
                this.log("Scan Mode!!");
                await (new Scanner()).start(args);
                break;
            case ProcessJobBuilder.ProcessJob.BatchDownload:
                this.log("Batch Download Mode!!");
                await (new BatchDownloader()).start(args[0]);
                break;
            default : 
                this.log("Download Mode!!");
                //const url = args.length > 0 ? args[0] : "https://18h.mm-cg.com/18H_5086.html";
                const url = args.length > 0 ? args[0] : "https://comicbus.com/html/6997.html";
                const downloader = new Downloader();
                await downloader.download(url);
        }
        
    }

    

}


module.exports.AppMain = AppMain;