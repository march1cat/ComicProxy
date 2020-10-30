'use strict'

const Basis = require("../../libs/ec/system/Basis").Basis;

class AppHelper extends Basis {

    constructor() {super();}

    start(){
        const supports = [
            {
                WebSite : 'https://18h.mm-cg.com/' , 
                Sample : 'https://18h.mm-cg.com/18H_5086.html'
            } ,
            {
                WebSite : 'https://comicbus.com' , 
                Sample : 'https://comicbus.com/html/6997.html'
            }
        ];
        supports.forEach(support => this.log("Support Target" , support))
    }
}

module.exports.AppHelper = AppHelper;