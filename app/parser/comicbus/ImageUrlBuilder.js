'use strict'

const Basis = require("../../../libs/ec/system/Basis").Basis;

class ImageUrlBuilder extends Basis{

    bookCode = null;
    calcurateArgs = null;
    encryptText = null;

    constructor(bookCode , encryptText , calcurateArgs ){
        super();
        this.bookCode = bookCode;
        this.calcurateArgs = calcurateArgs;
        this.encryptText = encryptText;
    }

    calcurate(groupSerno , pageNo){
        const y = 46;
        const ch = groupSerno;
        const p = pageNo;
        let cs = this.encryptText;
        let ci = 0; 
        let ps = 0;    
        let ti = this.bookCode; 
        for (var i = 0; i < 64; i++) { 
            var value1 = this.lc(this.su(cs, i * y + Number(this.calcurateArgs[0].arg1), Number(this.calcurateArgs[0].arg2))); 
            var value2 = this.lc(this.su(cs, i * y + Number(this.calcurateArgs[1].arg1), Number(this.calcurateArgs[1].arg2))); 
            var value3 = this.lc(this.su(cs, i * y + Number(this.calcurateArgs[2].arg1), Number(this.calcurateArgs[2].arg2))); 
            var value4 = this.lc(this.su(cs, i * y + Number(this.calcurateArgs[3].arg1), Number(this.calcurateArgs[3].arg2))); 
            ps = value4; 
            if (value3 == ch) { 
                ci = i; 
                const url = 'https://img' + this.su(value1, 0, 1) + '.8comic.com/' + this.su(value2, 1, 1) + '/' + ti + '/' + value3 + '/' + this.nn(p) + '_' + this.su(value4, this.mm(p), 3) + '.jpg'; 
                return url;
            }
        }
        
    }


    lc(l){
        if(l.length!=2 ) return l;
        var az="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var a=l.substring(0,1);var b=l.substring(1,2);
        if(a=="Z") return 8000+az.indexOf(b);
        else return az.indexOf(a)*52+az.indexOf(b);
    }

    su(a,b,c){
        var e=(a+'').substring(b,b+c);return (e);
    }

    mm(p){return (parseInt((p-1)/10)%10)+(((p-1)%10)*3)};
    nn(n){return n<10?'00'+n:n<100?'0'+n:n;}
}

module.exports.ImageUrlBuilder = ImageUrlBuilder;