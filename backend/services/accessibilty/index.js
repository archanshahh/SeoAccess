const check_accessibility = require('./check-accessibilty')
//  const url = 'https://www.dndstrategy.com/strategic-marketing-consulting/';
 const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    async callAccessbility(url){
        let len = await getTotalTags(url);
        let tally_report = await check_accessibility.doAudit(url,len);
        return tally_report;
    }
}

//callAccessbility(url);


//getting total html tags from webpage
function getTotalTags(url){
    return new Promise((resolve,reject)=>{
        axios.get(url)
            .then(response => {
                getData(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                console.log("Error in axios"+error);
            })
    
        let len;
        let getData = html => {
            const $ = cheerio.load(html);
            len = $('*').length;
    
            console.log(len);
            if(len>0){
                resolve(len)
            }
            else{
                reject("Error in finding tags!!!");
            }

        }
    
        
    });
}