import { chromium } from 'playwright';
import path from 'path';

const sites = [
  { url: 'https://www.indianpravasimovement.org', name: 'pravasi.png' },
  { url: 'https://gardenville.ae/', name: 'gardenville-portfolio.png' },
  { url: 'https://fellora.ae/', name: 'fellora.png' },
  { url: 'https://greenveel.com/', name: 'greenveel.png' },
  { url: 'https://compassqtr.com/', name: 'compassqtr.png' },
  { url: 'https://keracabs.com/', name: 'keracabs.png' },
  { url: 'https://mardok.in/', name: 'mardok.png' },
  { url: 'https://swiftenglishacademy.in/', name: 'swiftenglish.png' },
  { url: 'https://www.indianpravasimovement.org', name: 'indianpravasi.png' },
  { url: 'https://gardenville.ae/', name: 'gardenville.png' },
  { url: 'https://zodi.ae/', name: 'zodi.png' },
  { url: 'https://hdfbusiness.ae/', name: 'hdfbusiness.png' },
  { url: 'https://levoc.ae', name: 'levoc.png' },
  { url: 'https://lavessidesign.com/', name: 'lavesside.png' }
];

(async () => {
  console.log('Starting Playwright screenshot capture...');
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 1600 } });
  
  for (const site of sites) {
    const page = await context.newPage();
    console.log(`Navigating to ${site.url}...`);
    try {
      await page.goto(site.url, { waitUntil: 'load', timeout: 30000 });
      // wait a bit for any initial animations or popups
      await page.waitForTimeout(4000);
      const dest = path.join(process.cwd(), 'public', 'images', 'projects', site.name);
      await page.screenshot({ path: dest });
      console.log(`Saved screenshot to ${dest}`);
    } catch (e) {
      console.error(`Failed for ${site.url}:`, e.message);
    }
    await page.close();
  }
  
  await browser.close();
  console.log('Done!');
})();
