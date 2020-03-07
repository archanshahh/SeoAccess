

const { Ta11y } = require('@ta11y/core')
//const fs = require('fs')
const ta11y = new Ta11y()
//const url = 'https://worlds-highest-website.com/';


module.exports = {

    doAudit(url) {
        return new Promise((resolve, reject) => {
            ta11y.audit(url)
                .then((output) => {
                    var arr = Array();

                    //fetch url
                    var keys = [];
                    for (var k in output.results) keys.push(k);
                    const newURL = keys[0];

                    let l = output.results[newURL].rules.length;


                    for (var i = 0; i < l; i++) {
                        //write type code

                        const result = new Object({
                            type: output.results[newURL].rules[i].type,
                            impact: output.results[newURL].rules[i].impact,
                            description: output.results[newURL].rules[i].description,
                            helpURL: output.results[newURL].rules[i].helpURL
                        })
                        arr.push(result);
                    }

                    let tally_report = new Object({
                        url: url,
                        summary: {
                            errors: output.summary.errors,
                            warnings: output.summary.warnings,
                            total_tags: 100
                        },
                        results: arr,
                        score: 75
                    });
                    if (tally_report) {
                        resolve(tally_report)
                    } else {
                        reject('Error!!!');
                    }

                })
        });
    }
}














//   data = JSON.stringify(result, null, 2)
                //   //console.log(result.summary.errors)
                //   let myData = JSON.parse(data);
                //   fs.writeFile('data.json',data,function (err)
                //   {
                //       if(err) throw err;
                //       console.log("Data Added");
                //       //console.log(myData.results["https://www.tutorialspoint.com/mongodb/mongodb_overview.htm"].rules[0]["description"]);
                //     })

