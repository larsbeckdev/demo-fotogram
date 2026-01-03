// scripts/images.js
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const srcDir = 'src/assets/images'
const outDir = 'public/images'

fs.mkdirSync(outDir, { recursive: true })

for (const file of fs.readdirSync(srcDir)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue

  const input = path.join(srcDir, file)
  const output = path.join(outDir, file.replace(/\.(jpe?g|png)$/i, '.webp'))

  await sharp(input).webp({ quality: 80 }).toFile(output)
}
