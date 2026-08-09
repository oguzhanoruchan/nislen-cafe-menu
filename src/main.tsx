import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const VERSION_ENDPOINT = '/version.json'
const CACHE_BUST_PARAM = '__build'
const REFRESH_ATTEMPT_KEY = 'nislen-build-refresh-attempt'
const LAST_CHECK_AT_KEY = 'nislen-build-last-check-at'
const CHECK_INTERVAL_MS = 30_000
const ATTEMPT_TTL_MS = 60_000

type RefreshAttempt = {
  remoteBuildId: string
  previousBuildId: string
  attemptedAt: number
}

function readAttempt(): RefreshAttempt | null {
  const raw = sessionStorage.getItem(REFRESH_ATTEMPT_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as RefreshAttempt
  } catch {
    return null
  }
}

function clearAttempt() {
  sessionStorage.removeItem(REFRESH_ATTEMPT_KEY)
}

function shouldThrottleAttempt(remoteBuildId: string) {
  const attempt = readAttempt()
  if (!attempt) return false

  if (
    attempt.remoteBuildId !== remoteBuildId ||
    attempt.previousBuildId !== __APP_BUILD_ID__
  ) {
    return false
  }

  return Date.now() - attempt.attemptedAt < ATTEMPT_TTL_MS
}

function recordAttempt(remoteBuildId: string) {
  const payload: RefreshAttempt = {
    remoteBuildId,
    previousBuildId: __APP_BUILD_ID__,
    attemptedAt: Date.now()
  }

  sessionStorage.setItem(REFRESH_ATTEMPT_KEY, JSON.stringify(payload))
}

function shouldSkipCheck() {
  const raw = sessionStorage.getItem(LAST_CHECK_AT_KEY)
  if (!raw) return false

  const timestamp = Number(raw)
  if (Number.isNaN(timestamp)) return false

  return Date.now() - timestamp < CHECK_INTERVAL_MS
}

function markCheckTime() {
  sessionStorage.setItem(LAST_CHECK_AT_KEY, String(Date.now()))
}

async function fetchLatestBuildId(forceNetwork = false) {
  const endpoint = forceNetwork
    ? `${VERSION_ENDPOINT}?t=${Date.now()}`
    : VERSION_ENDPOINT

  const response = await fetch(endpoint, {
    cache: forceNetwork ? 'reload' : 'no-store',
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

async function ensureFreshBuild(forceNetwork = false) {
  if (!forceNetwork && shouldSkipCheck()) {
    return true
  }

  try {
    const remoteBuildId = await fetchLatestBuildId(forceNetwork)
    markCheckTime()

    if (!remoteBuildId || remoteBuildId === __APP_BUILD_ID__) {
      clearAttempt()
      const url = new URL(window.location.href)
      if (url.searchParams.has(CACHE_BUST_PARAM)) {
        url.searchParams.delete(CACHE_BUST_PARAM)
        window.history.replaceState({}, '', url.toString())
      }

      return true
    }

    const url = new URL(window.location.href)
    if (shouldThrottleAttempt(remoteBuildId)) {
      return true
    }

    recordAttempt(remoteBuildId)

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

let hasRendered = false

function runFreshnessCheck(forceNetwork = false) {
  ensureFreshBuild(forceNetwork).then((isFresh) => {
    if (!isFresh) {
      return
    }

    if (hasRendered) {
      return
    }

    hasRendered = true
    renderApp()
  })
}

window.addEventListener('pageshow', (event) => {
  if (!hasRendered) {
    return
  }

  if (event.persisted) {
    void ensureFreshBuild(true)
  }
})

document.addEventListener('visibilitychange', () => {
  if (!hasRendered || document.visibilityState !== 'visible') {
    return
  }

  void ensureFreshBuild(false)
})

runFreshnessCheck(true)
