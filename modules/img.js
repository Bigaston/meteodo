const puppeteer = require('puppeteer');
const path = require("path");
const mustache = require("mustache")
const fs = require("fs")

const render_and_screenshot = async (content, sortie) => {
    const browser = await puppeteer.launch({
        defaultViewport: { width: 1400, height: 1400 },
        headless: true,
        args: ['--no-sandbox']
    });

	const page = await browser.newPage();
	
	await page.setContent(content);
	await page.waitFor(10000);
    await page.screenshot({path: path.join(sortie), type: "jpeg", quality: 100});

    await browser.close();
};

module.exports = {
	img_feed: async (ville) => {
		var template = fs.readFileSync(path.join(__dirname, "./template.mustache"), "utf8");

		var render_obj = {
			ville: ville
		}

		var string = mustache.render(template, render_obj);

		await render_and_screenshot(string, path.join(__dirname, "../export/" + ville + "/feed_img.jpg"))
	},
	img_episode: async (ville, date) => {
		var template = fs.readFileSync(path.join(__dirname, "./template.mustache"), "utf8");

		var render_obj = {
			ville: ville,
			day: date
		}

		var string = mustache.render(template, render_obj);

		await render_and_screenshot(string, path.join(__dirname, "../export/" + ville + "/ep_img.jpg"))
	}
}