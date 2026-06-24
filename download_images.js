import fs from 'fs';
import path from 'path';
import https from 'https';

const projects = [
  { id: '69de17735514a13aa28eef5f', name: 'nux' },
  { id: '69de17115514a13aa28eef52', name: 'idukki-gold' },
  { id: '69de16185514a13aa28eef49', name: 'cloths' },
  { id: '69de15ca5514a13aa28eef3f', name: 'oud' },
  { id: '69c64c9c4143e208ab5515bf', name: 'pravasi' },
  { id: '69c648d35ed3353094fa8adf', name: 'gardenville' },
  { id: '69c64405376c937a3c1ce3f9', name: 'oud2' },
  { id: '69c64373162eec10142391e5', name: 'logo' },
  { id: '69c63a5d83a415da7848665d', name: 'posters' }
];

const dir = path.join(process.cwd(), 'public', 'images', 'projects');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', err => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const p of projects) {
    const url = `https://www.mintsglobal.ae/images/projects/${p.id}/main.webp`;
    const dest = path.join(dir, `${p.name}.webp`);
    console.log(`Downloading ${url} to ${dest}...`);
    try {
      await download(url, dest);
      console.log(`Successfully downloaded ${p.name}`);
    } catch (err) {
      console.error(`Error downloading ${p.name}:`, err.message);
    }
  }
}

run();
