'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;

const EcDirectory = require("../../../libs/ec/common/EcDirectory").EcDirectory;
const WebClient = require("../../../libs/ec/net/WebClient").WebClient;
const WorkSpace = require("../env/WorkSpace").WorkSpace;
class WebImageSaveProcessor extends  Basis {

    constructor(){
        super();
    }

    async save(webBook , histroryRecordProcessor){
        const bookSavePosDir = new EcDirectory(`${WorkSpace.target.getStorageDirectory().Uri()}${webBook.getDomain()}/${webBook.getName()}`  , true);
        const groups = webBook.getGroups();
        if(groups){
            for(var i = 0 ;i < groups.length;i++){
                const group = groups[i];
                if(group.getWebImages()) {
                    this.log(`Save book[${webBook.getName()}] group : ${i+1} / ${groups.length} `);
                    let retryImages = null;
                    for(var tryCount = 0 ; tryCount < 10;tryCount++){
                        retryImages = await this.saveGroup(bookSavePosDir , group , retryImages);
                        if(retryImages.length > 0){
                            this.log(`Notice (${retryImages.length}) retry images , start retry : ${tryCount + 1} / 10`);
                        } else {
                            break;
                        }
                    }
                    if(retryImages.length == 0){
                        if( WorkSpace.target.isEnableWriteHistory()) 
                            await histroryRecordProcessor.recordDownloadGroup(webBook , group);
                    }
                } else {
                    this.log(`Book[${webBook.getName()}] group : ${i+1} / ${groups.length} has no images , skip it!!`);
                }
                if(this.AppConfig().IsDev) break;
            }
        } else {
            this.log("Web book has no group to save , skip it!!");
        }

    }

    async saveGroup(storageDir , group , targetImages){
        const groupStorageDir = new EcDirectory(`${storageDir.Uri()}${group.getSerNo()}`  , true);
        const client = new WebClient();
        let images = targetImages ? targetImages : group.getWebImages();
        const retryImages = [];
        for(var i = 0 ; i < images.length;i++){
            let image = images[i];
            const saveTo = groupStorageDir.Uri() + image.getSerNo() + ".jpg";
            this.log(`Prepare save image from ${image.getUrl()} to [${saveTo}]  , progress : ${i+1} / ${images.length}`);
            try {
                await client.download(image.getUrl() , saveTo , true);
            } catch(err){
                if(err == WebClient.ConnectError.TIME_OUT || err == WebClient.ConnectError.OTHERS) {
                    retryImages.push(image);
                } else {
                    this.log("Download Fail end group , error = " , err);
                    break;
                }
            }
            await this.hold(1500);
            if(this.AppConfig().IsDev  && i >= 3) break;
        }
        return retryImages;
    }
}

module.exports.WebImageSaveProcessor = WebImageSaveProcessor;