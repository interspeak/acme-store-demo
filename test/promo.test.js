import { test } from 'node:test';
import assert from 'node:assert/strict';

import { applyPromo, itemCount, normalizeCode, subtotalCents } from '../src/promo.js';

const mug = { id: 'mug', priceCents: 1800 };
const tote = { id: 'tote', priceCents: 2400 };
const notebook = { id: 'notebook', priceCents: 1200 };

test('codes ignore case and spaces', () => {
  assert.equal(normalizeCode('  fall27 '), 'FALL27');
  assert.equal(normalizeCode(undefined), '');
});

test('counts items and adds up the subtotal', () => {
  const items = [{ ...mug, quantity: 2 }, { ...tote, quantity: 1 }];
  assert.equal(itemCount(items), 3);
  assert.equal(subtotalCents(items), 6000);
});

test('FALL27 takes 25% off a mug and a tote', () => {
  const result = applyPromo([{ ...mug, quantity: 1 }, { ...tote, quantity: 1 }], 'FALL27');
  assert.equal(result.ok, true);
  assert.equal(result.discountCents, 1050);
});

test('FALL27 takes 25% off a single mug', () => {
  const result = applyPromo([{ ...mug, quantity: 1 }], 'FALL27');
  assert.equal(result.ok, true);
  assert.equal(result.discountCents, 450);
});

test('BUNDLE15 needs three or more items', () => {
  const result = applyPromo([{ ...mug, quantity: 1 }, { ...notebook, quantity: 1 }], 'bundle15');
  assert.equal(result.ok, false);
  assert.equal(result.message, "BUNDLE15 can't be used on this order.");
});

test('BUNDLE15 takes 15% off exactly three items', () => {
  const result = applyPromo([{ ...mug, quantity: 2 }, { ...notebook, quantity: 1 }], 'BUNDLE15');
  assert.equal(result.ok, true);
  assert.equal(result.discountCents, 720);
});

test('BUNDLE15 takes 15% off four items', () => {
  const result = applyPromo([{ ...mug, quantity: 2 }, { ...notebook, quantity: 2 }], 'BUNDLE15');
  assert.equal(result.ok, true);
  assert.equal(result.discountCents, 900);
});

test('an unknown code is refused', () => {
  const result = applyPromo([{ ...mug, quantity: 1 }], 'FREESTUFF');
  assert.equal(result.ok, false);
  assert.equal(result.message, "FREESTUFF isn't a valid promo code.");
});

test('an empty code asks for one', () => {
  assert.equal(applyPromo([{ ...mug, quantity: 1 }], '   ').ok, false);
});
