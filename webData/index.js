const openBrowser = require("./open")
const {wait} = require('./type-click')

async function main() {
    const { browser, page } = await openBrowser("https://livforcake.com/category/cakes/")
    await page.waitForTimeout(1000)
    await getCakeRecipes(browser ,page);
}

const getCakeRecipes = async (browser ,page)=>{
  console.log('ff')
  const recipe = await page.evaluate(()=>{
     const recipeList = Array.from(document.querySelectorAll('#genesis-content > article > .entry-header > a')).map((ele)=>{
         return ele.href
     }) 
     return recipeList  
    })

    const recipeLinks = await recipe;

    recipeLinks.forEach(async res=>{
        const linkPage = await browser.newPage()
        await secondFunction(res , linkPage ,browser)
        //await linkPage.close()
    })
    await wait(7000)
    return;
}



const secondFunction = async (link ,page ,browser) => {
    await page.goto(link)
    console.log('Second function')
    // await page.waitForSelector('.content-sidebar-wrap')
    // const jobs = await page.evaluate(() => {
    //     const allJobs = document.querySelectorAll(".content")
    //     console.log(allJobs)
    //     const jobList = [];
    //     allJobs.forEach((job) => {
    //         jobList.push(job.getAttribute("href"));
    //     })
    //     return jobList
    // })

    // const recipe = document.querySelectorAll('.divine-featured-image')
    // console.log(jobs)
    // await page.click('body > div.site-container > div > div > main > article> header > div > a')
}

main()
