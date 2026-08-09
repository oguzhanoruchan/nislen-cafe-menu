import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'

function getBuildId() {
  const fallback = process.env.VERCEL_GIT_COMMIT_SHA ?? 'dev'
  const versionPath = new URL('./public/version.json', import.meta.url)

  if (!existsSync(versionPath)) {
    return fallback
  }

  try {
    const content = readFileSync(versionPath, 'utf-8')
    const parsed = JSON.parse(content) as { buildId?: string }
    return parsed.buildId ?? fallback
  } catch {
    return fallback
  }
}

const appBuildId = getBuildId()

export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    __APP_BUILD_ID__: JSON.stringify(appBuildId)
  }
})
