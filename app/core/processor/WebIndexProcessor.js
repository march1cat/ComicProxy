'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;
const WebIndex = require("../entity/WebIndex").WebIndex;
const FileTool = require("../../../libs/ec/common/FileTool").FileTool;
const WorkSpace = require("../env/WorkSpace").WorkSpace;

class WebIndexProcessor extends Basis {

    fileTool = new FileTool();
    currIndexSeries = -1;

    existIndexUrls = [];

    constructor(){
        super();
    }

    async initIndexSeriesNo(){
        const indexLines = await this.fileTool.readFileInLines(WorkSpace.target.getIndexFile());
        if(indexLines) 
            this.existIndexUrls = indexLines.map(line => {
                let ar = line.split(" ");
                if(ar.length >= 3) return ar[2];
            }).filter(item => item);
        this.currIndexSeries = this.existIndexUrls.length + 1;
        this.log(`Init Web index serno = ${this.currIndexSeries}`);
    }

    async buildIndexByBook(webBook){
        try {
            if(this.currIndexSeries == -1) await this.initIndexSeriesNo();
        } catch(err){
            this.currIndexSeries = 1;
        }
        const index = new WebIndex();
        if( !this.existIndexUrls.includes(webBook.getEntryUrl()) ){
            index.setIndexID(this.currIndexSeries++);
        }
        index.setDomain(webBook.getDomain());
        index.setName(webBook.getName());
        index.setIndexUrl(webBook.getEntryUrl());
        return index;
    }

    async buildIndexByID(id){
        const indexLines = await this.fileTool.readFileInLines(WorkSpace.target.getIndexFile());
        if(indexLines) {
            for(let i = 0 ;i < indexLines.length; i++){
                const line = String(indexLines[i]);
                if(line.trim().length == 0) continue;
                let ar = line.split(" ");
                if(ar.length >= 3 && ar[0] === id) {
                    const index = new WebIndex();
                    const name = String(line).substring(String(line).indexOf("@Name=") + "@Name=".length);
                    index.setDomain(ar[1]);
                    index.setName(name);
                    index.setIndexUrl(ar[2]);
                    return index;
                }
            }
        }
    }

    record(webIndex){
        if( webIndex.getIndexID() ){
            const writeText = `${webIndex.getIndexID()} ${webIndex.getDomain()} ${webIndex.getIndexUrl()} @Name=${webIndex.getName()}\r\n`;
            this.fileTool.writeFile(WorkSpace.target.getIndexFile() , writeText , true);
            this.log(`Record new index Url[${webIndex.getIndexUrl()}] , id = ${webIndex.getIndexID()}`);
        } else {
            this.log(`IndexUrl[${webIndex.getIndexUrl()}] exist , skip record new index!`);
        }
    }

}

module.exports.WebIndexProcessor = WebIndexProcessor;