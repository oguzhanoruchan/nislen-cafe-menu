/* global console */

import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceDirectory = path.resolve('public/images/menü')
const outputDirectory = path.join(sourceDirectory, 'previews')
const previewSize = 640

const entries = await readdir(sourceDirectory, { withFileTypes: true })
const sourceFiles = entries
  .filter((entry) => entry.isFile() && path.extname(entry.name) === '.png')
  .map((entry) => entry.name)

await mkdir(outputDirectory, { recursive: true })

let completed = 0
for (const sourceFile of sourceFiles) {
  const outputFile = `${path.basename(sourceFile, '.png')}.webp`

  await sharp(path.join(sourceDirectory, sourceFile))
    .resize({
      width: previewSize,
      height: previewSize,
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: 78, effort: 4, smartSubsample: true })
    .toFile(path.join(outputDirectory, outputFile))

  completed += 1
}

const outputSizes = await Promise.all(
  sourceFiles.map((sourceFile) =>
    stat(
      path.join(outputDirectory, `${path.basename(sourceFile, '.png')}.webp`)
    )
  )
)
const totalBytes = outputSizes.reduce((total, file) => total + file.size, 0)

console.log(
  `Generated ${completed} WebP menu previews (${(totalBytes / 1024 / 1024).toFixed(1)} MB total).`
)
