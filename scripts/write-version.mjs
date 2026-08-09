import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd, env } from 'node:process'

const commitSha =
  env.VERCEL_GIT_COMMIT_SHA ?? env.GITHUB_SHA ?? env.COMMIT_SHA ?? null

const buildId = commitSha ?? `local-${Date.now()}`

const payload = {
  buildId,
  commitSha,
  builtAt: new Date().toISOString()
}

const publicDir = resolve(env.PWD ?? cwd(), 'public')
const targetPath = resolve(publicDir, 'version.json')

mkdirSync(publicDir, { recursive: true })
writeFileSync(targetPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8')
