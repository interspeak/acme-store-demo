import { PRODUCTS, formatPrice } from './catalog.js?v=__BUILD__';
import { addToCart, cartCount, loadCart } from './cart.js?v=__BUILD__';
import { productArt } from './art.js?v=__BUILD__';

const grid = document.querySelector('#products');
const count = document.querySelector('#cart-count');
const toast = document.querySelector('#toast');

function showCount(cart) {
  const n = cartCount(cart);
  count.textContent = String(n);
  count.hidden = n === 0;
}

grid.innerHTML = PRODUCTS.map(
  (product) => `
  <article class="product">
    ${productArt(product)}
    <div class="product-body">
      <h2>${product.name}</h2>
      <p>${product.blurb}</p>
      <div class="product-foot">
        <span class="price">${formatPrice(product.priceCents)}</span>
        <button type="button" class="button" data-add="${product.id}">Add to cart</button>
      </div>
    </div>
  </article>`,
).join('');

let toastTimer;
grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const cart = addToCart(button.dataset.add);
  showCount(cart);
  const product = PRODUCTS.find((p) => p.id === button.dataset.add);
  toast.innerHTML = `${product.name} added. <a href="cart/">View cart</a>`;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.hidden = true), 4000);
});

showCount(loadCart());
