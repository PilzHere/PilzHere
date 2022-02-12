// readme
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';

// webscraping
const axios = require("axios");
const cheerio = require("cheerio");

const articles = [];
let DATA;

async function scrapeData() {
    try {
        const url = "https://www.pilzhere.net/";
        // Fetch HTML of the page we want to scrape
        const { data } = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);

        // Select all the list items in plainlist class
        const listArticleTitles = $(".post-entry .entry-header");
        const listArticleLinks = $(".post-entry .entry-link");
        const listArticleDates = $(".post-entry .entry-footer");

        listArticleTitles.each((idx, el) => {
            const article = { name: "", link: "", publishDate: "" };
            article.name = $(el).children("h2").text();

            articles.push(article);
        });

        listArticleLinks.each((idx, el) => {
            const link = $(el).attr("href").toString();
            const modifiedLink = link.replace(/github.io/, "net");

            articles[idx].link = modifiedLink;
        });

        listArticleDates.each((idx, el) => {
            articles[idx].publishDate = $(el).children("span").text();
        });

        console.dir(articles);
    } catch (err) {
        console.log(err);
    }
}

function generateData() {
    /**
     * DATA is the object that contains all
     * the data to be provided to Mustache
     * Notice the "name" and "date" property.
     */
    DATA = {
        title: "Hey nerds :suspect:",
        info: "I enjoy coding games, apps, bots and I am constantly looking for a new challenge.",
        status: "\nI am currently studying as a Java/Javascript fullstack developer at EC Utbildning in Malmö, Sweden. :godmode:",
        website: "\nHere are the latest posts from [my website](http://www.pilzhere.net/)",
        webArticle1: `\n[${articles[0].name}](${articles[0].link})\t|\t`,
        webArticle2: `[${articles[1].name}](${articles[1].link})\t|\t`,
        webArticle3: `[${articles[2].name}](${articles[2].link})`,
        name: 'PilzHere',
        date: new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
            timeZone: 'Europe/Stockholm',
        }),
    };
}

/**
 * A - We open 'main.mustache'
 * B - We ask Mustache to render our file with the data
 * C - We create a README.md file with the generated output
 */
async function generateReadMe() {
    await scrapeData();

    generateData();

    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });

    console.log("Done.")
}

generateReadMe();
