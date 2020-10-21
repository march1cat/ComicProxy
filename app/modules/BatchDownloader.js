'use strict'

const Basis = require("../../libs/ec/system/Basis").Basis;
const FileTool = require("../../libs/ec/common/FileTool").FileTool;
const Downloader = require("./Downloader").Downloader;

class BatchDownloader extends Basis {

    constructor(){super()}

    async start(urlTextsFileName){
        this.log("Start batch download mode , target urls file = " , urlTextsFileName);
        const urls = await this.parsingUrls(urlTextsFileName);
        if(urls){
            this.log(`Notice (${urls.length}) urls in target file!!`);
            for(let i = 0 ;i < urls.length;i++){
                const downloader = new Downloader();
                await downloader.download(urls[i]);
            }
        }
    }


    async parsingUrls(urlTextsFileName){
        const fileTool = new FileTool();
        const lines = await fileTool.readFileInLines(urlTextsFileName);
        if(lines){
            return lines.map(line => String(line).trim());
        }
    }


}

module.exports.BatchDownloader = BatchDownloader;