const Puppeteer = require("puppeteer");

const openBrowser = async (url) => {
    const browser = await Puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0)
    await page.goto(url);
    return ({
        browser,
        page
    })
}

module.exports = openBrowser