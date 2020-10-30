'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;
const WorkSpace = require("../env/WorkSpace").WorkSpace;
const FileTool = require("../../../libs/ec/common/FileTool").FileTool;
const StringTool = require("../../../libs/ec/common/StringTool").StringTool;

class BookMetaProcessor extends Basis {

    fileTool = new FileTool();
    strTool = new StringTool();

    constructor(){super();}

    recordNew( webBook ){
        const groups = webBook.getGroups();
        if(groups.length > 0){
            this.log(`Start record meta ,  book[${webBook.getName()}]  , group size = ${groups.length}`);
            const saveTo = WorkSpace.target.getStorageDirectory().Uri() + webBook.getDomain() + "/" + webBook.getName() + "/meta.txt";
            const currDate = this.strTool.sysDate();
            for(let i = 0; i < groups.length;i++){
                const content = `${currDate} ${groups[i].getSerNo()} ${groups[i].getUrl()} ${groups[i].getAvailableImageSize()}`;
                this.fileTool.writeFile(saveTo , content + "\r\n" , true);
            }
        } else {
            this.log(`No New group from [${webBook.getName()}] need to add to book meta , skip it`);
        }
    }


}

module.exports.BookMetaProcessor = BookMetaProcessor;