const mongoose = require('mongoose')
const openBrowser = require("./open")
const { wait } = require('./type-click')
const recipeModel = require('./models/recipes.module').recipeModel
require('dotenv').config()
async function main() {
    try {
        // https://livforcake.com/category/cakes/page/2/
        const { browser, page } = await openBrowser("https://livforcake.com/category/cakes/")
        await page.waitForTimeout(1000)
        await getCakeRecipes(browser, page);
    } catch (e) {
        console.log(e)
    }
}

const getCakeRecipes = async (browser, page) => {
    console.log('ff')
    const recipe = await page.evaluate(() => {
        const recipeList = Array.from(document.querySelectorAll('#genesis-content > article > .entry-header > a')).map((ele) => {
            return ele.href
        })
        return recipeList
    })

    const recipeLinks = await recipe;

    recipeLinks.forEach(async res => {
        const linkPage = await browser.newPage()
        await secondFunction(res, linkPage, browser)
        //await linkPage.close()
    })
    await wait(7000)
    return;
}



const secondFunction = async (link, page, browser) => {
    await page.goto(link)
    await page.waitForTimeout(1000)
    await getUrlOfPage(page)
}


const getUrlOfPage = async (page) => {
    await page.waitForSelector(".wprm-recipe-container")
    const url = page.url()
    const deta = await page.evaluate(() => {
        const recipeName = document.querySelector(".wprm-recipe-container > div > div.wprm-col-flex > div.wprm-container-float-left > h2").innerText
        const ingredients = document.querySelector('.wprm-recipe-container> div > div.wprm-custom-inner > div').innerText
        const instructions = document.querySelector(".wprm-recipe-container > div > div.wprm-custom-inner > div.wprm-recipe-instructions-container").innerText
        const cakeImg = document.querySelector(".wprm-recipe-container > div > div.wprm-col-flex > div.wprm-container-float-right > div.wprm-recipe-image.wprm-block-image-normal > picture > img").src;
        return { recipeName, ingredients, cakeImg, instructions }
    })
    
    savedata({...deta,url})
}


const savedata = (deta) => {

    const post = new recipeModel({
        recipeName: deta.recipeName,
        ingredients: deta.ingredients,
        instructions: deta.instructions,
        url: deta.url,
        img: deta.cakeImg
    })

    post.save((err, data) => {
        if (err) console.log(err)
        console.log(data)
    })
}
mongoose.connect(`${process.env.BD_URL}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log('conected to DB')
})
main()

