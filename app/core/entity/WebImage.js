'use strict'
const Basis = require("../../../libs/ec/system/Basis").Basis;

class WebImage extends Basis {

    serno = null;
    url = null;
    
    constructor(url){
        super();
        this.url = url;
    }

    getUrl(){
        return this.url;
    }

    setSerNo(serNo){
        this.serno = String(serNo).padStart(3 , '0');
    }

    getSerNo(){
        return this.serno;
    }


}


module.exports.WebImage = WebImage;