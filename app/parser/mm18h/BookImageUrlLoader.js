'use strict'
const WebLoader = require("../../core/entity/WebLoader").WebLoader;
const StringTool = require("../../../libs/ec/common/StringTool").StringTool;
const WebImage = require("../../core/entity/WebImage").WebImage;

class BookImageUrlLoader extends WebLoader {

    stringTool = new StringTool();

    constructor(){
        super();
    }

    async process(){
       this.log("Start BookImageUrlLoader for book = " , this.webBook.getName());
       let groups = this.webBook.getGroups();
       if(groups){
           for(var i = 0;i < groups.length;i++){
             await this.parsingGroup(groups[i] , i);
           }
           return true;
       } else {
           this.log("No Group found for book , " + this.webBook.getName());
       }
       return false;
    }

    async parsingGroup(group , index){
        const response = await this.connectWeb(group.getUrl());
        if(index == 0) {
            const bookName = this.parsingName(response.document);
            this.webBook.setName(bookName);
        }
        await this.parsingImages(group , response.body);
    }

    parsingName(dom){
        const titleDom  = dom.querySelector("title");
        const title = titleDom.textContent;
        let reg = /\[.{0,5}掃圖\]/i;
        let clean_title = String(title).replace("18H,18h漫畫," , "").replace(reg,"");
        return clean_title;
    }


    async parsingImages(group , body){
        let contentAr = body.split("\r\n");
        const reg = 'Large_cgurl(.*?) = \"https://(.*?).jpg\";';
        contentAr.forEach( (element , index) => {
            if(element.indexOf("Large_cgurl") >= 0) {
                const check = this.stringTool.regSearch(reg , element.trim());
                if(check) {
                    const linkSourceAr = element.split(";");
                    linkSourceAr.forEach(linkSource => {
                        const dataAr = this.stringTool.regSearch(reg , linkSource + ";");
                        if(dataAr && dataAr.length >= 3) {
                            const serno = dataAr[1].replace("[" , "").replace("]" , "");
                            const image = new WebImage("https://" + dataAr[2] + ".jpg");
                            image.setSerNo(serno);
                            this.log("Notice image " , image.getUrl());
                            group.addWebImage(image);
                        }
                    })
                }
            }
        });
    }

    


}

module.exports.BookImageUrlLoader = BookImageUrlLoader;