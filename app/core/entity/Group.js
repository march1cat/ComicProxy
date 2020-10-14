'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;
class Group extends Basis {

    url = null;
    serno = null;
    webImages = [];

    constructor(){
        super();
    }

    setUrl(url){
        this.url = url;
    }

    getUrl(){
        return this.url;
    }

    addWebImage(webImage){
        this.webImages.push(webImage);
    }

    getWebImages(){
        return this.webImages;
    }

    setSerNo(serNo){
        this.serno = String(serNo).padStart(4 , '0');
    }

    getSerNo(){
        return this.serno;
    }

    static buildGroup(url){
        const g = new Group();
        g.setUrl(url);
        return g;
    }
}

module.exports.Group = Group;