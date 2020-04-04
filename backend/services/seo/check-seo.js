const fs = require('fs');
const https = require('https');
const checker = require('seo-checker-js');
const notifier = require('node-notifier');

let rule_custom1 = new checker.Rule('html').included('h1');

// merge all default rules
var default_rules = checker.mergeRules(
    checker.rule_h1_gt_1,
    checker.rule_img_without_alt,
    checker.rule_a_without_rel,
    checker.rule_head_has_title_and_meta,
    checker.rule_strong_gt_15,
    rule_custom1
);
module.exports = {
    checkSEO(url) {
        try {
            // get webpage content as readable stream
            https.get(url, (rs) => {
                // prepare writable stream for output file
                var ws = fs.createWriteStream('./seo-results.txt');
                checker.check(rs, default_rules, ws);
            });
            return true;
        }
        catch (error) {
            notifier.notify('Error in scanning your web page!\nPlease try again later or Get in touch with us!');
            console.log("Error in check-seo: " + error);
        }

    }
}




// read from file
// fs.readFile('result.txt','utf8', (err,data) => {
//   if(err){
//     console.log(err)
//   }
//   console.log(data);
// })