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
        badges: "\n![](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![](\thttps://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white) ![](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white) ![](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white) ![](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![](\thttps://img.shields.io/badge/CMake-064F8C?style=for-the-badge&logo=cmake&logoColor=white) ![](\thttps://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white) ![](https://img.shields.io/badge/Junit5-25A162?style=for-the-badge&logo=junit5&logoColor=white) ![](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) ![](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white) ![](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) ![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![](https://img.shields.io/badge/NuGet-004880?style=for-the-badge&logo=nuget&logoColor=white) ![](https://img.shields.io/badge/OpenGL-FFFFFF?style=for-the-badge&logo=opengl) ![](\thttps://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![](\thttps://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![](\thttps://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white) ![](\thttps://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot) ![](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white) ![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![](\thttps://img.shields.io/badge/ThreeJs-black?style=for-the-badge&logo=three.js&logoColor=white) ![](https://img.shields.io/badge/Unity-100000?style=for-the-badge&logo=unity&logoColor=white) ![](https://img.shields.io/badge/-Unreal%20Engine-313131?style=for-the-badge&logo=unreal-engine&logoColor=white) ![](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white) ![](https://img.shields.io/badge/Xampp-F37623?style=for-the-badge&logo=xampp&logoColor=white) ![](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white) ![](\thttps://img.shields.io/badge/Itch.io-FA5C5C?style=for-the-badge&logo=itchdotio&logoColor=white) ![](https://img.shields.io/badge/Steam-000000?style=for-the-badge&logo=steam&logoColor=white) ![](\thttps://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![](\thttps://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![](https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white) ![](https://img.shields.io/badge/CLion-000000?style=for-the-badge&logo=clion&logoColor=white) ![](https://img.shields.io/badge/Eclipse-2C2255?style=for-the-badge&logo=eclipse&logoColor=white) ![](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white) ![](\thttps://img.shields.io/badge/Notepad++-90E59A.svg?style=for-the-badge&logo=notepad%2B%2B&logoColor=black) ![](https://img.shields.io/badge/Rider-000000?style=for-the-badge&logo=Rider&logoColor=white) ![](https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white) ![](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white) ![](https://img.shields.io/badge/WebStorm-000000?style=for-the-badge&logo=WebStorm&logoColor=white) ![](\thttps://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white) ![](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white) ![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![](\thttps://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white) ![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white) ![](\thttps://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![](\thttps://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white) ![](https://img.shields.io/badge/Lua-2C2D72?style=for-the-badge&logo=lua&logoColor=white) ![](\thttps://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) ![](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white) ![](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white) ![](\thttps://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white) ![](https://img.shields.io/badge/Arch_Linux-1793D1?style=for-the-badge&logo=arch-linux&logoColor=white) ![](https://img.shields.io/badge/Debian-A81D33?style=for-the-badge&logo=debian&logoColor=white) ![](\thttps://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black) ![](https://img.shields.io/badge/Linux_Mint-87CF3E?style=for-the-badge&logo=linux-mint&logoColor=white) ![](https://img.shields.io/badge/manjaro-35BF5C?style=for-the-badge&logo=manjaro&logoColor=white) ![](https://img.shields.io/badge/Pop!_OS-48B9C7?style=for-the-badge&logo=Pop!_OS&logoColor=white) ![](\thttps://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white) ![](https://img.shields.io/badge/Windows_95-008080?style=for-the-badge&logo=windows-95&logoColor=white) ![](\thttps://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white) ![](https://img.shields.io/badge/Windows_XP-003399?style=for-the-badge&logo=windows-xp&logoColor=white) ![](https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=Raspberry%20Pi&logoColor=white) ![](https://img.shields.io/badge/Bitbucket-0747a6?style=for-the-badge&logo=bitbucket&logoColor=white) ![](\thttps://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![](https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white) ![](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white) ![](https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white) ![](https://img.shields.io/badge/Audacity-0000CC?style=for-the-badge&logo=audacity&logoColor=white) ![](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) ![](\thttps://img.shields.io/badge/windows%20terminal-4D4D4D?style=for-the-badge&logo=windows%20terminal&logoColor=white) ![](https://img.shields.io/badge/GNU%20Bash-4EAA25?style=for-the-badge&logo=GNU%20Bash&logoColor=white) ![](https://img.shields.io/badge/Brave-FF1B2D?style=for-the-badge&logo=Brave&logoColor=white) ![](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white) ![](https://img.shields.io/badge/Firefox_Browser-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)",
        website: "\nHere are the latest posts from [my website](https://www.pilzhere.net/)",
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

    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
}

generateReadMe();

console.log("Done.")
