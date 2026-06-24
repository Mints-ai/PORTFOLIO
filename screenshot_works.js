import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projects = [
  // Mintsglobal portfolio work pages
  { name: 'nux', url: 'https://www.mintsglobal.ae/work/69de17735514a13aa28eef5f' },
  { name: 'idukki-gold', url: 'https://www.mintsglobal.ae/work/69de17115514a13aa28eef52' },
  { name: 'cloths', url: 'https://www.mintsglobal.ae/work/69de16185514a13aa28eef49' },
  { name: 'oud', url: 'https://www.mintsglobal.ae/work/69de15ca5514a13aa28eef3f' },
  { name: 'pravasi', url: 'https://www.mintsglobal.ae/work/69c64c9c4143e208ab5515bf' },
  { name: 'gardenville-portfolio', url: 'https://www.mintsglobal.ae/work/69c648d35ed3353094fa8adf' },
  { name: 'oud2', url: 'https://www.mintsglobal.ae/work/69c64405376c937a3c1ce3f9' },
  { name: 'logo', url: 'https://www.mintsglobal.ae/work/69c64373162eec10142391e5' },
  { name: 'posters', url: 'https://www.mintsglobal.ae/work/69c63a5d83a415da7848665d' },
  // Client websites
  { name: 'fellora', url: 'https://fellora.ae/' },
  { name: 'greenveel', url: 'https://greenveel.com/' },
  { name: 'compassqtr', url: 'https://compassqtr.com/' },
  { name: 'keracabs', url: 'https://keracabs.com/' },
  { name: 'mardok', url: 'https://mardok.in/' },
  { name: 'swiftenglish', url: 'https://swiftenglishacademy.in/' },
  { name: 'indianpravasi', url: 'https://www.indianpravasimovement.org/' },
  { name: 'gardenville', url: 'https://gardenville.ae/' },
  { name: 'zodi', url: 'https://zodi.ae/' },
  { name: 'hdfbusiness', url: 'https://hdfbusiness.ae/' },
  { name: 'levoc', url: 'https://levoc.ae/' },
  { name: 'lavesside', url: 'https://lavessidesign.com/' },
];

const outDir = path.join(__dirname, 'public', 'images', 'projects');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const p of projects) {
  const destPath = path.join(outDir, `${p.name}.png`);
  // Skip if already exists
  if (fs.existsSync(destPath)) {
    console.log(`  ⏭  Skipping ${p.name} (already exists)`);
    continue;
  }
  console.log(`Screenshotting ${p.name} → ${p.url}`);
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
  });
  const page = await context.newPage();
  try {
    await page.goto(p.url, { waitUntil: 'load', timeout: 45000 });
    // Wait for images/fonts to settle
    await page.waitForTimeout(4000);
    // Dismiss cookie banners if any
    try {
      const cookieBtn = page.locator('button:has-text("Accept"), button:has-text("OK"), button:has-text("Accept All")').first();
      if (await cookieBtn.isVisible({ timeout: 1000 })) await cookieBtn.click();
    } catch (_) { }
    await page.waitForTimeout(500);
    // Screenshot top 800px (hero area)
    await page.screenshot({
      path: destPath,
      clip: { x: 0, y: 0, width: 1440, height: 800 },
    });
    console.log(`  ✓ Saved ${p.name}.png`);
  } catch (err) {
    console.error(`  ✗ Error on ${p.name}: ${err.message.split('\n')[0]}`);
  } finally {
    await page.close();
    await context.close();
  }
}

await browser.close();
console.log('\nAll done!');
