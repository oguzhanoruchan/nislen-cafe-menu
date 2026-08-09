import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const commitSha =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.GITHUB_SHA ??
  process.env.COMMIT_SHA ??
  null

const buildId = commitSha ?? `local-${Date.now()}`

const payload = {
  buildId,
  commitSha,
  builtAt: new Date().toISOString()
}

const publicDir = resolve(process.cwd(), 'public')
const targetPath = resolve(publicDir, 'version.json')

mkdirSync(publicDir, { recursive: true })
writeFileSync(targetPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8')
