import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname vervangen in ESM:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = ['nl', 'fr', 'ar'];
const baseUrl = 'https://nekor.be';

// public folder zit één niveau hoger dan scripts
const publicPath = path.join(__dirname, '..', 'public');

// maak de folder als die nog niet bestaat
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath);
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(lang => {
  sitemap += `
  <url>
    <loc>${baseUrl}/${lang}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

sitemap += `\n</urlset>`;

// schrijf sitemap in de juiste public folder
fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
console.log('✅ Sitemap gegenereerd!');
