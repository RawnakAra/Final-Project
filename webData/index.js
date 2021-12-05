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
const resipesData = []
const getUrlOfPage = async (page) => {
    await page.waitForSelector(".wprm-recipe-container")
    const url = page.url()
    const deta = await page.evaluate(()=>{
        const recipeName = document.querySelector(".wprm-recipe-container > div > div.wprm-col-flex > div.wprm-container-float-left > h2").innerText
        const ingredients = document.querySelector('.wprm-recipe-container> div > div.wprm-custom-inner > div').innerHTML
        const instructions = document.querySelector(".wprm-recipe-container > div > div.wprm-custom-inner > div.wprm-recipe-instructions-container").innerHTML
        const cakeImg = document.querySelector(".wprm-recipe-container > div > div.wprm-col-flex > div.wprm-container-float-right > div.wprm-recipe-image.wprm-block-image-normal > picture > img").src;
        return {recipeName , ingredients  ,cakeImg }
    })
    resipesData.push(deta)
console.log(resipesData ,url)
return {resipesData ,url}
//await wait(7000)
await savedata(resipesData)   
}

const savedata =async (deta) =>{
    
await Recipes.create({
        recipeName : deta.recipeName,
        ingredients : deta.ingredients ,
        instructions : deta.instructions ,
        url : deta.url,
        img : deta.cakeImg
    },
    (err , data) =>{
       console.log(err);
       console.log(data);
    })
}
main()

