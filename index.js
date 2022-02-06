const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';

/**
 * DATA is the object that contains all
 * the data to be provided to Mustache
 * Notice the "name" and "date" property.
 */
let DATA = {
    title: "Hey nerds :suspect:",
    info: "I enjoy coding games, apps, bots and I am constantly looking for a new challenge.",
    status: "\nI am currently studying as a Java/Javascript fullstack developer at EC Utbildning in Malmö, Sweden. :godmode:",
    website: "\nReach me at [my website](http://www.pilzhere.net/) or [Linkedin](https://www.linkedin.com/in/christianpilzhere/).",
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

/**
 * A - We open 'main.mustache'
 * B - We ask Mustache to render our file with the data
 * C - We create a README.md file with the generated output
 */
function generateReadMe() {
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
}

generateReadMe();
