const mongoose = require('mongoose')
const puppeteer=require('puppeteer')
const easydessert = require('./module/easy.dessert.module').easydessert
require('dotenv').config()


const getRecipes = async () => {
    console.log('first function')
    try {
        puppeteer.launch({headless: false}).then(async (browser) => {
            let page = await browser.newPage()
            page.setViewport({width: 1366, height: 768});
            await page.goto("https://www.delicious.com.au/recipes/collections/gallery/60-easy-desserts-for-effortless-entertaining/77cijfrr?page=20", {waitUntil: 'domcontentloaded'})
        await arrayOfLinkToRecipes(page)
        })
    } catch (e) {
        console.log(e)
    }
}
const arrayOfLinkToRecipes = async (page) => {
    console.log('second function')
    await page.waitForSelector("article > header > figure > div > div > a > img.img-responsive.lead-image")
    const linksToGet = await page.evaluate(() => {
        let link = Array.from(document.querySelectorAll("article > header > figure > div > div > a")).map(element => {
            return element.href
        })
        let image = Array.from(document.querySelectorAll('article> header > figure > div > div > a > img.img-responsive.lead-image')).map(element => {
            return element.src
        })
        let arr = []
        for (let i = 0; i < link.length; i++) {
            arr.push({ link: link[i], imgSource: image[i] })
        }
        console.log('arr', arr)
        console.log('arrLength', arr.length)
        return arr
    })
  
    await getDataFromLink(page, linksToGet)
}
const getDataFromLink = async (page, array) => {
    console.log('third function')
    for (const link of array) {
        if (link.link.includes('https')) {
            await page.goto(link.link, { waitUntil: 'domcontentloaded' })
            let [ingredients] = await Promise.all([page.evaluate(() => {
                return document.querySelector("body > div.container.main-container > div > main > article > section > div > section.col-xs-12.col-sm-4.ingredients > ul")
                    .innerText
            })])
            let [instructions] = await Promise.all([page.evaluate(() => {
                return document.querySelector("body > div.container.main-container > div > main > article > section > div > section.col-xs-12.col-sm-8.method-list>ul").innerText
            })])
            let [recipeName] = await Promise.all([page.evaluate(() => {
                return document.querySelector("body > div.container.main-container > div > div.hero.col-xs-12.col-md-8 > header > h1").innerText
            })])
            let img = link.imgSource
            let RecipeObject = {
                recipeName: recipeName,
                ingredients: ingredients.replaceAll('\n', '--'),
                instructions: instructions.replaceAll('\n', '--'),
                img: img
            }
            saveData(RecipeObject)
        }
    }
}
const saveData = (RecipeObject) => {
    console.log('save function')
    const recipe = new easydessert({
        recipeName: RecipeObject.recipeName,
        ingredients: RecipeObject.ingredients,
        instructions: RecipeObject.instructions,
        img: RecipeObject.img
    })
    recipe.save((err, data) => {
        if (err) console.log('err', err)
         console.log(data)
    })
}

mongoose.connect(`${process.env.BD_URL}`,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log(('connected to DB'))
})

getRecipes()