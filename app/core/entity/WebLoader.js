'use strict';

const Basis = require("../../../libs/ec/system/Basis").Basis;

class WebLoader extends Basis {

    webBook = null;
    hisRecordProc = null;
    
    constructor(webBook){
        super();
        this.webBook = webBook;
    }

    async process(){
        //wait to ovveride
        return false;
    }

    setHistoryRecordProc (hisRecordProc){
        this.hisRecordProc = hisRecordProc;
    }

    hisRecordProc(){
        
    }

}

module.exports.WebLoader = WebLoader;