'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;
const WorkSpace = require("../env/WorkSpace").WorkSpace;
const FileTool = require("../../../libs/ec/common/FileTool").FileTool;
const StringTool = require("../../../libs/ec/common/StringTool").StringTool;

class BookMetaProcessor extends Basis {

    fileTool = new FileTool();
    strTool = new StringTool();

    constructor(){super();}

    recordNew( webBook , group){
        const groups = webBook.getGroups();
        this.log(`Start record meta ,  book[${webBook.getName()}]  , group series = ${group.getSerNo()}`);
        const saveTo = WorkSpace.target.getStorageDirectory().Uri() + webBook.getDomain() + "/" + webBook.getName() + "/meta.txt";
        const currDate = this.strTool.sysDate();
        const content = `${currDate} ${group.getSerNo()} ${group.getUrl()} ${group.getAvailableImageSize()}`;
        this.fileTool.writeFile(saveTo , content + "\r\n" , true);
    }


}

module.exports.BookMetaProcessor = BookMetaProcessor;