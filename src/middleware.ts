import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';

export const onRequest = defineMiddleware(async (context, next) => {
  // Fix Keystatic OAuth redirect_uri pour Koyeb/production
  // Workaround pour https://github.com/Thinkmill/keystatic/issues/1022
  const isOAuthRoute =
    context.url.pathname.includes('/github/oauth/') ||
    context.url.pathname.includes('/github/login');

  if (isOAuthRoute) {
    const forwardedHost = context.request.headers.get('x-forwarded-host');
    const forwardedProto = context.request.headers.get('x-forwarded-proto');

    if (forwardedHost && forwardedProto) {
      const correctUrl = new URL(context.url);
      correctUrl.protocol = forwardedProto;
      correctUrl.hostname = forwardedHost;
      correctUrl.port = ''; // Supprimer le port explicitement

      const newRequest = new Request(correctUrl.toString(), {
        method: context.request.method,
        headers: context.request.headers,
        body: context.request.body,
      });

      Object.defineProperty(context, 'url', {
        value: correctUrl,
        writable: false
      });

      Object.defineProperty(context, 'request', {
        value: newRequest,
        writable: false
      });
    }
  }

  const { pathname, hostname, protocol } = context.url;

  // Redirection 301 www → non-www (HTTP et HTTPS)
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.slice(4); // Enlever 'www.'
    const newUrl = new URL(pathname + context.url.search + context.url.hash, `${protocol}//${newHostname}`);
    return context.redirect(newUrl.toString(), 301);
  }

  // Redirection 301 des trailing slashes (sauf root '/')
  // Cette logique s'exécute AVANT la recherche de redirects
  if (pathname !== '/' && pathname.endsWith('/')) {
    const newPath = pathname.slice(0, -1);
    const newUrl = new URL(newPath + context.url.search + context.url.hash, context.url.origin);
    return context.redirect(newUrl.toString(), 301);
  }

  // Charger les redirects depuis redirects.yaml
  const redirectsCollection = await getCollection('redirects');

  if (redirectsCollection.length > 0) {
    const redirectsData = redirectsCollection[0].data;

    // Chercher une correspondance dans les redirects
    const redirect = redirectsData.redirects.find((r: any) => {
      // Normaliser les chemins pour la comparaison
      const fromPath = r.from.startsWith('/') ? r.from : '/' + r.from;
      return pathname === fromPath;
    });

    if (redirect) {
      const statusCode = parseInt(redirect.status) as 301 | 302;
      return context.redirect(redirect.to, statusCode);
    }
  }

  return next();
});
