# Acme Supply Co.

The storefront for Acme Supply Co.: a shop page, a cart and promo codes. Plain HTML, CSS and JavaScript modules, with no build step and no dependencies.

## Run it

```bash
npm start   # http://localhost:4173
npm test
```

## Layout

- `index.html`: the shop
- `cart/index.html`: the cart, promo code and totals
- `src/promo.js`: promo codes and when they apply
- `src/cart.js`: the cart, kept in the browser's local storage
- `src/catalog.js`: products and prices
- `test/`: tests (`node --test`)

## Deploys

Every push to `main` runs the tests and deploys to GitHub Pages (`.github/workflows/deploy.yml`). Pull requests run the tests. The footer shows the commit that's live.
