const Crawler = require('./classes/crawler')
const _crawler = new Crawler();
const parsedPlan = _crawler.parsedPlan;

console.log('\x1b[36m%s\x1b[0m\x1b[4m', `Saving File at ${__dirname}\plan_information.json`);
_crawler.saveExtractedInfo();

console.log('\x1b[33m%s\x1b[0m', 'Plan Information:'); 
console.log( "\x1b[44m", parsedPlan);
console.log("\x1b[0m");