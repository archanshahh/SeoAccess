const psi = require('psi');
const notifier = require('node-notifier');

module.exports = {
  checkPerformance: async function (url) {
    try {
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

      console.log('Performance Done!');

      return performanceObj;
    } catch (e) {
      console.log('Error in checking performance: '+e)
      notifier.notify('Error in checking performance of your website!\nMake sure your website has SSL certificate to get report!\nPlease try again later or Get in touch with us!');
    }


  }
}

//console.log(checkPerformance('https://www.partial.gallery/directory'));