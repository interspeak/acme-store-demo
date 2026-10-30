import { findProduct } from './catalog.js?v=__BUILD__';

const KEY = 'acme-cart';

export function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    return { lines: Array.isArray(saved.lines) ? saved.lines : [], code: saved.code ?? null };
  } catch {
    return { lines: [], code: null };
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch {
    // Private windows can refuse storage; the cart just won't survive a reload.
  }
}

export function addToCart(productId) {
  const cart = loadCart();
  const line = cart.lines.find((l) => l.id === productId);
  if (line) line.quantity += 1;
  else cart.lines.push({ id: productId, quantity: 1 });
  saveCart(cart);
  return cart;
}

export function setQuantity(productId, quantity) {
  const cart = loadCart();
  cart.lines = cart.lines
    .map((l) => (l.id === productId ? { ...l, quantity } : l))
    .filter((l) => l.quantity > 0);
  saveCart(cart);
  return cart;
}

export function setCode(code) {
  const cart = loadCart();
  cart.code = code;
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart({ lines: [], code: null });
}

/** Cart lines joined with the catalog, ready to price. */
export function cartItems(cart) {
  return cart.lines
    .map((line) => {
      const product = findProduct(line.id);
      return product ? { ...product, quantity: line.quantity } : null;
    })
    .filter(Boolean);
}

export function cartCount(cart) {
  return cart.lines.reduce((sum, l) => sum + l.quantity, 0);
}
