const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.chevron.com/search?q=IoT', {
    waitUntil: 'networkidle2'
  });

  var links = await page.evaluate(() => {
    var results = document.querySelectorAll('li.search-results-item a');
    return Array.from(results).map(results => {
      return results.href;
    });
  });
  console.log(links);

  await page.goto(links[0], {
    waitUntil: 'networkidle2'
  });

  await page.evaluate(() => {
    let dom = document.querySelector('div.cb-content');
    dom.innerHTML = dom.innerHTML.replace(/IoT/g, '<mark>IoT</mark>');
  });

  firstPage = await page.content();
  console.log(firstPage);
  //await page.screenshot({ path: 'firstPage.png', fullPage: true });

  await browser.close();
})();
