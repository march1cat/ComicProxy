'use strict';

const Basis = require("../../../libs/ec/system/Basis").Basis;
const WebClient = require("../../../libs/ec/net/WebClient").WebClient;

class WebLoader extends Basis {

    webBook = null;
    hisRecordProc = null;
    
    constructor(){
        super();
    }

    async process(){
        //wait to ovveride
        return false;
    }

    setWebBook(webBook){
        this.webBook = webBook;
    }

    setHistoryRecordProc (hisRecordProc){
        this.hisRecordProc = hisRecordProc;
    }

    async connectWeb(url , disableAutoEncodeUtf8){
        const client = new WebClient();
        return await client.get(url , disableAutoEncodeUtf8);
    }

}

module.exports.WebLoader = WebLoader;