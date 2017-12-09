"use strict";
/**
 * Dev-Dependencies
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const jsonfile = require('jsonfile');


class Crawler {

    constructor() {
        this.html = this.retrieveHtml()
        this.$ = this.parseHtmlToCheerio(this.html)
        this.parsedPlan = this.parsePlan(this.$)
        this.benefits = this.parsePlanBenefits(this.$)
    }

    /**
     * Get html contents from assets directory
     * 
     * @return html source content
     */
    retrieveHtml() {
        const html = fs.readFileSync('./assets/plano.html', 'utf-8')
        return html
    }

    /**
     * Get source html and parse to cheerio,
     * to manipulate the html using jquery functions
     * 
     * @param {*} html
     * @return html parsed to cheerio
     */
    parseHtmlToCheerio(html) {
        const $ = cheerio.load(html)
        return $
    }

    /**
     * Parse the html, and return plan parsed
     * 
     * @param {*} $
     * @return json formatted plan
     */
    parsePlan($) {
        const planInformationParsed = this.parsePlanInformation(this.$)
        const planBenefitsParsed = this.parsePlanBenefits(this.$)

        return {
            ...planInformationParsed,
            benefits: planBenefitsParsed
        }
    }

    /**
     * Loop the list and parse the data using regex
     * 
     * @param {*} $ 
     * @return formatted JSON
     */
    parsePlanInformation($) {
        let plan = {
        }

        $('.notMobile').find('ul').first().each((i, element) => {
            let item = $(element).text().trim()
            plan.Internet = /[0-9]+GB/ig.exec(item)[0]
            plan.Minutes = /ilimitado/ig.test(item) ? -1 : /[0-9]+minutos/ig.exec(item)[0]
        })
        plan.Price = $('#planPrice').val();
        plan.Name = $('title').text();

        return plan;
    }

    /**
     * Loop benefits list and parse data using regex
     * 
     * @param {*} $ 
     * @return array with all benefits
     */
    parsePlanBenefits($) {

        let benefits = [];

        $('.notMobile').find('ul').last().each((i, element) => {
            const item = $(element).children().each((i, li) => {
                benefits = [$(li).text(), ...benefits];
            });
        })

        return benefits
    }

    /**
     * Generate a json file with the plan information at the root folder
     */
    saveExtractedInfo(){
        let plan = this.parsedPlan;
        plan.benefits = this.benefits;
        jsonfile.writeFile(`./plan_information.json`, plan, function (err){
            if(err)
                console.error('Error in sasving file: ', err);
        });
    }

}

module.exports = Crawler;