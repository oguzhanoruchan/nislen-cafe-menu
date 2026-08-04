import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './errorBoundary'
import { RouteFallback } from './components/RouteFallback'
import type { Category, Product } from './types'
import { CustomerDetail, CustomerMenu } from './customer'

/**
 * Route-level composition for the public menu, admin experience, and restaurant tools.
 * Keeping this in a dedicated module makes the app shell easier to maintain and test.
 */
const AdvancedAdmin = lazy(() => import('./adminAdvanced'))
const ContactPage = lazy(() =>
  import('./restaurantPages').then((module) => ({ default: module.ContactPage }))
)
const FeedbackPage = lazy(() =>
  import('./restaurantPages').then((module) => ({ default: module.FeedbackPage }))
)
const OperationsPage = lazy(() =>
  import('./restaurantPages').then((module) => ({ default: module.OperationsPage }))
)
const ReservationPage = lazy(() =>
  import('./restaurantPages').then((module) => ({ default: module.ReservationPage }))
)
const RestaurantAdminPanel = lazy(() =>
  import('./restaurantPages').then((module) => ({ default: module.RestaurantAdminPanel }))
)
const TablePage = lazy(() =>
  import('./restaurantPages').then((module) => ({ default: module.TablePage }))
)

export function AppRoutes({ categories, products, error, loading }: { categories: Category[]; products: Product[]; error?: string; loading: boolean }) {
  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={<CustomerMenu categories={categories} products={products} loading={loading} error={error} />}
        />
        <Route
          path="/product/:id"
          element={<CustomerDetail products={products} loading={loading} />}
        />
        <Route path="/admin" element={<AdvancedAdmin categories={categories} products={products} />} />
        <Route path="/tables" element={<Suspense fallback={<RouteFallback message="Loading restaurant tools…" />}><TablePage /></Suspense>} />
        <Route path="/reservations" element={<Suspense fallback={<RouteFallback message="Loading reservations…" />}><ReservationPage /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<RouteFallback message="Loading contact details…" />}><ContactPage /></Suspense>} />
        <Route path="/feedback" element={<Suspense fallback={<RouteFallback message="Loading feedback…" />}><FeedbackPage /></Suspense>} />
        <Route path="/operations" element={<Suspense fallback={<RouteFallback message="Loading operations blueprint…" />}><OperationsPage /></Suspense>} />
        <Route path="/restaurant-admin" element={<Suspense fallback={<RouteFallback message="Loading admin console…" />}><RestaurantAdminPanel /></Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  )
}

