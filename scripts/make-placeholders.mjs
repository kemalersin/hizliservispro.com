import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(dir, { recursive: true });

const desktops = [
  ["desktop-sasi", "Şasi ile araç geçmişi"],
  ["desktop-kupon", "Dijital kupon ve belge"],
  ["desktop-stok", "Stok katmanları ve sipariş"],
  ["desktop-onay", "Garanti talep onayı"],
  ["desktop-bakim", "İlk montaj ve bakım"],
  ["desktop-ag", "Bayi ağı ve yetkiler"],
];

const mobiles = [
  ["mobile-kupon", "Kupon kesimi"],
  ["mobile-bakim", "Bayi bakım kaydı"],
  ["mobile-garanti", "Garanti belgesi"],
];

function xml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function desktopSvg(scene) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-label="${xml("Masaüstü ekran görüntüsü — " + scene)}">
  <defs>
    <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#111111" stroke-opacity=".06"/>
    </pattern>
  </defs>
  <rect width="1600" height="1000" fill="#FAFAFA"/>
  <rect width="1600" height="1000" fill="url(#g)"/>
  <text x="72" y="86" font-family="Outfit, 'Segoe UI', sans-serif" font-size="16" letter-spacing="2.2" fill="#6B7280">MASAÜSTÜ EKRAN GÖRÜNTÜSÜ</text>
  <text x="72" y="148" font-family="Outfit, 'Segoe UI', sans-serif" font-size="40" font-weight="600" fill="#111111">${xml(scene)}</text>
  <g transform="translate(1478 52)" fill="none" stroke="#111111" stroke-opacity=".35" stroke-width="2">
    <rect x="0" y="10" width="44" height="30" rx="7"/>
    <circle cx="22" cy="25" r="8"/>
    <rect x="30" y="4" width="10" height="7" rx="1.5"/>
  </g>
  <text x="1522" y="108" text-anchor="end" font-family="Outfit, sans-serif" font-size="13" fill="#9CA3AF">Görsel eklenecek</text>
  <rect x="72" y="780" width="420" height="12" rx="6" fill="#111111" fill-opacity=".06"/>
  <rect x="72" y="808" width="280" height="12" rx="6" fill="#111111" fill-opacity=".05"/>
  <rect x="72" y="848" width="160" height="72" rx="16" fill="#111111" fill-opacity=".08"/>
  <rect x="248" y="848" width="160" height="72" rx="16" fill="#111111" fill-opacity=".04"/>
  <rect x="424" y="848" width="160" height="72" rx="16" fill="#111111" fill-opacity=".04"/>
</svg>`;
}

function mobileSvg(scene) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844" role="img" aria-label="${xml("Mobil ekran görüntüsü — " + scene)}">
  <defs>
    <pattern id="mg" width="26" height="26" patternUnits="userSpaceOnUse">
      <path d="M26 0H0V26" fill="none" stroke="#111111" stroke-opacity=".06"/>
    </pattern>
  </defs>
  <rect width="390" height="844" fill="#FAFAFA"/>
  <rect width="390" height="844" fill="url(#mg)"/>
  <text x="28" y="56" font-family="Outfit, 'Segoe UI', sans-serif" font-size="11" letter-spacing="1.6" fill="#6B7280">MOBİL EKRAN GÖRÜNTÜSÜ</text>
  <text x="28" y="92" font-family="Outfit, 'Segoe UI', sans-serif" font-size="24" font-weight="600" fill="#111111">${xml(scene)}</text>
  <g transform="translate(338 28)" fill="none" stroke="#111111" stroke-opacity=".35" stroke-width="1.6">
    <rect x="0" y="8" width="28" height="20" rx="5"/>
    <circle cx="14" cy="18" r="5"/>
    <rect x="19" y="3" width="7" height="5" rx="1"/>
  </g>
  <text x="362" y="66" text-anchor="end" font-family="Outfit, sans-serif" font-size="9" fill="#9CA3AF">Görsel eklenecek</text>
  <rect x="28" y="640" width="240" height="10" rx="5" fill="#111111" fill-opacity=".06"/>
  <rect x="28" y="666" width="170" height="10" rx="5" fill="#111111" fill-opacity=".05"/>
  <rect x="28" y="720" width="334" height="56" rx="16" fill="#111111" fill-opacity=".08"/>
</svg>`;
}

for (const [name, scene] of desktops) {
  writeFileSync(join(dir, `${name}.svg`), desktopSvg(scene));
}
for (const [name, scene] of mobiles) {
  writeFileSync(join(dir, `${name}.svg`), mobileSvg(scene));
}

console.log("placeholders written");
