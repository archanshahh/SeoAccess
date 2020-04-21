const express = require('express');
const router = express.Router();
const check_accessibility = require('./../services/accessibilty/index');

//let url = 'https://worlds-highest-website.com/';


router.route('/url').post((req, res) => {
    try {
        const url = req.body.url;
        //  console.log("backend"+url)
        res.send("got it from tally")
        callAcc(url);
    }
    catch (err) {
        res.send("Error " + err)
    }

})


async function callAcc(url) {
    await check_accessibility.callAccessbility(url).then((tally_report) => {
        // router.route('/add').post((req, res) => {
        //const errors = req.body.summary.errors;
        //  console.log(tally_report);
        const url = tally_report.url;
        const summary = {
            errors: tally_report.summary.errors,
            warnings: tally_report.summary.warnings,
            total_tags: tally_report.summary.total_tags
        };
        // // eslint-disable-next-line no-array-constructor
        // var serious_arr,critical_arr,moderate_arr,minor_arr,others_arr = Array();

        // serious_arr = tally_report.serious_impact_result;
        //arr.push()
        // for (var i = 0; i < tally_report.serious_impact_result; i++) {
        //     // eslint-disable-next-line no-new-object
        //     const result = new Object({
        //         type: tally_report.results[i].type,
        //         impact: tally_report.results[i].impact,
        //         description: tally_report.results[i].description,
        //         helpURL: tally_report.results[i].helpURL
        //     })
        //     arr.push(result);
        // }
        // const results = arr;

        const serious_impact_result=tally_report.serious_impact_result;
        const moderate_impact_result=tally_report.moderate_impact_result;
        const critical_impact_result=tally_report.critical_impact_result;
        const minor_impact_result=tally_report.minor_impact_result;
        const others_impact_result=tally_report.others_impact_result;

        const score = tally_report.score;

        const nTally = new Tally_report({
            url,
            summary,
            serious_impact_result,
            moderate_impact_result,
            critical_impact_result,
            minor_impact_result,
            others_impact_result,
            score
        });

        nTally.save()
        // .then(() => {
        //     res.json('Tally report added');
        // })
        // .catch((err) => console.log(err));
        // });
    }).catch((e) => {
        console.error("Error in routes/tally_reports: "+e);
    });
    //return tally_report;
}



let Tally_report = require('../models/tally_report.model');

router.route('/').get((req, res) => {
    Tally_report.find()
        .then(tally_reports => res.json(tally_reports))
        .catch(err => res.status(400).json('Error: ' + err))
});
router.post('/getByUrl', async (req, res) => {
    try {
        // console.log("inside")
        // console.log(req.body.location);
        const data = await Tally_report.find({
            url: req.body.location
        });
        if (!data) {
            return res.status(404).send('tally url not  found');
        }
        res.send(data);
    } catch (err) {
        res.status(500).send('Server error');
    }
});



module.exports = router;