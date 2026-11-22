export const ROUTES = {
  HOME: '/',
  PART: '/part/:id',
  CART: '/cart',
  ABOUT: '/about',
  NOT_FOUND: '*',
} as const;

export const buildPath = {
  part: (id: string) => `/part/${encodeURIComponent(id)}`,
} as const;

export type PartRouteParams = { id: string };
