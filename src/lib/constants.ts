/**
 * Application route paths.
 * Centralized for refactors and type-safe navigation.
 */
export const ROUTES = {
  HOME: '/',
  GET_STARTED: '/get-started',
  SIGN_UP: '/signup',
  SIGN_IN: '/sign-in',
  DASHBOARD: '/dashboard',
  DASHBOARD_SUBSCRIPTION: '/dashboard/subscription',
  DASHBOARD_HEALTH_RECORDS: '/dashboard/health-records',
  DASHBOARD_APPOINTMENTS: '/dashboard/appointments',
  DASHBOARD_LABS: '/dashboard/labs',
  DASHBOARD_MEDICINES: '/dashboard/medicines',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  DASHBOARD_COINS: '/dashboard/coins',
  DASHBOARD_REDEEM_HISTORY: '/dashboard/redeem-history',
} as const;

export type RouteKey = keyof typeof ROUTES;
