'use strict'

const Basis = require("../../libs/ec/system/Basis").Basis;
const IndexScanner = require("../scan/mm18h/IndexScanner").IndexScanner;

class Scanner extends Basis {
    constructor(){
        super();
    }

    async start(procArgs){
        let scanTimes = 1;
        if(procArgs && procArgs.length >= 2) {
            try {
                scanTimes = Number(procArgs[1]);
            } catch(err){
                scanTimes = 1;
            }
        }
        this.log("Scan Times = " , scanTimes);

        for(let i = 1 ;i <= scanTimes;i++){
            this.log(`Start scan , times = ${i} / ${scanTimes}`);
            const scanner = new IndexScanner();
            await scanner.reloadRecorded();
            await scanner.scan('http://18h.mm-cg.com');
            await this.hold(3 * 1000);
        }
    }
}

module.exports.Scanner = Scanner;