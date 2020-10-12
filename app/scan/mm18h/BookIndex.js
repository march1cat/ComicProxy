'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;

class BookIndex extends Basis {

    title = null;
    url = null;

    constructor(){
        super();
    }

    setTitle(title){
        this.title = title;
    }
    getTitle(){
        return this.title;
    }

    setUrl(url){
        this.url = url;
    }

    getUrl(){
        return this.url;
    }

}

module.exports.BookIndex = BookIndex;