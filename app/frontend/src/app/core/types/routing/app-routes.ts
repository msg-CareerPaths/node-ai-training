export const AppRoutes = {
  Auth: { root: 'auth', features: { login: 'login', register: 'register' } },
  Cart: { root: 'cart', features: { overview: 'overview' } },
  Products: {
    root: 'products',
    features: { overview: 'overview', create: 'create', update: 'update' },
  },
  Users: { root: 'users', features: { overview: 'overview' } },
  Reports: {
    root: 'reports',
    features: { overview: 'overview', generate: 'generate' },
  },
  Orders: {
    root: 'orders',
    features: { overview: 'overview', details: 'details' },
  },
} as const;
