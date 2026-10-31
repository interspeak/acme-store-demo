// Promo codes and the rules for when they apply.

export const PROMOS = {
  FALL27: { percentOff: 25, minItems: 1, label: 'Fall sale, 25% off' },
  WELCOME10: { percentOff: 10, minItems: 1, label: 'Welcome, 10% off' },
  BUNDLE15: { percentOff: 15, minItems: 3, label: 'Bundle, 15% off 3 or more items' },
};

export function normalizeCode(code) {
  return String(code ?? '').trim().toUpperCase();
}

export function itemCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function subtotalCents(items) {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

/**
 * Checks a code against the cart.
 * Returns { ok: true, code, label, discountCents } or { ok: false, message }.
 */
export function applyPromo(items, rawCode) {
  const code = normalizeCode(rawCode);
  if (code === '') return { ok: false, message: 'Enter a promo code.' };

  const promo = PROMOS[code];
  if (promo === undefined) return { ok: false, message: `${code} isn't a valid promo code.` };

  if (itemCount(items) >= promo.minItems) {
    const discountCents = Math.round((subtotalCents(items) * promo.percentOff) / 100);
    return { ok: true, code, label: promo.label, discountCents };
  }

  return { ok: false, message: `${code} can't be used on this order.` };
}
