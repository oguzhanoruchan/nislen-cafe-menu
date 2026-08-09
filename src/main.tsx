import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const VERSION_ENDPOINT = '/version.json'
const CACHE_BUST_PARAM = '__build'

async function fetchLatestBuildId() {
  const response = await fetch(VERSION_ENDPOINT, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache'
    }
  })

  if (!response.ok) {
    return null
  }

  const payload = (await response.json()) as { buildId?: string }
  return payload.buildId ?? null
}

async function ensureFreshBuild() {
  try {
    const remoteBuildId = await fetchLatestBuildId()
    if (!remoteBuildId || remoteBuildId === __APP_BUILD_ID__) {
      const url = new URL(window.location.href)
      if (url.searchParams.has(CACHE_BUST_PARAM)) {
        url.searchParams.delete(CACHE_BUST_PARAM)
        window.history.replaceState({}, '', url.toString())
      }

      return true
    }

    const url = new URL(window.location.href)
    if (url.searchParams.get(CACHE_BUST_PARAM) !== remoteBuildId) {
      url.searchParams.set(CACHE_BUST_PARAM, remoteBuildId)
      window.location.replace(url.toString())
      return false
    }

    window.location.reload()
    return false
  } catch {
    return true
  }
}

function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

ensureFreshBuild().then((isFresh) => {
  if (!isFresh) {
    return
  }

  renderApp()
})
