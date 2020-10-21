'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;
const WebClient = require("../../../libs/ec/net/WebClient").WebClient;
const StringTool = require("../../../libs/ec/common/StringTool").StringTool;
const FileTool = require("../../../libs/ec/common/FileTool").FileTool;
const EcDirectory = require("../../../libs/ec/common/EcDirectory").EcDirectory;
const BookIndex = require("./BookIndex").BookIndex;
const Book = require('../../parser/mm18h/Book').Book;

class IndexScanner extends Basis {

    domain = null;
    storageDir = null;
    saveTo = null;
    batchSaveTo = null;

    recordedUrls = [];

    strTool = new StringTool();

    constructor(){
        super();
        this.domain = (new Book()).getDomain();
        this.storageDir = new EcDirectory(this.AppConfig().ScanStorage , true);
        this.saveTo = this.storageDir.Uri()  + this.domain + ".txt";
        this.batchSaveTo = this.storageDir.Uri()  + this.domain + "_batch_" + this.strTool.sysDate() + ".txt";
    }

    async reloadRecorded(){
        let fileTool = new FileTool();
        if(fileTool.isFileExist(this.saveTo)){
            this.log(`Scan record ${this.saveTo} exist  , prepare repload it as history`);
            const records = await fileTool.readFileInLines(this.saveTo);
            if(records) {
                records.forEach(record => {
                    let ar = String(record).split(" ");
                    if(ar && ar.length >= 2) this.recordedUrls.push(ar[ar.length - 2]);
                });
            }
        }
    }

    async scan(url){
        let client = new WebClient();
        const dom = await client.getAsDom(url);
        const body = dom.querySelector("body");
        const aTags = body.getElementsByTagName("a");

        const reg = "18h.mm-cg.com/18H_(.*?).html";
        const fileTool = new FileTool();
        let writeCount = this.recordedUrls.length;
        for(var i = 0 ;i < aTags.length;i++){
            const linkUrl = aTags.item(i).getAttribute("href");
            const title = aTags.item(i).textContent;
            if(linkUrl) {
                const regDatas = this.strTool.regSearch(reg,linkUrl);
                if(regDatas && regDatas.length >= 2) {
                    const bookIndex = new BookIndex();
                    const bookUrl = "https://18h.mm-cg.com/18H_" + regDatas[1] + ".html";
                    bookIndex.setTitle(title);
                    bookIndex.setUrl(bookUrl);
                    if(!this.recordedUrls.includes(bookUrl)){
                        fileTool.writeFile(this.saveTo,` ${writeCount + 1} ${bookIndex.getTitle()} ${bookIndex.getUrl()} \r\n` , true);
                        fileTool.writeFile(this.batchSaveTo,`${bookIndex.getUrl()} \r\n` , true);
                        this.log("Notice book " , title + " " +  bookUrl);
                        writeCount++;
                    }
                }
            }
        }
    }

}


module.exports.IndexScanner = IndexScanner;