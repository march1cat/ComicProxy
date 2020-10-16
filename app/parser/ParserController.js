'use strict'
const Basis = require("../../libs/ec/system/Basis").Basis;
const StringTool = require("../../libs/ec/common/StringTool").StringTool;

class ParserController  extends Basis {

    domains = [
        {
            reg : "https://18h.mm-cg.com/18H_.*?.html" ,
            Book : require("./mm18h/Book").Book
        } , 
        {
            reg : "https://(www.){0,1}comicbus.com/html/.*?.html" ,
            Book : require("./comicbus/Book").Book
        }
    ]

    stringTool = new StringTool();

    constructor(){
        super();
    }

    generateWebBook(downloadUrl){
        let matchDomain = this.domains.find( domain => this.stringTool.regValidate(domain.reg , downloadUrl) );
        if(matchDomain){
            if(matchDomain.Book.build) {
                let webBook =  matchDomain.Book.build(downloadUrl);
                this.log(`Notice match domain ,  ${webBook.getDomain()} , build web book!!`);
                return webBook;
            } else {
                this.log(`Domain book match '${downloadUrl}'  has no build method!!`);
            }
        } else {
            this.log("No match domain found for url = " , downloadUrl);
        }
    }
}


module.exports.ParserController = ParserController;