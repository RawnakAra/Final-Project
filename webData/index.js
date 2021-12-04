const openBrowser = require("./open")
const {wait} = require('./type-click')
const Recipes = require('./models/recipes.module')

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
    //console.log('Second function')
    await page.waitForTimeout(1000)
    //console.log(await page.url())
    await getUrlOfPage(page)
}

const getUrlOfPage = async (page) => {
    await page.waitForSelector(".wprm-recipe-container")
    const deta = await page.evaluate(()=>{
        const recipeName = document.querySelector(".wprm-recipe-container > div > div.wprm-col-flex > div.wprm-container-float-left > h2").innerText
        const ingredients = document.querySelector('.wprm-recipe-container> div > div.wprm-custom-inner > div').innerText
        const instructions = document.querySelector('.wprm-recipe-container > div > div.wprm-custom-inner > div.wprm-recipe-instructions-container').innerText
        // const totalTime = document.querySelector('.wprm-recipe-container > div > div.wprm-col-flex > div.wprm-container-float-left > div.wprm-recipe-meta-container.wprm-recipe-times-container.wprm-recipe-details-container.wprm-recipe-details-container-inline.wprm-block-text-normal > div.wprm-recipe-block-container.wprm-recipe-block-container-inline.wprm-block-text-normal.wprm-recipe-time-container.wprm-recipe-total-time-container').innerText
        const cakeImg = document.querySelector(".wprm-recipe-container > div > div.wprm-col-flex > div.wprm-container-float-right > div.wprm-recipe-image.wprm-block-image-normal > picture > img").src;
        return {recipeName , ingredients ,instructions ,cakeImg }
    })
    const resipesData = await deta
console.log(resipesData)
//await wait(7000)
await savedata(resipesData)   
}

const savedata =async (deta) =>{
    // const recipesMDB = new Recipes({
    //     name : deta.recipeName,
    //     ingredients : deta.ingredients ,
    //     instructions : deta.instructions ,
    //     img : deta.cakeImg
    // }) 
    
    Recipes.create({
        name : deta.recipeName,
        ingredients : deta.ingredients ,
        instructions : deta.instructions ,
        img : deta.cakeImg
    },
    (err , data) =>{
       console.log(err);
       console.log(data);
    })
}

main()
