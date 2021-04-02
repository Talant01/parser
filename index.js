const cheerio = require('cheerio')
const puppeteer = require('puppeteer');
const Table = require('cli-table');
const url = 'https://www.google.com/';

const table = new Table({
	head: ['Website'],
	colWidths: [50]
})

async function getPage(term) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}search?q=${term}`);
  const content = await page.content();
  await browser.close();

  return content;
}

async function start(term) {
	const body = await getPage(term);
	const $ = cheerio.load(body);

	$('.hlcw0c .yuRUbf > a').each(function(i, element) {
		table.push([$(this).attr('href')])
	})
	console.log(table.toString());
}

start('javascript learn');



