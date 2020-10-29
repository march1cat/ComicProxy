'use strict'

const Basis = require("../../libs/ec/system/Basis").Basis;
const WebIndexProcessor = require("../core/processor/WebIndexProcessor").WebIndexProcessor;
const PackageZipProcessor = require("../core/processor/PackageZipProcessor").PackageZipProcessor;

class IndexZipper extends Basis {

    constructor(){super();}

    async start(indexID){
        this.log("Start Zip Pack Index id = " + indexID);
        const indexProcessor = new WebIndexProcessor();
        const webIndex = await indexProcessor.buildIndexByID(indexID);
        if(webIndex) {
            this.log("Start zip pack WebIndex = " , webIndex);
            const zipPacker = new PackageZipProcessor();
            await zipPacker.pack(webIndex);
            this.log(`Pack WebIndex[${indexID}] done!!`);
        } else {
            this.log(`IndexID[${indexID}] not found!!`);
        }
    }
}

module.exports.IndexZipper = IndexZipper;