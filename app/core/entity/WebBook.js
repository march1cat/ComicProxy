'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;

class WebBook extends Basis{

    domain = null;

    webLoaders = [];
    groups = [];
    

    loaderCursor = 0;

    name = null;
    entryUrl = null;

    constructor(domain){
        super();
        this.domain = domain;
    }

    hasNext(){
        return this.loaderCursor < this.webLoaders.length;
    }

    next(){
        if(this.hasNext()){
            let webLoader = this.webLoaders[this.loaderCursor];
            this.loaderCursor++;
            return webLoader;
        } else return null;
    }

    
    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    setEntryUrl(url){
        this.entryUrl = url;
    }

    getEntryUrl(){
        return this.entryUrl;
    }

    getDomain(){
        return this.domain;
    }

    addGroup(group){
        if(!group.getSerNo()) 
            group.setSerNo(this.groups.length + 1);
        this.groups.push(group);
    }

    getGroups(){
        return this.groups;
    }

    setGroups(groups){
        this.groups = groups;
    }

    embedWebLoaders(){
        //wait to override
    }


}

module.exports.WebBook = WebBook;