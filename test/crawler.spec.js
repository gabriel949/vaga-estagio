const Crawler = require("../classes/crawler.js");

describe("Crawler", function () {
    
    it("Should return a object", function () {
        let crawler = new Crawler();
        const html = crawler.retrieveHtml()
        const $ = crawler.parseHtmlToCheerio(html)
        const plan = crawler.parsePlanInformation($);
        expect(plan).not.toBeNull();
    });

    it("Shuld instance a Crawler object", function () {
        let crawler = new Crawler();
        expect(crawler).not.toBeUndefined();
    })

    it("Should get html object", function (){
        let crawler = new Crawler();
        const html = crawler.retrieveHtml()
        expect(html).not.toBeNull();
    })

    it("Should get the parsedHtmlToCheerio", function (){
        let crawler = new Crawler();
        const html = crawler.retrieveHtml()
        const $ = crawler.parseHtmlToCheerio(html)
        expect($).not.toBeNull();
    })
});