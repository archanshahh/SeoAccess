const fs = require('fs');
const https = require('https');
const checker = require('seo-checker-js');
const notifier = require('node-notifier');

let rule_custom1 = new checker.Rule('html').included('h1');
let rule_custom2 = new checker.Rule('html').included('meta', 'name', 'description');
let rule_custom3 = new checker.Rule('html').included('meta', 'name', 'keywords');
let rule_custom4 = new checker.Rule('html').included('title');
// let rule_custom2 = new checker.Rule('html').included('');
// merge all default rules
var default_rules = checker.mergeRules(
    // checker.rule_h1_gt_1,
    checker.rule_img_without_alt,
    checker.rule_a_without_rel,
    // checker.rule_head_has_title_and_meta,
    checker.rule_strong_gt_15,
    rule_custom1,
    rule_custom2,
    rule_custom3,
    rule_custom4
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
