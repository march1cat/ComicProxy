'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;
class Group extends Basis {

    url = null;
    serno = null;
    webImages = [];
    availableImageSize = 0;

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
        if( !webImage.getSerNo() ) webImage.setSerNo(this.webImages.length + 1);
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

    plusAvailableImage(size){
        this.availableImageSize += size;
    }

    getAvailableImageSize(){
        return this.availableImageSize;
    }

    static buildGroup(url){
        const g = new Group();
        g.setUrl(url);
        return g;
    }
}

module.exports.Group = Group;