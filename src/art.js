// Simple drawings of each product, so the store needs no image files.

const INK = '#2B2A27';

const DRAWINGS = {
  mug: `
    <rect x="34" y="34" width="44" height="52" rx="6" fill="#FFF8EE" stroke="${INK}" stroke-width="3"/>
    <path d="M78 46 h8 a10 10 0 0 1 0 20 h-8" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M46 24 q4 -6 0 -12 M58 24 q4 -6 0 -12" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <text x="56" y="66" text-anchor="middle" font-family="Georgia, serif" font-size="13" font-weight="700" fill="${INK}">A</text>`,
  tote: `
    <path d="M36 44 h48 l-4 46 h-40 z" fill="#FBF7EC" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M46 44 v-8 a14 14 0 0 1 28 0 v8" fill="none" stroke="${INK}" stroke-width="3"/>
    <rect x="50" y="58" width="20" height="14" rx="2" fill="none" stroke="${INK}" stroke-width="2"/>`,
  notebook: `
    <rect x="36" y="24" width="48" height="66" rx="4" fill="#F4F6FB" stroke="${INK}" stroke-width="3"/>
    <line x1="46" y1="24" x2="46" y2="90" stroke="${INK}" stroke-width="2"/>
    <g fill="${INK}">
      <circle cx="56" cy="40" r="1.6"/><circle cx="64" cy="40" r="1.6"/><circle cx="72" cy="40" r="1.6"/>
      <circle cx="56" cy="50" r="1.6"/><circle cx="64" cy="50" r="1.6"/><circle cx="72" cy="50" r="1.6"/>
      <circle cx="56" cy="60" r="1.6"/><circle cx="64" cy="60" r="1.6"/><circle cx="72" cy="60" r="1.6"/>
    </g>`,
  pen: `
    <g transform="rotate(-35 60 57)">
      <rect x="54" y="18" width="12" height="62" rx="5" fill="#F6E7B0" stroke="${INK}" stroke-width="3"/>
      <path d="M54 80 l6 14 l6 -14" fill="#F6E7B0" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <line x1="66" y1="26" x2="70" y2="26" stroke="${INK}" stroke-width="3"/>
      <line x1="70" y1="26" x2="70" y2="48" stroke="${INK}" stroke-width="3"/>
    </g>`,
};

export function productArt(product) {
  return `<svg viewBox="0 0 120 114" role="img" aria-label="${product.name}" style="background:${product.color}">${DRAWINGS[product.id] ?? ''}</svg>`;
}
