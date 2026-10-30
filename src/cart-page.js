import { formatPrice } from './catalog.js?v=__BUILD__';
import { cartCount, cartItems, clearCart, loadCart, setCode, setQuantity } from './cart.js?v=__BUILD__';
import { applyPromo, normalizeCode, subtotalCents } from './promo.js?v=__BUILD__';
import { productArt } from './art.js?v=__BUILD__';

const linesEl = document.querySelector('#lines');
const summaryEl = document.querySelector('#summary');
const emptyEl = document.querySelector('#empty');
const count = document.querySelector('#cart-count');
const form = document.querySelector('#promo-form');
const input = document.querySelector('#promo-code');
const promoMessage = document.querySelector('#promo-message');
const placed = document.querySelector('#placed');

function render() {
  const cart = loadCart();
  const items = cartItems(cart);
  const n = cartCount(cart);
  count.textContent = String(n);
  count.hidden = n === 0;

  emptyEl.hidden = items.length > 0;
  summaryEl.hidden = items.length === 0;

  linesEl.innerHTML = items
    .map(
      (item) => `
    <li class="line">
      ${productArt(item)}
      <div class="line-name">
        <strong>${item.name}</strong>
        <span>${formatPrice(item.priceCents)} each</span>
      </div>
      <div class="qty" aria-label="Quantity of ${item.name}">
        <button type="button" data-qty="${item.id}" data-to="${item.quantity - 1}" aria-label="One less">−</button>
        <span>${item.quantity}</span>
        <button type="button" data-qty="${item.id}" data-to="${item.quantity + 1}" aria-label="One more">+</button>
      </div>
      <span class="line-total">${formatPrice(item.priceCents * item.quantity)}</span>
    </li>`,
    )
    .join('');

  const subtotal = subtotalCents(items);
  let discount = 0;
  promoMessage.textContent = '';
  promoMessage.className = 'promo-message';

  if (cart.code) {
    const result = applyPromo(items, cart.code);
    if (result.ok) {
      discount = result.discountCents;
      promoMessage.textContent = `${result.code} applied: ${result.label}.`;
      promoMessage.classList.add('ok');
    } else {
      promoMessage.textContent = result.message;
      promoMessage.classList.add('error');
    }
  }

  document.querySelector('#subtotal').textContent = formatPrice(subtotal);
  document.querySelector('#discount-row').hidden = discount === 0;
  document.querySelector('#discount').textContent = `−${formatPrice(discount)}`;
  document.querySelector('#total').textContent = formatPrice(subtotal - discount);
}

linesEl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-qty]');
  if (!button) return;
  setQuantity(button.dataset.qty, Number(button.dataset.to));
  render();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const code = normalizeCode(input.value);
  setCode(code === '' ? null : code);
  if (code === '') {
    promoMessage.textContent = 'Enter a promo code.';
    promoMessage.className = 'promo-message error';
    return;
  }
  render();
});

document.querySelector('#place-order').addEventListener('click', () => {
  clearCart();
  input.value = '';
  placed.hidden = false;
  render();
});

const saved = loadCart();
if (saved.code) input.value = saved.code;
render();
