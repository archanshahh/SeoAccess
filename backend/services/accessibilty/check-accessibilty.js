const { Ta11y } = require('@ta11y/core')
const Set = require('set');
//const fs = require('fs')
const ta11y = new Ta11y()
//const url = 'https://worlds-highest-website.com/';


module.exports = {

    doAudit(url, numOfTags) {
        return new Promise((resolve, reject) => {
            ta11y.audit(url, {
                suites: []
            })
                .then((output) => {

                    //fetch url
                    var keys = [];
                    for (var k in output.results) keys.push(k);
                    const newURL = keys[0];

                    let l = output.results[newURL].rules.length;
                    // console.log('Length of AODA results: '+l);
                    var serious_arr = new Set();
                    var minor_arr = new Set();
                    var moderate_arr = new Set();
                    var critical_arr = new Set();
                    var others_arr = new Set();

                    for (var i = 0; i < l; i++) {
                        //write type code

                        // eslint-disable-next-line no-new-object

                        const result = new Object({
                            type: output.results[newURL].rules[i].type,
                            impact: output.results[newURL].rules[i].impact,
                            description: output.results[newURL].rules[i].description,
                            helpURL: output.results[newURL].rules[i].helpURL
                        })
                        if(output.results[newURL].rules[i].impact == "serious"){
                            serious_arr.add(result);
                        }else if(output.results[newURL].rules[i].impact == "moderate"){
                            moderate_arr.add(result);
                        }else if(output.results[newURL].rules[i].impact == "critical"){
                            critical_arr.add(result);
                        }else if(output.results[newURL].rules[i].impact == "minor"){
                            minor_arr.add(result);
                        }else{
                            others_arr.add(result);
                        }
                    }

                    let newArr = serious_arr.get();
                    // eslint-disable-next-line no-array-constructor
                    serious_arr = new Array();
                    newArr.forEach(element => {
                        serious_arr.push(JSON.parse(element));
                    });

                    newArr = moderate_arr.get();
                    // eslint-disable-next-line no-array-constructor
                    moderate_arr = new Array();
                    newArr.forEach(element => {
                        moderate_arr.push(JSON.parse(element));
                    });

                    newArr = minor_arr.get();
                    // eslint-disable-next-line no-array-constructor
                    minor_arr = new Array();
                    newArr.forEach(element => {
                        minor_arr.push(JSON.parse(element));
                    });
                    
                    newArr = critical_arr.get();
                    // eslint-disable-next-line no-array-constructor
                    critical_arr = new Array();
                    newArr.forEach(element => {
                        critical_arr.push(JSON.parse(element));
                    });

                    newArr = others_arr.get();
                    // eslint-disable-next-line no-array-constructor
                    others_arr = new Array();
                    newArr.forEach(element => {
                        others_arr.push(JSON.parse(element));
                    });


                    //calculating score
                    let numOferrors = output.summary.errors;

                    let temp = (numOferrors * 100) / numOfTags;
                    let tempScore = 100 - temp;


                    // eslint-disable-next-line no-new-object
                    let tally_report = new Object({
                        url: url,
                        summary: {
                            errors: output.summary.errors,
                            warnings: output.summary.warnings,
                            total_tags: numOfTags
                        },
                        // results: arr,
                        serious_impact_result: serious_arr,
                        minor_impact_result: minor_arr,
                        moderate_impact_result: moderate_arr,
                        critical_impact_result: critical_arr,
                        others_impact_result: others_arr,
                        score: Math.round(tempScore)
                    });
                    if (tally_report) {
                        console.log(tally_report);
                        resolve(tally_report)
                    } else {
                        reject('Error!!!');
                    }

                })
                .catch((error) => {
                    console.log("Error in check-accessibility: " + error);
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