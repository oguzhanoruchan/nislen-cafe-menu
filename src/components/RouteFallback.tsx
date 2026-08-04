/**
 * Shared loading placeholder for lazy-loaded route modules.
 */
export function RouteFallback({ message = 'Loading…' }: { message?: string }) {
  return <div className="p-10 text-center text-stone-500">{message}</div>
}
