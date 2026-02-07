import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const svgPath = path.join(projectRoot, 'public', 'icon.svg');
const buildDir = path.join(projectRoot, 'build');
const icoPath = path.join(buildDir, 'icon.ico');

const sizes = [16, 32, 48, 64, 128, 256];

async function main() {
  await fs.mkdir(buildDir, { recursive: true });

  const svg = await fs.readFile(svgPath);

  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(svg, { density: 1024 })
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer()
    )
  );

  const ico = await toIco(pngBuffers);
  await fs.writeFile(icoPath, ico);
}

main().catch((err) => {
  process.stderr.write(`${err?.stack || err?.message || String(err)}\n`);
  process.exitCode = 1;
});

