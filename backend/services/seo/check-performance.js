const psi = require('psi');
//const url = 'https://www.partial.gallery/directory';

module.exports = {
  checkPerformance: async function (url) {

    // Supply options to PSI and get back speed
    const data2 = await psi(url, {
      nokey: 'true',
      strategy: 'desktop',
    });
    console.log('Speed score:', data2.data.lighthouseResult.categories.performance.score);
    const outp = data2.data.lighthouseResult.audits;
  
    //display json output in console
  
    let performanceObj = {
      FCP: outp.metrics.details.items[0].firstContentfulPaint,
      SI: outp.metrics.details.items[0].speedIndex,
      FMP: outp.metrics.details.items[0].firstMeaningfulPaint,
      FCI: outp.metrics.details.items[0].firstCPUIdle,
      TTI: outp.metrics.details.items[0].interactive
    }
    // data3 = JSON.stringify(outp,null,2)
    // console.log('First Contentful Paint: '+outp.metrics.details.items[0].firstContentfulPaint);
    // console.log('Speed Index: '+outp.metrics.details.items[0].speedIndex);
    // console.log('First Meaningful Paint: '+outp.metrics.details.items[0].firstMeaningfulPaint);
    // console.log('First CPU Idle: '+outp.metrics.details.items[0].firstCPUIdle);
    // console.log('Time to Interactive: '+outp.metrics.details.items[0].interactive);
  
    console.log('Performance Done!');
  
    return performanceObj;
  
  }
}

//console.log(checkPerformance('https://www.partial.gallery/directory'));