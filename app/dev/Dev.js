'use strict'
const StringTool = require("../../libs/ec/common/StringTool").StringTool;
const WebClient = require("../../libs/ec/net/WebClient").WebClient;

class Dev {
    strTool = new StringTool();

    async test(){
        let url = "https://comicbus.live/online/a-6997.html?ch=5";
        let client = new WebClient();
        let body = await client.getBody(url , true);

        let reg = "ge\\('TheImg'\\).src='\\/\\/img'\\+su\\((.*?), 0, 1\\)\\+'.8comic.com\\/'\\+su\\((.*?),1,1\\)\\+'/'\\+ti\\+'/'\\+(.*?)\\+'/'\\+ nn\\(p\\)\\+'_'\\+su\\((.*?),mm\\(p\\),3\\)\\+'.jpg'";
        //const ismatch = this.strTool.regValidate(reg , text);
        //console.log("ismatch = " , ismatch);

        //console.log("body = " , body);
        const ar = body.split("\r\n");
        ar.map(a => {
            const ismatch = this.strTool.regValidate(reg , a);
            if(ismatch) {
                const subAr = a.split(";");
                subAr.forEach(element => {
                    console.log("match 1 = " , element);
                    const ismatch2 = this.strTool.regValidate(reg , element);
                    if(ismatch2){
                        const datas = this.strTool.regSearch(reg , element);
                        console.log("data = " , datas);
                    }

                    let reg2 = "if\\((.*?)== ch\\)\\{ci=i";
                    const ismatch3 = this.strTool.regValidate(reg2 , element);
                    if(ismatch3){
                        const datas = this.strTool.regSearch(reg2 , element);
                        console.log("data = " , datas);
                    }

                });
            }
        }) 
    }


    async test2(){
        let url = "https://comicbus.live/online/a-6997.html?ch=5";
        let client = new WebClient();
        let body = await client.getBody(url , true);

        let text = `if(pcrjs== ch){ci=i;ge('TheImg').src='//img'+su(vcvab, 0, 1)+'.8comic.com/'+su(vcvab,1,1)+'/'+ti+'/'+pcrjs+'/'+ nn(p)+'_'+su(avfha,mm(p),3)+'.jpg';pi=ci>0?lc(su(cs,ci*y-y+40,2)):ch;`;
        let reg = "if\\((.*?)== ch\\)\\{ci=i;ge\\('TheImg'\\).src='\\/\\/img'\\+su\\((.*?), 0, 1\\)\\+'.8comic.com\\/'\\+su\\((.*?),1,1\\)\\+'/'\\+ti\\+'/'\\+(.*?)\\+'/'\\+ nn\\(p\\)\\+'_'\\+su\\((.*?),mm\\(p\\),3\\)\\+'.jpg'";
        //const ismatch = this.strTool.regValidate(reg , text);
        //console.log("ismatch = " , ismatch);

        //console.log("body = " , body);
        const ar = body.split("\r\n");
        ar.map(a => {
            const ismatch = this.strTool.regValidate(reg , a);
            if(ismatch) {
                const subAr = a.split(";");
                subAr.forEach(element => {
                    console.log("match 1 = " , element);
                    const ismatch2 = this.strTool.regValidate(reg , element);
                    if(ismatch2){
                        const datas = this.strTool.regSearch(reg , element);
                        console.log("data = " , datas);
                    }
                });
            }
        }) 
    }
    async test1(){
        let url = "https://comicbus.live/online/a-6997.html?ch=5";
        let client = new WebClient();
        let body = await client.getBody(url , true);
        let reg = "var (.*?)=.*?lc\\(su\\(cs,i\\*y\\+([0-9]*?),([0-9]*?)\\)\\)";
        const ar = body.split("\r\n");
        let calcurateOption = {};
        ar.map(a => {
            const ismatch = this.strTool.regValidate(reg , a);
            if(ismatch) {
                const subAr = a.split(";");
                subAr.forEach(element => {
                    const ismatch2 = this.strTool.regValidate(reg , element);
                    if(ismatch2){
                        const datas = this.strTool.regSearch(reg , element);
                        console.log("data = " , datas);
                        calcurateOption[datas[1]] = {
                            para1 : datas[2] , 
                            para2 : datas[3] , 
                        }
                    }
                    
                });
            }

            
               
        }) 
        console.log("calcurateOption = " , calcurateOption);
        
        
        
    }
}

module.exports.Dev = Dev;