const { Ta11y } = require('@ta11y/core')
const Set = require('set');
//const fs = require('fs')
const ta11y = new Ta11y()
//const url = 'https://worlds-highest-website.com/';


module.exports = {

    doAudit(url,numOfTags) {
        return new Promise((resolve, reject) => {
            ta11y.audit(url,{
                suites: []
            })
                .then((output) => {

                    //fetch url
                    var keys = [];
                    for (var k in output.results) keys.push(k);
                    const newURL = keys[0];

                    let l = output.results[newURL].rules.length;

                    var arr = new Set();

                    for (var i = 0; i < l; i++) {
                        //write type code

                        // eslint-disable-next-line no-new-object
                        const result = new Object({
                            type: output.results[newURL].rules[i].type,
                            impact: output.results[newURL].rules[i].impact,
                            description: output.results[newURL].rules[i].description,
                            helpURL: output.results[newURL].rules[i].helpURL
                        })
                        arr.add(result);
                    }
                    // let setOfResult = new Set(arr);
                    //console.log(arr.get());
                    let newArr = arr.get();
                    //console.log(JSON.parse(newArr[0]));
                    // eslint-disable-next-line no-array-constructor
                    arr = new Array();
                    newArr.forEach(element => {
                        arr.push(JSON.parse(element));
                    });
                   
                    //calculating score
                    let numOferrors = output.summary.errors;
                    
                    let temp = (numOferrors*100)/numOfTags;
                    let tempScore = 100-temp;


                    // eslint-disable-next-line no-new-object
                    let tally_report = new Object({
                        url: url,
                        summary: {
                            errors: output.summary.errors,
                            warnings: output.summary.warnings,
                            total_tags: numOfTags
                        },
                        results: arr,
                        score: Math.round(tempScore)
                    });
                    if (tally_report) {
                        console.log(tally_report);
                        resolve(tally_report)
                    } else {
                        reject('Error!!!');
                    }

                })
                .catch((error)=>{
                    console.log("Error: "+error);
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