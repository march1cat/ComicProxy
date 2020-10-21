'use strict'

const Basis = require("../../libs/ec/system/Basis").Basis;
const ParserController = require("../parser/ParserController").ParserController;
const DownloadProcessor = require("../core/processor/DownloadProcessor").DownloadProcessor;


class Downloader extends Basis {

    constructor(){super()}

    async download(url){
        const parserControl = new ParserController();
        const webBook = parserControl.generateWebBook(url);
        if(webBook){
            const downloadProcessor = new DownloadProcessor();
            await downloadProcessor.processDownloadBook(webBook);
        }
    }

}

module.exports.Downloader = Downloader;