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
        const {data} = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);

        // Select all the list items in plainlist class
        const listArticleTitles = $(".post-entry .entry-header");
        const listArticleLinks = $(".post-entry .entry-link");
        const listArticleDates = $(".post-entry .entry-footer");

        listArticleTitles.each((idx, el) => {
            const article = {name: "", link: "", publishDate: ""};
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

    /** Badges from:
     * https://github.com/alexandresanlim/Badges4-README.md-Profile#how-to-use
     */

    DATA = {
        title: "Hey nerds :suspect:",
        info: "I enjoy coding games, apps, bots and I am constantly looking for a new challenge.",
        status: "\nCurrently I am studying to become a Java/Javascript fullstack developer at EC Utbildning in Malmö, Sweden. :godmode:",
        badges: "\n![](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white) ![](\thttps://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white) ![](https://img.shields.io/badge/Heroku-430098?style=flat-square&logo=heroku&logoColor=white) ![](https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariadb&logoColor=white) ![](https://img.shields.io/badge/Bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white) ![](\thttps://img.shields.io/badge/CMake-064F8C?style=flat-square&logo=cmake&logoColor=white) ![](\thttps://img.shields.io/badge/gradle-02303A?style=flat-square&logo=gradle&logoColor=white) ![](https://img.shields.io/badge/Junit5-25A162?style=flat-square&logo=junit5&logoColor=white) ![](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white) ![](https://img.shields.io/badge/Markdown-000000?style=flat-square&logo=markdown&logoColor=white) ![](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![](https://img.shields.io/badge/Material%20UI-007FFF?style=flat-square&logo=mui&logoColor=white) ![](https://img.shields.io/badge/next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) ![](https://img.shields.io/badge/NuGet-004880?style=flat-square&logo=nuget&logoColor=white) ![](https://img.shields.io/badge/OpenGL-FFFFFF?style=flat-square&logo=opengl) ![](\thttps://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![](\thttps://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) ![](https://img.shields.io/badge/Redux-593D88?style=flat-square&logo=redux&logoColor=white) ![](\thttps://img.shields.io/badge/Shell_Script-121011?style=flat-square&logo=gnu-bash&logoColor=white) ![](\thttps://img.shields.io/badge/Spring_Boot-F2F4F9?style=flat-square&logo=spring-boot) ![](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=Swagger&logoColor=white) ![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![](\thttps://img.shields.io/badge/ThreeJs-black?style=flat-square&logo=three.js&logoColor=white) ![](https://img.shields.io/badge/Unity-100000?style=flat-square&logo=unity&logoColor=white) ![](https://img.shields.io/badge/-Unreal%20Engine-313131?style=flat-square&logo=unreal-engine&logoColor=white) ![](https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white) ![](https://img.shields.io/badge/Xampp-F37623?style=flat-square&logo=xampp&logoColor=white) ![](https://img.shields.io/badge/Bitbucket-0747a6?style=flat-square&logo=bitbucket&logoColor=white) ![](\thttps://img.shields.io/badge/Itch.io-FA5C5C?style=flat-square&logo=itchdotio&logoColor=white) ![](https://img.shields.io/badge/Steam-000000?style=flat-square&logo=steam&logoColor=white) ![](\thttps://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white) ![](\thttps://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=slack&logoColor=white) ![](https://img.shields.io/badge/Android_Studio-3DDC84?style=flat-square&logo=android-studio&logoColor=white) ![](https://img.shields.io/badge/CLion-000000?style=flat-square&logo=clion&logoColor=white) ![](https://img.shields.io/badge/Eclipse-2C2255?style=flat-square&logo=eclipse&logoColor=white) ![](https://img.shields.io/badge/GIT-E44C30?style=flat-square&logo=git&logoColor=white) ![](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=flat-square&logo=intellij-idea&logoColor=white) ![](\thttps://img.shields.io/badge/Notepad++-90E59A.svg?style=flat-square&logo=notepad%2B%2B&logoColor=black) ![](https://img.shields.io/badge/Rider-000000?style=flat-square&logo=Rider&logoColor=white) ![](https://img.shields.io/badge/Visual_Studio-5C2D91?style=flat-square&logo=visual%20studio&logoColor=white) ![](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=flat-square&logo=visual%20studio%20code&logoColor=white) ![](https://img.shields.io/badge/WebStorm-000000?style=flat-square&logo=WebStorm&logoColor=white) ![](\thttps://img.shields.io/badge/C%2B%2B-00599C?style=flat-square&logo=c%2B%2B&logoColor=white) ![](https://img.shields.io/badge/C%23-239120?style=flat-square&logo=c-sharp&logoColor=white) ![](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![](\thttps://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white) ![](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=java&logoColor=white) ![](\thttps://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E) ![](\thttps://img.shields.io/badge/json-5E5C5C?style=flat-square&logo=json&logoColor=white) ![](https://img.shields.io/badge/Lua-2C2D72?style=flat-square&logo=lua&logoColor=white) ![](\thttps://img.shields.io/badge/eslint-3A33D1?style=flat-square&logo=eslint&logoColor=white) ![](https://img.shields.io/badge/prettier-1A2C34?style=flat-square&logo=prettier&logoColor=F7BA3E) ![](https://img.shields.io/badge/Trello-0052CC?style=flat-square&logo=trello&logoColor=white) ![](https://img.shields.io/badge/Hibernate-59666C?style=flat-square&logo=Hibernate&logoColor=white) ![](\thttps://img.shields.io/badge/Android-3DDC84?style=flat-square&logo=android&logoColor=white) ![](https://img.shields.io/badge/Arch_Linux-1793D1?style=flat-square&logo=arch-linux&logoColor=white) ![](https://img.shields.io/badge/Debian-A81D33?style=flat-square&logo=debian&logoColor=white) ![](\thttps://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black) ![](https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=Jira&logoColor=white) ![](https://img.shields.io/badge/Linux_Mint-87CF3E?style=flat-square&logo=linux-mint&logoColor=white) ![](https://img.shields.io/badge/manjaro-35BF5C?style=flat-square&logo=manjaro&logoColor=white) ![](https://img.shields.io/badge/Pop!_OS-48B9C7?style=flat-square&logo=Pop!_OS&logoColor=white) ![](\thttps://img.shields.io/badge/Ubuntu-E95420?style=flat-square&logo=ubuntu&logoColor=white) ![](https://img.shields.io/badge/Windows_95-008080?style=flat-square&logo=windows-95&logoColor=white) ![](\thttps://img.shields.io/badge/Windows-0078D6?style=flat-square&logo=windows&logoColor=white) ![](https://img.shields.io/badge/Windows_XP-003399?style=flat-square&logo=windows-xp&logoColor=white) ![](https://img.shields.io/badge/Raspberry%20Pi-A22846?style=flat-square&logo=Raspberry%20Pi&logoColor=white) ![](https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white) ![](\thttps://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white) ![](https://img.shields.io/badge/GitLab-330F63?style=flat-square&logo=gitlab&logoColor=white) ![](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white) ![](https://img.shields.io/badge/Stack_Overflow-FE7A16?style=flat-square&logo=stack-overflow&logoColor=white) ![](https://img.shields.io/badge/Audacity-0000CC?style=flat-square&logo=audacity&logoColor=white) ![](\thttps://img.shields.io/badge/windows%20terminal-4D4D4D?style=flat-square&logo=windows%20terminal&logoColor=white) ![](https://img.shields.io/badge/GNU%20Bash-4EAA25?style=flat-square&logo=GNU%20Bash&logoColor=white) ![](https://img.shields.io/badge/Brave-FF1B2D?style=flat-square&logo=Brave&logoColor=white) ![](https://img.shields.io/badge/Firefox_Browser-FF7139?style=flat-square&logo=Firefox-Browser&logoColor=white) ![](https://img.shields.io/badge/Twitch-9146FF?style=flat-square&logo=twitch&logoColor=white) ![](https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white)",
        website: "\nHere are the latest posts from ![](https://img.shields.io/website?down_color=red&down_message=down&label=pilzhere.net&style=flat-square&up_color=green&up_message=up&url=https%3A%2F%2Fpilzhere.net)",
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
        footer: "\n![](https://img.shields.io/github/package-json/v/PilzHere/PilzHere?style=flat-square) ![](https://img.shields.io/github/workflow/status/PilzHere/PilzHere/README%20build?label=README&logo=Github&style=flat-square) ![](https://img.shields.io/github/package-json/dependency-version/PilzHere/PilzHere/axios?style=flat-square) ![](https://img.shields.io/github/package-json/dependency-version/PilzHere/PilzHere/cheerio?style=flat-square) ![](https://img.shields.io/github/package-json/dependency-version/PilzHere/PilzHere/mustache?style=flat-square)",
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

    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
}

generateReadMe();

console.log("Done.")
