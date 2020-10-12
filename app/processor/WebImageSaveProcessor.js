'use strict'
const Basis = require("../../libs/ec/system/Basis").Basis;

const EcDirectory = require("../../libs/ec/common/EcDirectory").EcDirectory;
const WebClient = require("../../libs/ec/net/WebClient").WebClient;

class WebImageSaveProcessor extends  Basis {

    constructor(){
        super();
    }

    async save(webBook){
        const storageDir = new EcDirectory(`${this.AppConfig().Storoage}`);
        const bookSavePosDir = new EcDirectory(`${storageDir.Uri()}${webBook.getDomain()}/${webBook.getName()}`  , true);
        const groups = webBook.getGroups();
        if(groups){
            for(var i = 0 ;i < groups.length;i++){
                this.log(`Save book[${webBook.getName()}] group : ${i+1} / ${groups.length} `);
                const group = groups[i];
                await this.saveGroup(bookSavePosDir , group);
            }
        }

    }

    async saveGroup(storageDir , group){
        const groupStorageDir = new EcDirectory(`${storageDir.Uri()}${group.getSerNo()}`  , true);
        const client = new WebClient();
        let images = group.getWebImages();
        for(var i = 0 ; i < images.length;i++){
            let image = images[i];
            const saveTo = groupStorageDir.Uri() + image.getSerNo() + ".jpg";
            this.log(`Prepare save image from ${image.getUrl()} to [${saveTo}]  , progress : ${i+1} / ${images.length}`);
            await client.download(image.getUrl() , saveTo , true);
            await this.hold(1500);
            if(this.AppConfig().IsDev  && i >= 3) break;
        }
    }
}

module.exports.WebImageSaveProcessor = WebImageSaveProcessor;