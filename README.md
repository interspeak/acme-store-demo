# Acme Supply Co.

The storefront for Acme Supply Co.: a shop page, a cart and promo codes. Plain HTML, CSS and JavaScript modules, with no dependencies.

## Run it

```bash
npm start   # http://localhost:4173
npm test
npm run build   # the site, stamped with the commit, in _site/
```

## Layout

- `index.html`: the shop
- `cart/index.html`: the cart, promo code and totals
- `src/promo.js`: promo codes and when they apply
- `src/cart.js`: the cart, kept in the browser's local storage
- `src/catalog.js`: products and prices
- `test/`: tests (`node --test`)

## Deploys

Cloudflare Workers Builds deploys every push to `main`: it runs `npm run build`, then `npx wrangler deploy`, which serves `_site/` as static assets (`wrangler.jsonc`). Pull requests run the tests on GitHub Actions. The footer shows the commit that's live.
