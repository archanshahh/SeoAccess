const express = require('express');
const router = express.Router();
const checkSEO = require('./../services/seo/index');

let Seo_report = require('../models/seo_report.model');
let seo_report;




router.route('/url').post((req,res)=>{
    try{
 const url=req.body.url;
 callSEO(url);
 console.log("backend"+url)
 res.send("got it from seo also")

 
    }
    catch(err)
    {
        res.send(err)
    }

})




// async function callSEO(url){
//     seo_report = await checkSEO.doAudit(url);
//     console.log(seo_report);
// }
router.post('/getByUrl', async (req, res) => {
    try {
        console.log("inside")
      const data = await Seo_report.find({
         url: req.body.url});
      if (!data) {
        return res.status(404).send('SEO url  not found');
      }
      res.send(data);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
router.route('/').get((req,res)=>{
    Seo_report.find({})
        .then(seo_reports => res.json(seo_reports))
        .catch(err=> res.status(400).json('Error: '+err))
});
async function callSEO(url){
    await checkSEO.doAudit(url).then((seo_report)=>{
router.route('/add').post((req,res)=>{
    console.log(seo_report);
    const url = seo_report.url;
   
    const summary = {
        errors: seo_report.summary.errors,
        total_rules: seo_report.summary.total_rules
    };
    var arr = Array();
    for(var i=0;i<seo_report.seo_results.length;i++){
        arr.push(seo_report.seo_results[i]);
    }

    const seo_results = arr;

    const performance_results= {
        FCP: seo_report.performance_results.FCP,
        FCI: seo_report.performance_results.FCI,
        FMP: seo_report.performance_results.FMP,
        SI: seo_report.performance_results.SI,
        TTI: seo_report.performance_results.TTI
    };

    const score = seo_report.score;

    const nSeo = new Seo_report({
        url,
        summary,
        seo_results,
        performance_results,
        score
    });

    nSeo.save()
        .then(()=> res.json('Seo report added'))
        .catch((err)=> res.status(400).json('Error: '+err));
});
    });
}

module.exports = router;