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
const VERSION_CHECK_TIMEOUT_MS = 5_000

type RefreshAttempt = {
  remoteBuildId: string
  previousBuildId: string
  attemptedAt: number
}

function readSessionValue(key: string) {
  try {
    return window.sessionStorage.getItem(key)
  } catch (error) {
    console.warn(
      'Session storage is unavailable; build-check persistence is disabled.',
      error
    )
    return null
  }
}

function writeSessionValue(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value)
  } catch (error) {
    console.warn(
      'Session storage is unavailable; build-check persistence is disabled.',
      error
    )
  }
}

function removeSessionValue(key: string) {
  try {
    window.sessionStorage.removeItem(key)
  } catch (error) {
    console.warn(
      'Session storage is unavailable; build-check persistence is disabled.',
      error
    )
  }
}

function isRefreshAttempt(value: unknown): value is RefreshAttempt {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return (
    'remoteBuildId' in value &&
    typeof value.remoteBuildId === 'string' &&
    'previousBuildId' in value &&
    typeof value.previousBuildId === 'string' &&
    'attemptedAt' in value &&
    typeof value.attemptedAt === 'number' &&
    Number.isFinite(value.attemptedAt)
  )
}

function readAttempt(): RefreshAttempt | null {
  const raw = readSessionValue(REFRESH_ATTEMPT_KEY)
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    return isRefreshAttempt(parsed) ? parsed : null
  } catch {
    return null
  }
}

function clearAttempt() {
  removeSessionValue(REFRESH_ATTEMPT_KEY)
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

  writeSessionValue(REFRESH_ATTEMPT_KEY, JSON.stringify(payload))
}

function shouldSkipCheck() {
  const raw = readSessionValue(LAST_CHECK_AT_KEY)
  if (!raw) return false

  const timestamp = Number(raw)
  if (!Number.isFinite(timestamp)) return false

  const elapsed = Date.now() - timestamp
  return elapsed >= 0 && elapsed < CHECK_INTERVAL_MS
}

function markCheckTime() {
  writeSessionValue(LAST_CHECK_AT_KEY, String(Date.now()))
}

async function fetchLatestBuildId(forceNetwork = false) {
  const endpoint = forceNetwork
    ? `${VERSION_ENDPOINT}?t=${Date.now()}`
    : VERSION_ENDPOINT

  const controller = new AbortController()
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    VERSION_CHECK_TIMEOUT_MS
  )

  try {
    const response = await fetch(endpoint, {
      cache: forceNetwork ? 'reload' : 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      },
      signal: controller.signal
    })

    if (!response.ok) {
      throw new Error(`Version check failed with HTTP ${response.status}.`)
    }

    const payload: unknown = await response.json()
    if (
      typeof payload !== 'object' ||
      payload === null ||
      !('buildId' in payload) ||
      typeof payload.buildId !== 'string' ||
      payload.buildId.length === 0
    ) {
      throw new Error('Version check returned an invalid build ID.')
    }

    return payload.buildId
  } finally {
    window.clearTimeout(timeoutId)
  }
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

    if (url.searchParams.get(CACHE_BUST_PARAM) === remoteBuildId) {
      return true
    }

    recordAttempt(remoteBuildId)
    url.searchParams.set(CACHE_BUST_PARAM, remoteBuildId)
    window.location.replace(url.toString())
    return false
  } catch (error) {
    console.warn(
      'Version check failed; continuing with the currently loaded menu.',
      error
    )
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

hasRendered = true
renderApp()
void ensureFreshBuild(true)
