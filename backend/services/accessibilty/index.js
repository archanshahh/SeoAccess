const check_accessibility = require('./check-accessibilty')
// const url = 'https://worlds-highest-website.com/';

module.exports = {
    async callAccessbility(url){
        let tally_report = await check_accessibility.doAudit(url);
        return tally_report;
    }
}
//

    
    