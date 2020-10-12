'use strict';
const Basis = require("../../libs/ec/system/Basis").Basis;

class WebLoader extends Basis {

    webBook = null;
    

    constructor(webBook){
        super();
        this.webBook = webBook;
    }

    async process(){
        //wait to ovveride
        return false;
    }

}

module.exports.WebLoader = WebLoader;