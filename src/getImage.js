const fs = require('fs');
const path = require('path')
const puppeteer = require('puppeteer');

const getImage = async (keyword, number) => {
    // Initialize
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        let selector;

        // Go to google.com
        await page.goto(`https://www.google.com/search?hl=jp&q=${keyword}&btnG=Google+Search&tbs=0&safe=off&tbm=isch`)

        // Collect images
        selector = '#islrg > div.islrc > div:nth-child(n) > a.wXeWr.islib.nfEiy > div.bRMDJf.islir > img';
        const images = await page.evaluate((selector) => {
            const list = Array.from(document.querySelectorAll(selector));
            return list.map(data => data.src);
        }, selector);

        // Make directory which save images
        const dirpath = `${__dirname}/../images/${keyword}`;
        if (!fs.existsSync(dirpath)) {
            fs.mkdir(dirpath, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
            });
        }

        // Save images
        for (let i = 0; i < number; i++) {
            const localfilepath = path.join(dirpath, `${i}.jpeg`);
            const viewSource = await page.goto(images[i]);
            fs.writeFile(localfilepath, await viewSource.buffer(), (err) => {
                if (err) {
                    throw err;
                }
                console.log(`${localfilepath} saved`);
            });
        }

        return true;
    } catch (err) {
        console.log(err.message);
        return false;
    } finally {
        await browser.close();
    }
}

module.exports.getImage = getImage;
