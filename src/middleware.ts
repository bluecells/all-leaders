import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

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
