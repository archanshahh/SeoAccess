const express = require('express');
const router = express.Router();
const check_accessibility = require('./../services/accessibilty/index');

//let url = 'https://worlds-highest-website.com/';


router.route('/url').post((req,res)=>{
    try{
 const url=req.body.url;
//  console.log("backend"+url)
 res.send("got it from tally")
 callAcc(url);
    }
    catch(err)
    {
        res.send(err)
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
            var arr = Array();

            //arr.push()
            for (var i = 0; i < tally_report.results.length; i++) {
                const result = new Object({
                    type: tally_report.results[i].type,
                    impact: tally_report.results[i].impact,
                    description: tally_report.results[i].description,
                    helpURL: tally_report.results[i].helpURL
                })
                arr.push(result);
            }
            const results = arr;

            const score = tally_report.score;

            const nTally = new Tally_report({
                url,
                summary,
                results,
                score
            });

            nTally.save()
                // .then(() => {
                //     res.json('Tally report added');
                // })
                // .catch((err) => console.log(err));
        // });
    }).catch((e)=>{
        console.error(e);
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
         url: req.body.location});
      if (!data) {
        return res.status(404).send('tally url not  found');
      }
      res.send(data);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });



module.exports = router;