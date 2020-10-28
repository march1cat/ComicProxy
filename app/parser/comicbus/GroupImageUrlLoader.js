'use strict'
const WebLoader = require("../../core/entity/WebLoader").WebLoader;
const StringTool = require("../../../libs/ec/common/StringTool").StringTool;
const ImageUrlBuilder = require("./ImageUrlBuilder").ImageUrlBuilder;
const WebImage = require("../../core/entity/WebImage").WebImage;

class GroupImageUrlLoader extends WebLoader {

    strTool = new StringTool();
    imageUrlBuilder = null;

    constructor() {
        super();
    }

    //Override
    async process(){
        this.log(`Start parse group image urls from web book[${this.webBook.getName()}]`);
        const groups = await this.hisRecordProc.filterDoneGroups(this.webBook , this.webBook.getGroups());
        this.webBook.setGroups(groups);
        if(groups) {
            try {
                let encryptInfo = null;
                for(let i = 0 ;i < groups.length; i++){
                    let g = groups[i];
                    this.log("Parsing image urls for link = " , g.getUrl());
                    if(!encryptInfo) encryptInfo = await this.loadBookEncryptedInfo(g);
                    if(encryptInfo){
                        //if(this.AppConfig().IsDev) this.log("EncryptInfo = " , encryptInfo);
                        this.imageUrlBuilder = new ImageUrlBuilder(this.webBook.getBookCode() , encryptInfo.encryptText , encryptInfo.args);
                        const images = this.analyticGroupImages(g);
                        if(images) {
                            images.forEach(image => g.addWebImage(image));
                            this.log(`Group url[${g.getUrl()}] has ${images.length} images`);
                        }
                    } else {
                        this.log(`Parsing encrypt info for book[${this.webBook.getName()}] fail!! , url = ${g.getUrl()}`);
                        return false;
                    }
                    if(this.AppConfig().IsDev) break;
                }
                return true;
            } catch(err){
                this.log("Parsing Image urls fail , err = " , err);
            }
        } else {
            this.log(`Book[] has no undone group !!`);
        }
        return false;
    }

    analyticGroupImages(group){
        const images = [];
        for(let i = 1 ; i < 100; i++){
            let imageUrl = this.imageUrlBuilder.calcurate(group.getSerNo() , i);
            if(imageUrl) {
                let image = new WebImage(imageUrl);
                images.push(image);
            }
        }
        return images;
    }

    async loadBookEncryptedInfo(group){
        let httpResult = await this.connectWeb(group.getUrl() , true);
        let ar = httpResult.body.split("\r\n");

        let encryptText = null;
        if(true){
            const reg = "var cs\\='(.*?)';";
            const datas = ar.map(a => {
                const ismatch = this.strTool.regValidate(reg , a);
                if(ismatch) {
                    const datas = this.strTool.regSearch(reg , a);
                    return datas[1];
                }
            }).filter( item => item); 
            if(datas) encryptText = datas[0];
        }

        let calcurateArgs = {};
        if(true){
            const reg = "var (.*?)=.*?lc\\(su\\(cs,i\\*y\\+([0-9]*?),([0-9]*?)\\)\\)";
            ar.forEach(element => {
                let ismatch = this.strTool.regValidate(reg , element);
                if(ismatch) {
                    const subAr = element.split(";");
                    subAr.forEach(item => {
                        ismatch = this.strTool.regValidate(reg , item);
                        if(ismatch){
                            const datas = this.strTool.regSearch(reg , item);
                            calcurateArgs[datas[1]] = {
                                arg1 : datas[2] , 
                                arg2 : datas[3] , 
                            }
                        }
                    });
                }
            });
        }

        let calcurateValueSort = [];
        if(true){
            let reg1 = "ge\\('TheImg'\\).src='\\/\\/img'\\+su\\((.*?), 0, 1\\)\\+'.8comic.com\\/'\\+su\\((.*?),1,1\\)\\+'/'\\+ti\\+'/'\\+(.*?)\\+'/'\\+ nn\\(p\\)\\+'_'\\+su\\((.*?),mm\\(p\\),3\\)\\+'.jpg'";
            let reg2 = "if\\((.*?)== ch\\)\\{ci=i";
            ar.forEach(a => {
                let ismatch = this.strTool.regValidate(reg1 , a);
                if(ismatch) {
                    const subAr = a.split(";");
                    subAr.forEach(element => {
                        ismatch = this.strTool.regValidate(reg1 , element);
                        if(ismatch){
                            const datas = this.strTool.regSearch(reg1 , element);
                            calcurateValueSort.push(datas[1]);
                            calcurateValueSort.push(datas[2]);
                            calcurateValueSort.push(datas[3]);
                            calcurateValueSort.push(datas[4]);
                        }
                    });
                }
            }) 
        }

        const calcurateValue = calcurateValueSort.map( key => calcurateArgs[key]).filter(item => item);
        if(encryptText && calcurateValue.length == 4) {
            return {
                encryptText : encryptText , 
                args : calcurateValue
            }
        } else {
            this.log("Parsing calcurate option fail");
            this.log("calcurateArgs = " , calcurateArgs);
            this.log("calcurateValueSort = " , calcurateValueSort);
        }
        return null;
    }


}


module.exports.GroupImageUrlLoader = GroupImageUrlLoader;