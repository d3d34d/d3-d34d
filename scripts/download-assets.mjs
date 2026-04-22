import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  { url: 'https://framerusercontent.com/images/YORWcZIXuNLnTQZj5Mn0xsvzvNc.jpg', name: 'profile.jpg' },
  { url: 'https://framerusercontent.com/images/pMqPvBNyPbgKlqZRI7Yexfk4M08.jpg', name: 'project-1.jpg' },
  { url: 'https://framerusercontent.com/images/w3nGYevS8xWNDbKE1OWolBHzmU.jpg', name: 'project-2.jpg' },
  { url: 'https://framerusercontent.com/images/3HzOH2f6BaKUrcvpQ7m47OYgI4.jpg', name: 'project-3.jpg' },
  { url: 'https://framerusercontent.com/images/rNOiwacCfUMAKwXwIvUuB2uWRaA.jpg', name: 'project-4.jpg' },
];

const downloadDir = path.join(process.cwd(), 'public/images');

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err.message);
    });
  });
};

async function main() {
  console.log('Downloading assets...');
  for (const asset of assets) {
    const dest = path.join(downloadDir, asset.name);
    try {
      await download(asset.url, dest);
      console.log(`Downloaded: ${asset.name}`);
    } catch (err) {
      console.error(`Failed to download ${asset.name}: ${err}`);
    }
  }
  console.log('All assets downloaded.');
}

main();
