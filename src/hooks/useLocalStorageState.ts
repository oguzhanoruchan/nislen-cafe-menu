import { useEffect, useState } from 'react'

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
      return stored ? (JSON.parse(stored) as T) : initialValue
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
