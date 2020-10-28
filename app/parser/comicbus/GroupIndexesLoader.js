'use strict'

const WebLoader = require("../../core/entity/WebLoader").WebLoader;
const StringTool = require("../../../libs/ec/common/StringTool").StringTool;
const Group = require("../../core/entity/Group").Group;

class GroupIndexesLoader extends WebLoader {

    strTool = new StringTool();

    constructor(){
        super();
    }

    //Override
    async process(){
        const entryUrl = this.webBook.getEntryUrl();
        this.log(`Start parsing index for entryUrl = ${entryUrl} from domain ${this.webBook.getDomain()}`);
        const code = this.parsingCode(entryUrl);
        this.log("Notice Code = " , code);
        this.webBook.setBookCode(code);
        try {
            let httpResData = await this.connectWeb(entryUrl , true);

            const title = this.parsingName(httpResData.document);
            if(title) this.webBook.setName(title);
            else {
                this.log("Book title parising fail!! , use code as name");
                this.webBook.setName(code);
            }

            let chapterNos =  this.parsingChapterNos(httpResData.body , code);
            chapterNos.forEach(chapterNo => {
                const groupUrl = `https://comicbus.live/online/a-${code}.html?ch=${chapterNo}`;
                this.log("Notice Group Url = " , groupUrl);
                let g = Group.buildGroup(groupUrl);
                this.webBook.addGroup(g);
            })
            if(chapterNos.length > 0){
                this.log(`Book [${this.webBook.getName()}]  chapter no amounts = ${chapterNos.length}`);
                return true;
            } else {
                this.log(`Book [${this.webBook.getName()}] has no chapter!!`);
            }
        } catch(err){
            this.log("Load Web Fail , err = " , err);
        }
        
        return false;
    }

    parsingName(dom){
        const titleDom  = dom.querySelector("title");
        let title = titleDom.textContent;
        const reps = ["最新熱門連載漫畫" , " - 無限動漫 8comic.com comicbus.com"];
        reps.forEach( rep => {
            title = String(title).replace(rep , "");
        })
        return title;
    }


    parsingCode(url){
        const reg = "comicbus.com/html/(.*?).html";
        const searchResult = this.strTool.regSearch(reg , url);
        return searchResult ? searchResult[1] : null;
    }


    parsingChapterNos(htmlBody , code){
        const ar = htmlBody.split("\r\n");
        
        const reg = `cview\\('${code}\\-(.*?)\.html',[0-9]*?,[0-9]*?\\)`;
        const results = ar.map(line => {
            const isMatch = this.strTool.regValidate(reg , line);
            if(isMatch){
                const search = this.strTool.regSearch(reg , line);
                if(search) return search[1];
            }
        }).filter(item => item);
        const chapterNos = results.filter( (chapter_no , index) => results.indexOf(chapter_no) == index);
        return chapterNos;
    }

}

module.exports.GroupIndexesLoader = GroupIndexesLoader;