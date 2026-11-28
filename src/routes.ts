export const ROUTES = {
  CATALOG: '/',
  PART: '/part/:id',
  CART: '/cart',
  ABOUT: '/about',
  NOT_FOUND: '*',
} as const;

export const buildPath = {
  part: (id: string) => `/part/${encodeURIComponent(id)}`,
} as const;

export type PartRouteParams = { id: string };

export const isSearchVisible = (pathname: string): boolean =>
  pathname !== ROUTES.ABOUT;

export const isNavVisible = (pathname: string): boolean =>
  pathname !== ROUTES.ABOUT;
