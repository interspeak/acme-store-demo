export const PRODUCTS = [
  {
    id: 'mug',
    name: 'Acme Mug',
    blurb: 'Stoneware, 12 oz. Keeps coffee warm through one more meeting.',
    priceCents: 1800,
    color: '#E8C9A0',
  },
  {
    id: 'tote',
    name: 'Canvas Tote',
    blurb: 'Heavy cotton with an inside pocket for your keys.',
    priceCents: 2400,
    color: '#B9CDB4',
  },
  {
    id: 'notebook',
    name: 'Dot Notebook',
    blurb: 'A5, 120 pages, lies flat when open.',
    priceCents: 1200,
    color: '#B8C4DE',
  },
  {
    id: 'pen',
    name: 'Brass Pen',
    blurb: 'Solid brass, refillable, gets better with age.',
    priceCents: 3200,
    color: '#E3D39A',
  },
];

export function findProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
