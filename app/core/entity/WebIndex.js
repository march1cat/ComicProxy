'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;

class WebIndex extends Basis {

    indexID = null;
    indexUrl = null;
    domain = null;
    name = null;

    constructor(){
        super();
    }

    setIndexID(indexID){
        this.indexID = indexID;
    }

    getIndexID(){
        return this.indexID;
    }

    setIndexUrl(indexUrl){
        this.indexUrl = indexUrl;
    }

    getIndexUrl(){
        return this.indexUrl;
    }

    setDomain(domain){
        this.domain = domain;
    }

    getDomain(){
        return this.domain;
    }

    setName(name){
        return this.name = name;
    }

    getName(){
        return this.name;
    }

}

module.exports.WebIndex = WebIndex;