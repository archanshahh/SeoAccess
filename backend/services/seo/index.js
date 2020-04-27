const check_seo = require('./check-seo');
const check_performance = require('./check-performance');
const fs = require('fs');
const split = require('string-split-by');
let seo_report;
var arrOfSEOResult, perf_result;
const notifier = require('node-notifier');

//checking performance
function checkPerformance(url) {
    return new Promise((resolve, reject) => {
        console.log("Starting Performance");
        check_performance.checkPerformance(url).then((result) => {
            perf_result = result
            //console.log(perf_result)
            if (perf_result) {
                resolve(perf_result)
            }
            else {
                reject("Error in checking performance");
            }
        });
    });
}

//Checking seo compliance
function checkSEOCompliance(url) {
    return new Promise((resolve, reject) => {
        console.log("Starting SEO");
        let response = check_seo.checkSEO(url);
        if (response) {
            console.log("SEO Done!");
            resolve(response);
        } else {
            reject(response);
        }
    });
}



//let total_rules;
function createReportObject(url) {
    console.log("createReportObject");
    //creating report object with all the values
    seo_report = {
        url: url,
        summary: {
            errors: arrOfSEOResult.length,
            total_rules: 6,
        },
        seo_results: arrOfSEOResult,
        performance_results: perf_result,
        score: Math.round(100 - ((arrOfSEOResult.length * 100) / 6))
    }
    // console.log('Array of SEO Result: '+arrOfSEOResult);
    return seo_report;
}

module.exports = {
    async doAudit(url) {
        try {
            let seo_result = await checkSEOCompliance(url);
            let perf_result = await checkPerformance(url);
            console.log('Writing finished!');


            if (seo_result) {
                console.log(seo_result);
                let readSEO = new Promise((resolve, reject) => {
                    console.log("reading started");
                    fs.readFile('./seo-results.txt', (err, data) => {
                        if (err) {
                            console.log(err);
                        };
                        arrOfSEOResult = split(String(data), '\n');
                        arrOfSEOResult.splice(-1, 1);
                        removeFile();
                        console.log(arrOfSEOResult);
                        if (arrOfSEOResult != null) {
                            resolve(true);
                        } else {
                            reject(false);
                        }
                    })
                });


                let a3 = await readSEO;
                if (perf_result && a3) {
                    //console.log(perf_result);
                    seo_report = createReportObject(url);
                    //console.log(seo_report);
                    return seo_report;
                    
                }
                else{
                    notifier.notify('Error in generating SEO report!\nPlease try again later or Get in touch with us!');
                }
            }
        } catch (error) {
            notifier.notify('Error in generating SEO report!\nPlease try again later or Get in touch with us!');
            console.log('Error in seo/index.js: '+error);
        }

    }
}


// module.exports = {
//     async callSEO(url) {
//         await doAudit(url).then(() => {
//             console.log("Success!");
//             return seo_report;

//         }).catch(() => {
//             console.log("Error Occcured")
//         });
//     }

// }


//remove seo-results.txt as we dont need it after reading
function removeFile() {
    fs.unlink('./seo-results.txt', function (err) {
        if (err && err.code === 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`Removed`);
        }
    });
}