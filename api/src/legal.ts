import type { Env } from './bindings';
import { buildCorsHeaders, jsonResponse } from './http';

export const LEGAL_EFFECTIVE_ISO = '2026-04-10';

const DEFAULT_WEB_APP = 'https://boardify.mybreakpoint.app';

function canonicalLegalUrl(env: Env, path: 'privacy' | 'terms'): string {
  const base = (env.WEB_APP_URL || DEFAULT_WEB_APP).replace(/\/$/, '');
  return `${base}/${path}`;
}

function stripApiPrefix(pathname: string): string {
  if (pathname === '/api') return '/';
  if (pathname.startsWith('/api/')) {
    return pathname.slice(4) || '/';
  }
  return pathname;
}

export function handleLegal(request: Request, env: Env, pathname: string): Response | null {
  if (request.method !== 'GET') return null;
  const rest = stripApiPrefix(pathname);
  let slug: 'privacy' | 'terms' | null = null;
  if (rest === '/legal/privacy') slug = 'privacy';
  else if (rest === '/legal/terms') slug = 'terms';
  if (!slug) return null;

  const url = canonicalLegalUrl(env, slug);
  const u = new URL(request.url);

  if (u.searchParams.get('format') === 'json') {
    const body =
      slug === 'privacy'
        ? {
            kind: 'privacy_policy' as const,
            title: 'Privacy Policy',
            canonicalUrl: url,
            effectiveDate: LEGAL_EFFECTIVE_ISO,
          }
        : {
            kind: 'terms_of_service' as const,
            title: 'Terms of Service',
            canonicalUrl: url,
            effectiveDate: LEGAL_EFFECTIVE_ISO,
          };
    return jsonResponse(request, body, {}, env);
  }

  const headers = new Headers();
  headers.set('Location', url);
  const cors = buildCorsHeaders(request, env);
  cors.forEach((v, k) => headers.set(k, v));
  return new Response(null, { status: 302, headers });
}
