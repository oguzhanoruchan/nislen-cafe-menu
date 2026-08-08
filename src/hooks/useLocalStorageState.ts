import { useEffect, useState } from 'react'

function isCompatibleStoredValue<T>(value: unknown, initialValue: T): value is T {
  if (value === null || value === undefined) {
    return false
  }

  if (typeof initialValue === 'string') {
    return typeof value === 'string'
  }

  if (typeof initialValue === 'number') {
    return typeof value === 'number'
  }

  if (typeof initialValue === 'boolean') {
    return typeof value === 'boolean'
  }

  if (Array.isArray(initialValue)) {
    return Array.isArray(value)
  }

  return typeof value === 'object'
}

/**
 * Persists a state value to localStorage and synchronizes it with React state.
 * Useful for theme, language, and small feature preferences that should survive reloads.
 */
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const stored = window.localStorage.getItem(key)
      if (!stored) {
        return initialValue
      }
      const parsed = JSON.parse(stored) as T
      return isCompatibleStoredValue(parsed, initialValue) ? parsed : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage failures so the UI continues to function offline-safe.
    }
  }, [key, value])

  return [value, setValue] as const
}
