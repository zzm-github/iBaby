export const ENV = 'production';

export function isDev() { return ENV === 'development'; }
export function isProd() { return ENV === 'production'; }
