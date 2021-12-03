

const click = async (selector, page, time = 200) => {
    try {
        await page.focus(selector);
        await wait(time)
        await page.click(selector);
    }
    catch (err) {
        console.log(err)
    }
}

const wait = async (time) => {
    await new Promise((res, rej) => setTimeout(() => {
        res()
    }, time))
    return
}

module.exports = {
  click, wait
}