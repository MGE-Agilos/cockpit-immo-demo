/* Cockpit Immo — démo. Toutes les données viennent de data.js (window.DEMO). */
(() => {
const D = window.DEMO;
const $ = s => document.querySelector(s);
const pad2 = m => String(m).padStart(2, '0');
const kOf = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
const YR = 365.25 * 864e5;
const TODAY = new Date(D.today), NOWK = kOf(TODAY), TY = TODAY.getFullYear();
const RET = new Date(D.client.retraite, 2, 8);
const nf = (v, d = 0) => v.toLocaleString('fr-BE', { minimumFractionDigits: d, maximumFractionDigits: d });
const eur = (v, d = 0) => v == null || isNaN(v) ? '—' : nf(v, d) + ' €';
const eurk = v => Math.abs(v) >= 1e6 ? nf(v / 1e6, 2) + ' M€' : Math.abs(v) >= 1e4 ? nf(Math.round(v / 1000)) + ' k€' : eur(v);
const r1k = v => Math.round(v / 1000) * 1000;
const pct = (v, d = 1) => v == null || !isFinite(v) ? '—' : nf(v * 100, d) + ' %';
const sgn = (v, f = eur) => (v > 0 ? '+' : '') + f(v);
const fdate = s => { if (!s) return ''; const [y, m, d] = s.split('-'); return d ? `${d}/${m}/${y}` : (m ? `${m}/${y}` : y); };
const mlabel = d => d.toLocaleDateString('fr-BE', { month: 'short', year: 'numeric' });
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const initials = s => s.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
const cls = v => v < 0 ? 'neg' : 'pos';

/* ---------- icônes ---------- */
const ICON = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  bank: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4Z"/>',
  piggy: '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
  alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11"/>',
  tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  gauge: '<path d="m12 14 4-4M3.3 19a10 10 0 1 1 17.4 0"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
};
const ic = n => `<svg class="i" viewBox="0 0 24 24">${ICON[n] || ''}</svg>`;

/* ---------- modèle financier ---------- */
const SIM = { g: 0.025, idx: 0.02, infl: 0.02 };

// Tableau d'amortissement mensuel (taux nominal / 12), avec révisions de taux et remboursements anticipés
function amort(c) {
  let r = c.taux / 1200; const n = c.duree_mois;
  let pmt = c.montant * r / (1 - Math.pow(1 + r, -n)), cap = c.montant, taux = c.taux;
  const [y, m] = c.debut.split('-').map(Number);
  const rev = Object.fromEntries((c.revisions || []).map(v => [v.debut, v.taux]));
  const rem = Object.fromEntries((c.remboursements || []).map(v => [v.mois, v.montant]));
  const rows = [];
  for (let i = 0; i < n && cap > 0.005; i++) {
    const d = new Date(y, m - 1 + i, 1), k = kOf(d);
    if (k in rev) { taux = rev[k]; r = taux / 1200; pmt = cap * r / (1 - Math.pow(1 + r, -(n - i))); }
    let extra = 0;
    if (k in rem) { extra = Math.min(rem[k], cap); cap -= extra; pmt = cap * r / (1 - Math.pow(1 + r, -(n - i))); }
    const it = cap * r, pr = Math.min(pmt - it, cap); cap -= pr;
    rows.push({ d, k, y: d.getFullYear(), cap, pmt: it + pr, it, pr, extra, taux });
  }
  return rows;
}

const BIENS = D.biens.map(b => {
  const T0 = new Date(b.achat.date), T0y = T0.getFullYear();
  const loans = b.credits.map(c => ({ c, rows: amort(c) }));
  const capAt = (l, d) => { let v = l.c.montant; for (const r of l.rows) { if (r.d > d) break; v = r.cap; } return v; };
  const dette = d => d < T0 ? 0 : loans.reduce((s, l) => s + capAt(l, d), 0);
  const pts = b.valeurs.map(([d, v]) => ({ t: new Date(d), v }));
  const valeur = d => {
    if (d < T0) return 0;
    if (d <= pts[0].t) return pts[0].v;
    for (let i = 1; i < pts.length; i++) if (d <= pts[i].t) { const a = pts[i - 1], z = pts[i]; return a.v * Math.pow(z.v / a.v, (d - a.t) / (z.t - a.t)); }
    const Z = pts[pts.length - 1]; return Z.v * Math.pow(1 + SIM.g, (d - Z.t) / YR);
  };
  const loyerU = (u, k) => {
    if (k < u.bail.debut.slice(0, 7)) return 0;
    if (u.vacant_depuis && k >= u.vacant_depuis) return 0;
    let v = 0; for (const l of u.loyers) if (l.du <= k) v = l.loyer; return v;
  };
  const loyersMois = k => b.unites.reduce((s, u) => s + loyerU(u, k), 0);
  const potentielMois = () => b.unites.reduce((s, u) => s + (u.vacant_depuis ? (u.loyer_cible || u.loyers.at(-1).loyer) : loyerU(u, NOWK)), 0);
  const S = b.saisonnier;
  const saisonBrut = y => { if (!S) return 0; const a = S.annees.find(x => x.annee === y); if (a) return a.brut; const Z = S.annees.at(-1); return y > Z.annee ? Z.brut * Math.pow(1 + SIM.idx, y - Z.annee) : 0; };
  const revenusAn = y => {
    if (y < T0y) return 0;
    if (S) return saisonBrut(y) * (1 - S.commission);
    if (!b.unites.length) return 0;
    if (y > TY) return potentielMois() * 12 * Math.pow(1 + SIM.idx, y - TY);
    let s = 0; for (let m = 1; m <= 12; m++) s += loyersMois(`${y}-${pad2(m)}`); return s;
  };
  const chargesBase = b.charges.reduce((s, c) => s + c.annuel, 0);
  const chargesAn = y => y < T0y ? 0 : chargesBase * Math.pow(1 + SIM.infl, y - TY) * (y === T0y ? (12 - T0.getMonth()) / 12 : 1);
  const creditAn = y => loans.reduce((a, l) => { l.rows.filter(r => r.y === y).forEach(r => { a.it += r.it; a.pr += r.pr; a.extra += r.extra; }); return a; }, { it: 0, pr: 0, extra: 0 });
  const pmtMois = k => loans.reduce((s, l) => s + (l.rows.find(r => r.k === k)?.pmt || 0), 0);
  const fin = loans.length ? new Date(Math.max(...loans.map(l => l.rows.at(-1).d))) : null;
  const fraisAchat = b.achat.frais.reduce((s, f) => s + f.montant, 0);
  const cout = b.achat.prix + fraisAchat + (b.achat.travaux_initiaux || 0);
  const lignes = () => {
    const L = [];
    if (b.unites.length) L.push(['Loyers perçus', loyersMois(NOWK), 'rev']);
    if (S) L.push(['Location saisonnière (net d’agence, moyenne)', saisonBrut(TY) * (1 - S.commission) / 12, 'rev']);
    loans.forEach(l => { const r = l.rows.find(r => r.k === NOWK); if (r) L.push([`Mensualité ${l.c.banque}`, -r.pmt, 'credit']); });
    b.charges.forEach(c => L.push([c.poste, -c.annuel / 12, c.cat]));
    return L;
  };
  const cashMois = () => lignes().reduce((s, [, v]) => s + v, 0);
  const locatif = b.unites.length > 0 || !!S;
  const revenuActuelAn = S ? saisonBrut(TY) * (1 - S.commission) : loyersMois(NOWK) * 12;
  const revenuPotAn = S ? revenuActuelAn : potentielMois() * 12;
  const tauxActuel = () => { for (const l of loans) { const r = l.rows.find(x => x.k >= NOWK); if (r) return r.taux; } return null; };
  return Object.assign({}, b, { T0, loans, dette, valeur, loyerU, loyersMois, potentielMois, saisonBrut, revenusAn, chargesAn, chargesBase, creditAn, pmtMois, fin, fraisAchat, cout, lignes, cashMois, locatif, revenuActuelAn, revenuPotAn, tauxActuel });
});
const byId = id => BIENS.find(b => b.id === id);

/* ---------- état ---------- */
let MODE = 'foyer';
const q = b => MODE === 'part' ? b.quote : 1;
const sum = (f) => BIENS.reduce((s, b) => s + f(b) * q(b), 0);
const ALL_ALERTS = BIENS.flatMap(b => b.alertes.map(a => ({ b, a })));
const ALL_DOCS = BIENS.flatMap(b => b.docs.map(d => ({ b, ...d }))).sort((x, y) => y.d.localeCompare(x.d));
const CAT = { achat: ['Achat', '--c1'], credit: ['Crédit', '--c4'], location: ['Location', '--c3'], travaux: ['Travaux', '--c2'], copro: ['Copropriété', '--accent'], certificat: ['Certificat', '--gold'], entretien: ['Entretien', '--muted'] };
const ORD = { haut: 0, moyen: 1, info: 2 };
const LVL = { haut: 'Urgent', moyen: 'À suivre', info: 'Info' };

/* ---------- illustrations (SVG, pas de photos nécessaires) ---------- */
let UID = 0;
function illus(type) {
  const u = 'g' + (++UID);
  const svg = inner => `<svg class="ill" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;
  const sky = (a, b) => `<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7fb5"/><stop offset="1" stop-color="#245a8a"/></linearGradient></defs><rect width="800" height="400" fill="url(#${u}s)"/>`;
  const cloud = (x, y, s = 1) => `<g fill="#fff" opacity=".75" transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="46" ry="16"/><ellipse cx="28" cy="-10" rx="30" ry="18"/><ellipse cx="-26" cy="-6" rx="24" ry="13"/></g>`;
  const win = (x, y, w, h, lit) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${lit ? '#f8d77e' : '#a9c4dc'}" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`;
  const tree = (x, y, s = 1, c = '#3f7a45') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="0" width="10" height="46" fill="#6a4a32"/><circle cx="0" cy="-14" r="34" fill="${c}"/><circle cx="-22" cy="4" r="24" fill="${c}"/><circle cx="22" cy="2" r="26" fill="${c}"/><circle cx="6" cy="-30" r="22" fill="#5b9a55" opacity=".6"/></g>`;
  if (type === 'maison') {
    let w = '';
    [[410, 222], [470, 222], [560, 222], [620, 222]].forEach(([x, y], i) => w += win(x, y, 38, 46, i % 2));
    return svg(sky('#6f9fd8', '#dce9f6') + cloud(180, 80) + cloud(560, 60, .8) + `<circle cx="700" cy="80" r="32" fill="#fff4c9" opacity=".9"/>
      <g fill="#5b8f57" opacity=".7"><ellipse cx="90" cy="280" rx="140" ry="70"/><ellipse cx="760" cy="270" rx="150" ry="80"/></g>
      <rect y="300" width="800" height="100" fill="#79ad5f"/><path d="M0 330 Q400 300 800 335 V400 H0Z" fill="#6aa052"/>
      <rect x="296" y="232" width="100" height="78" fill="#e6dccb"/><polygon points="286,236 346,196 406,236" fill="#555c68"/>
      <rect x="318" y="262" width="56" height="48" fill="#8b9098"/><g stroke="#767b84" stroke-width="2">${[270, 282, 294].map(y => `<line x1="318" y1="${y}" x2="374" y2="${y}"/>`).join('')}</g>
      <rect x="390" y="200" width="270" height="110" fill="#f1e8d8"/><polygon points="372,206 444,142 610,142 680,206" fill="#4a505b"/>
      <rect x="590" y="122" width="22" height="40" fill="#8d5e48"/><polygon points="492,166 512,146 532,166" fill="#5b616c"/><rect x="498" y="164" width="28" height="24" fill="#f8d77e" stroke="#fff" stroke-width="2"/>
      ${w}<rect x="515" y="248" width="34" height="62" rx="3" fill="#5d4130"/><circle cx="541" cy="280" r="2.5" fill="#e8c46a"/>
      <path d="M532 310 L500 400 H580 L548 310Z" fill="#d9cdb6"/>
      <rect x="380" y="298" width="125" height="18" rx="9" fill="#3f7a45"/><rect x="570" y="298" width="110" height="18" rx="9" fill="#3f7a45"/>
      ${tree(205, 262, 1.3)}${tree(740, 270, 1)}${tree(110, 300, .8, '#4b8a4b')}`);
  }
  if (type === 'appart') {
    const cols = ['#a8452f', '#d29a4b', '#efe3c8', '#8f3b2c', '#c76b3d'], heights = [150, 120, 160, 130, 145];
    let g = '';
    cols.forEach((c, i) => {
      const x = 240 + i * 110, w = 110, top = heights[i], n = 4, sw = w / (2 * n + 2), h = 15;
      const p = [[x, 330], [x, top]];
      for (let k = 0; k < n; k++) { p.push([x + k * sw, top - (k + 1) * h]); p.push([x + (k + 1) * sw, top - (k + 1) * h]); }
      for (let k = n - 1; k >= 0; k--) { p.push([x + w - (k + 1) * sw, top - (k + 1) * h]); p.push([x + w - k * sw, top - (k + 1) * h]); p.push([x + w - k * sw, top - k * h]); }
      p.push([x + w, 330]);
      g += `<polygon points="${p.map(a => a.join(',')).join(' ')}" fill="${c}" stroke="#00000022" stroke-width="2"/>`;
      for (let y = top + 16; y < 300; y += 44) for (let j = 0; j < 2; j++) g += win(x + 22 + j * 40, y, 26, 32, (i + j + y) % 3 === 0);
    });
    return svg(sky('#f2b98d', '#9cc6ea') + cloud(140, 70, .9) + `<circle cx="150" cy="150" r="40" fill="#ffe0a8" opacity=".85"/>
      <g fill="#6b7d8f" opacity=".45"><rect x="0" y="200" width="250" height="130"/><polygon points="60,200 90,130 120,200"/><rect x="84" y="90" width="12" height="60"/></g>
      ${g}<rect y="318" width="800" height="16" fill="#8d8a84"/><rect y="334" width="800" height="66" fill="url(#${u}w)"/>
      <g stroke="#cfe3f5" stroke-opacity=".5" stroke-width="3">${[350, 366, 382].map((y, i) => `<line x1="${60 + i * 90}" y1="${y}" x2="${200 + i * 120}" y2="${y}"/><line x1="${460 + i * 40}" y1="${y + 6}" x2="${620 + i * 50}" y2="${y + 6}"/>`).join('')}</g>`);
  }
  if (type === 'immeuble') {
    let w = '';
    for (let f = 0; f < 3; f++) for (let j = 0; j < 3; j++) w += win(418 + j * 70, 100 + f * 52, 34, 38, (f + j) % 3 === 1);
    let stripes = ''; for (let i = 0; i < 9; i++) stripes += `<polygon points="${400 + i * 26},262 ${426 + i * 26},262 ${432 + i * 26},286 ${394 + i * 26},286" fill="${i % 2 ? '#fff' : '#c8483a'}"/>`;
    return svg(sky('#7fa7cf', '#e2ecf5') + cloud(620, 70) + cloud(220, 50, .7) + `
      <path d="M0 250 Q140 140 330 150 Q520 160 800 220 V400 H0Z" fill="#577556"/><path d="M90 196 h170 v-22 h12 v-10 h12 v10 h12 v22 h40 v16 H90Z" fill="#9c9a8e"/>
      <rect x="250" y="150" width="140" height="180" fill="#d8c7a8"/>${[0, 1].map(f => [0, 1].map(j => win(270 + j * 60, 175 + f * 60, 30, 36, false)).join('')).join('')}
      <rect x="650" y="130" width="150" height="200" fill="#b9c3c9"/>${[0, 1, 2].map(f => [0, 1].map(j => win(672 + j * 60, 150 + f * 55, 30, 36, f === 1 && j)).join('')).join('')}
      <rect x="390" y="80" width="260" height="250" fill="#efe4cf"/><polygon points="380,84 404,46 636,46 660,84" fill="#475061"/>
      ${[0, 1, 2].map(j => `<rect x="${428 + j * 70}" y="54" width="18" height="22" fill="#f8d77e" stroke="#fff" stroke-width="2"/>`).join('')}
      <rect x="380" y="80" width="280" height="8" fill="#d6c7ab"/>${w}<rect x="380" y="252" width="280" height="8" fill="#d6c7ab"/>
      ${stripes}<rect x="408" y="290" width="160" height="40" fill="#7fb0d4" stroke="#fff" stroke-width="3"/><rect x="590" y="288" width="42" height="42" fill="#5d4130"/>
      <g fill="#e4688c"><circle cx="425" cy="318" r="7"/><circle cx="445" cy="320" r="7"/><circle cx="545" cy="318" r="7"/></g><g fill="#f2c94c"><circle cx="435" cy="314" r="6"/><circle cx="555" cy="314" r="6"/></g>
      <rect y="330" width="800" height="14" fill="#b8b3a8"/><rect y="344" width="800" height="56" fill="#6d7075"/><g stroke="#e9e5da" stroke-width="4" stroke-dasharray="40 30"><line x1="0" y1="374" x2="800" y2="374"/></g>`);
  }
  // côte
  let bal = '';
  for (let f = 0; f < 11; f++) { const y = 82 + f * 21; bal += `<rect x="448" y="${y}" width="150" height="13" fill="${f % 4 === 1 ? '#f8d77e' : '#8fb9d6'}"/><rect x="442" y="${y + 13}" width="162" height="4" fill="#fff"/>`; }
  return svg(sky('#86c3ec', '#eaf6fd') + cloud(200, 90) + cloud(640, 55, .7) + `<circle cx="120" cy="90" r="34" fill="#fff6cf"/>
    <rect y="250" width="800" height="66" fill="url(#${u}w)"/><g stroke="#fff" stroke-opacity=".55" stroke-width="3">${[262, 278, 294].map((y, i) => `<line x1="${30 + i * 70}" y1="${y}" x2="${150 + i * 70}" y2="${y}"/><line x1="${640 - i * 40}" y1="${y + 4}" x2="${760 - i * 30}" y2="${y + 4}"/>`).join('')}</g>
    <polygon points="70,250 110,226 150,250" fill="#fff" opacity=".9"/><line x1="110" y1="226" x2="110" y2="252" stroke="#556" stroke-width="2"/>
    <rect x="300" y="150" width="130" height="168" fill="#dcdfe2"/>${[0, 1, 2, 3, 4, 5].map(f => `<rect x="306" y="${160 + f * 25}" width="118" height="12" fill="#9cc0d8"/>`).join('')}
    <rect x="618" y="170" width="120" height="148" fill="#e6e1d8"/>${[0, 1, 2, 3, 4].map(f => `<rect x="624" y="${180 + f * 26}" width="108" height="12" fill="#9cc0d8"/>`).join('')}
    <rect x="436" y="66" width="174" height="252" fill="#f6f6f3"/><rect x="430" y="60" width="186" height="10" fill="#d9dcdf"/>${bal}
    <rect y="312" width="800" height="12" fill="#c7c1b4"/><rect y="324" width="800" height="76" fill="#ecd9a6"/>
    ${[90, 150, 210, 650, 710].map((x, i) => `<rect x="${x}" y="336" width="34" height="28" fill="${['#e66b5b', '#4c8fd6', '#f2c94c', '#3fa37a', '#e66b5b'][i]}"/><polygon points="${x - 3},338 ${x + 17},326 ${x + 37},338" fill="#fff"/>`).join('')}
    <line x1="400" y1="330" x2="400" y2="372" stroke="#7a5a3a" stroke-width="3"/><path d="M370 336 Q400 312 430 336Z" fill="#e66b5b"/>`);
}

// Photo réelle du bien (avec crédit, exigé par les licences Creative Commons) ; illustration SVG à défaut
const visu = (b, lien = true) => b.photo
  ? `<img class="ill" src="${esc(b.photo.src)}" alt="" loading="lazy" style="object-position:${esc(b.photo.pos || 'center')}">${lien ? `<a class="credit" href="${esc(b.photo.source)}" target="_blank" rel="noopener">` : '<span class="credit">'}Photo d’illustration · ${esc(b.photo.auteur)} · ${esc(b.photo.licence)}${lien ? '</a>' : '</span>'}`
  : illus(b.type);

/* ---------- graphiques ---------- */
let CHARTS = [], AFTER = [];
const later = f => AFTER.push(f);
function chart(id, cfg) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!window.Chart) { el.parentElement.innerHTML = '<p class="muted small">Graphique indisponible hors connexion (Chart.js).</p>'; return; }
  Chart.defaults.font.family = '"Plus Jakarta Sans",system-ui,sans-serif';
  Chart.defaults.color = css('--muted');
  if (/[?&]capture\b/.test(location.search)) Chart.defaults.animation = false;   // captures d'écran du guide
  CHARTS.push(new Chart(el, cfg));
}
const nowMarker = (getIndex, label = 'Aujourd’hui') => ({
  id: 'now' + Math.random(), afterDatasetsDraw(c) {
    const i = getIndex(); if (i < 0) return;
    const { ctx, chartArea: a, scales: { x } } = c, px = x.getPixelForValue(i);
    ctx.save(); ctx.strokeStyle = css('--muted'); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(px, a.top); ctx.lineTo(px, a.bottom); ctx.stroke();
    ctx.setLineDash([]); ctx.fillStyle = css('--muted'); ctx.font = '600 11px "Plus Jakarta Sans",sans-serif'; ctx.fillText(label, px + 6, a.top + 12); ctx.restore();
  }
});
const yEur = { ticks: { callback: v => eurk(v) }, grid: { color: () => css('--line') } };
const quarters = (from, to) => { const r = []; for (let d = new Date(from.getFullYear(), Math.floor(from.getMonth() / 3) * 3, 1); d <= to; d = new Date(d.getFullYear(), d.getMonth() + 3, 1)) r.push(d); return r; };
const alpha = (c, a) => { const m = c.match(/^#([0-9a-f]{6})$/i); if (!m) return c; const n = parseInt(m[1], 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };

function netChart(id, to, marks = []) {
  const from = new Date(Math.min(...BIENS.map(b => b.T0)));
  const dates = quarters(from, to);
  const iNow = dates.findIndex(d => d > TODAY);
  const ds = BIENS.map(b => ({ label: b.nom, data: dates.map(d => Math.max(0, b.valeur(d) - b.dette(d)) * q(b)), borderColor: css(b.couleur), backgroundColor: alpha(css(b.couleur), .28), fill: true, borderWidth: 2, tension: .25, pointRadius: 0, stack: 'net' }));
  ds.push({ label: 'Dettes totales', data: dates.map(d => sum(b => b.dette(d))), borderColor: css('--c5'), borderDash: [6, 4], borderWidth: 2, fill: false, tension: .25, pointRadius: 0, stack: 'dette' });
  const plugins = [nowMarker(() => iNow), ...marks.map(([d, l]) => nowMarker(() => dates.findIndex(x => x > d), l))];
  chart(id, { type: 'line', plugins, data: { labels: dates.map(mlabel), datasets: ds },
    options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
      plugins: { legend: { labels: { boxWidth: 10, usePointStyle: true } }, tooltip: { callbacks: { label: c => `${c.dataset.label} : ${eur(c.parsed.y)}`, footer: it => `Patrimoine net : ${eur(it.filter(c => c.dataset.stack === 'net').reduce((s, c) => s + c.parsed.y, 0))}` } } },
      scales: { x: { ticks: { maxRotation: 0, autoSkipPadding: 28 }, grid: { display: false } }, y: { ...yEur, stacked: true } } } });
}

/* ---------- composants ---------- */
const kpi = ([l, v, s, i, c]) => `<div class="card kpi" style="--kc:var(${c})"><div class="ic">${ic(i)}</div><div class="l">${l}</div><div class="v">${v}</div><div class="s">${s}</div></div>`;
const tagB = b => `<span class="tag b" style="--tc:var(${b.couleur})">${esc(b.nom)}</span>`;
const alertCard = (a, b) => `<div class="alert ${a.niveau}"><div class="ai">${ic(a.niveau === 'info' ? 'info' : 'alert')}</div><div>${b ? tagB(b) : ''}<b>${esc(a.titre)}</b> <span class="st ${a.niveau === 'haut' ? 'bad' : a.niveau === 'moyen' ? 'warn' : 'info'}">${LVL[a.niveau]}</span><p>${esc(a.texte)}</p></div></div>`;
const segMode = () => `<div class="seg"><button data-act="mode" data-v="foyer" class="${MODE === 'foyer' ? 'on' : ''}">Foyer</button><button data-act="mode" data-v="part" class="${MODE === 'part' ? 'on' : ''}">Ma part</button></div>`;
const docRow = d => `<div class="doc" data-act="doc" data-n="${esc(d.n)}"><div class="fi">PDF</div><div><div class="nm">${esc(d.n)}</div><div class="mt">${d.b ? tagB(d.b) : ''}${esc(d.cat)} · ${fdate(d.d)}</div></div><div class="sz">${esc(d.sz)}</div></div>`;
function certStatus(e) {
  const days = (new Date(e) - TODAY) / 864e5;
  if (days < 0) return ['bad', 'Expiré'];
  if (days <= 60) return ['bad', 'À renouveler'];
  if (days <= 180) return ['warn', 'Bientôt'];
  return ['ok', 'Valide'];
}
const TRAV = { fait: ['ok', 'Réalisé'], 'en cours': ['info', 'En cours'], prévu: ['warn', 'Prévu'], devis: ['info', 'Devis'] };

/* ---------- vues ---------- */
function viewHome() {
  const val = sum(b => b.valeur(TODAY)), det = sum(b => b.dette(TODAY)), net = val - det;
  const ago = new Date(TODAY - YR), net1 = sum(b => b.valeur(ago) - b.dette(ago));
  const revAn = sum(b => b.revenuActuelAn), cash = sum(b => b.cashMois());
  const loc = BIENS.filter(b => b.locatif);
  const cashLoc = loc.reduce((s, b) => s + b.cashMois() * q(b), 0);
  const capLoc = loc.reduce((s, b) => s + b.loans.reduce((t, l) => t + (l.rows.find(r => r.k === NOWK)?.pr || 0), 0) * q(b), 0);
  const valLoc = loc.reduce((s, b) => s + b.valeur(TODAY) * q(b), 0);
  const netLoc = loc.reduce((s, b) => s + (b.revenuActuelAn - b.chargesBase) * q(b), 0);
  const pv = sum(b => b.valeur(TODAY) - b.cout);
  const fin = new Date(Math.max(...BIENS.filter(b => b.fin).map(b => b.fin)));
  const hauts = ALL_ALERTS.filter(x => x.a.niveau === 'haut').length;
  later(() => netChart('chNet', new Date(2041, 0, 1), [[RET, 'Retraite']]));
  later(drawAlloc);
  later(drawFlux);
  const evs = BIENS.flatMap(b => b.evenements.map(e => ({ b, e })));
  const next = evs.filter(x => new Date(x.e.date) > TODAY).sort((x, y) => x.e.date.localeCompare(y.e.date)).slice(0, 7);
  const past = evs.filter(x => new Date(x.e.date) <= TODAY).sort((x, y) => y.e.date.localeCompare(x.e.date)).slice(0, 5);
  return `
  <div class="head"><div><h1>Bonjour ${esc(D.client.prenom)}</h1><p class="lead">Synthèse de votre patrimoine immobilier au ${fdate(D.today)} · ${BIENS.length} biens en Belgique${MODE === 'part' ? ' · vue « ma part » (quotes-parts en indivision)' : ''}</p></div>
    <div class="actions">${segMode()}<button class="btn" data-act="print">${ic('print')} Exporter</button><button class="btn gold" data-act="advisor">${ic('chat')} Contacter ${esc(D.conseiller.nom.split(' ')[0])}</button></div></div>

  <div class="banner"><div class="eyebrow">Patrimoine immobilier net</div><div class="big">${eur(r1k(net))}</div>
    <span class="delta">${ic('trend')} ${sgn(r1k(net - net1))} sur 12 mois (${sgn((net - net1) / net1, v => pct(v))})</span>
    <div class="row"><div><small>Valeur estimée des biens</small><b>${eur(r1k(val))}</b></div><div><small>Capital restant dû</small><b>${eur(r1k(det))}</b></div><div><small>Taux d’endettement (LTV)</small><b>${pct(det / val)}</b></div><div><small>Crédits remboursés en</small><b>${fdate(kOf(fin))}</b></div></div></div>

  ${hauts ? `<div class="alert haut" style="margin-bottom:16px"><div class="ai">${ic('alert')}</div><div><b>${hauts} point${hauts > 1 ? 's' : ''} urgent${hauts > 1 ? 's' : ''} sur vos biens</b><p>${ALL_ALERTS.filter(x => x.a.niveau === 'haut').map(x => `${esc(x.b.nom)} : ${esc(x.a.titre)}`).join(' · ')}</p></div></div>` : ''}

  <div class="grid k4">${[
    ['Revenus locatifs nets d’agence', eur(r1k(revAn)) + '<span class="small muted"> /an</span>', `${eur(sum(b => b.revenuPotAn) - revAn)} /an perdus à cause de la vacance`, 'key', '--c3'],
    ['Cash-flow des biens de rapport', `<span class="${cls(cashLoc)}">${eur(cashLoc)}</span><span class="small muted"> /mois</span>`, `Dont ${eur(capLoc)} de capital remboursé (épargne) · résidence principale : ${eur(cash - cashLoc)} /mois`, 'wallet', '--c2'],
    ['Rendement locatif net', pct(netLoc / valLoc), `Sur ${loc.length} biens de rapport, après charges et impôts, avant crédit`, 'trend', '--c1'],
    ['Plus-value latente', `<span class="${cls(pv)}">${sgn(r1k(pv))}</span>`, 'Valeur estimée − prix, frais d’acte et travaux initiaux', 'piggy', '--c4']
  ].map(kpi).join('')}</div>

  <div class="grid k21" style="margin-top:16px">
    <div class="card"><span class="ctitle">Évolution du patrimoine net</span><span class="small muted">Valeur estimée − capital restant dû, empilé par bien. Projection : prix +${pct(SIM.g)}/an (modifiable dans le simulateur).</span><div class="chartbox tall"><canvas id="chNet"></canvas></div></div>
    <div class="card"><span class="ctitle">Répartition</span><span class="small muted">Part de chaque bien dans la valeur totale</span><div class="donut" style="margin-top:12px"><canvas id="chAlloc"></canvas><div class="c"><div><b>${eurk(val)}</b><span>valeur totale</span></div></div></div>
      <div class="legend">${BIENS.map(b => `<div><i style="background:var(${b.couleur})"></i>${esc(b.nom)} <span class="muted small">· ${esc(b.region)}</span><b>${pct(b.valeur(TODAY) * q(b) / val, 0)}</b></div>`).join('')}</div>
      <div class="note">Exposition régionale : ${['Bruxelles', 'Flandre', 'Wallonie'].map(r => `${r} ${pct(BIENS.filter(b => b.region === r).reduce((s, b) => s + b.valeur(TODAY) * q(b), 0) / val, 0)}`).join(' · ')}</div></div>
  </div>

  <h3>Vos biens</h3>
  <div class="grid k2">${BIENS.map(bienCard).join('')}</div>

  <h3>Performance par bien</h3>
  <div class="card tw"><table><thead><tr><th>Bien</th><th class="n">Valeur</th><th class="n">Dette</th><th class="n">Net</th><th class="n">LTV</th><th class="n">Revenus /an</th><th class="n">Rdt brut</th><th class="n">Rdt net</th><th class="n">Plus-value</th><th class="n">Solde /mois</th></tr></thead><tbody>
    ${BIENS.map(b => { const v = b.valeur(TODAY), d = b.dette(TODAY), Q = q(b), c = b.cashMois(); return `<tr class="click" onclick="location.hash='#/bien/${b.id}'"><td>${tagB(b)}<span class="small muted">${esc(b.usage)}${Q < 1 ? ` · ${Q * 100} %` : ''}</span></td><td class="n">${eurk(v * Q)}</td><td class="n">${eurk(d * Q)}</td><td class="n"><b>${eurk((v - d) * Q)}</b></td><td class="n">${pct(d / v, 0)}</td><td class="n">${b.locatif ? eur(r1k(b.revenuActuelAn * Q)) : '—'}</td><td class="n">${b.locatif ? pct(b.revenuPotAn / v) : '—'}</td><td class="n">${b.locatif ? pct((b.revenuActuelAn - b.chargesBase) / v) : '—'}</td><td class="n ${cls(v - b.cout)}">${sgn(r1k((v - b.cout) * Q), eurk)}</td><td class="n ${cls(c)}">${eur(c * Q)}</td></tr>`; }).join('')}
    <tr class="tot"><td>Total</td><td class="n">${eurk(val)}</td><td class="n">${eurk(det)}</td><td class="n">${eurk(net)}</td><td class="n">${pct(det / val, 0)}</td><td class="n">${eur(r1k(revAn))}</td><td class="n"></td><td class="n">${pct(netLoc / valLoc)}</td><td class="n ${cls(pv)}">${sgn(r1k(pv), eurk)}</td><td class="n ${cls(cash)}">${eur(cash)}</td></tr></tbody></table>
    <div class="note">Rendement brut : loyers potentiels (vacance comprise) / valeur estimée. Rendement net : revenus perçus − charges, précompte et impôts, hors crédit.</div></div>

  <div class="grid k2" style="margin-top:34px">
    <div><h3 style="margin-top:0">Points d’attention</h3><div class="alerts">${ALL_ALERTS.sort((x, y) => ORD[x.a.niveau] - ORD[y.a.niveau]).map(({ a, b }) => alertCard(a, b)).join('')}</div></div>
    <div><h3 style="margin-top:0">Agenda</h3><div class="card feed small">
      ${next.map(({ b, e }) => `<div><span class="dt"><b>${fdate(e.date)}</b></span><span>${tagB(b)}<b>${esc(e.titre)}</b></span></div>`).join('')}
      <div style="border:0;padding-top:16px"><span class="muted small" style="font-weight:700;text-transform:uppercase;letter-spacing:.5px">Récemment</span></div>
      ${past.map(({ b, e }) => `<div><span class="dt">${fdate(e.date)}</span><span>${tagB(b)}${esc(e.titre)}</span></div>`).join('')}</div>
      <div class="card hl" style="margin-top:16px"><span class="ctitle">${ic('cal')} Prochain rendez-vous</span><div>${fdate(D.conseiller.prochain_rdv)} avec ${esc(D.conseiller.nom)} — revue annuelle du patrimoine.</div><div class="note" style="color:inherit;opacity:.8">Ordre du jour suggéré : relocation du duplex de Namur, quote-part de la façade à Knokke, financement du photovoltaïque à Uccle.</div></div></div>
  </div>

  <h3>Revenus et dépenses de l’immobilier</h3>
  <div class="grid k21">
    <div class="card"><span class="ctitle">Flux annuels</span><span class="small muted">Revenus locatifs, charges (précompte, copropriété, assurances, énergie, impôts) et crédits</span><div class="chartbox"><canvas id="chFlux"></canvas></div></div>
    <div class="card"><span class="ctitle">Budget du mois</span><table style="margin-top:8px"><tbody>
      ${BIENS.map(b => { const L = b.lignes(), Q = q(b); const r = L.filter(x => x[1] > 0).reduce((s, x) => s + x[1], 0), cr = L.filter(x => x[2] === 'credit').reduce((s, x) => s + x[1], 0), ch = L.filter(x => x[1] < 0 && x[2] !== 'credit').reduce((s, x) => s + x[1], 0); return `<tr><td>${tagB(b)}<div class="small muted" style="margin-top:3px">${r ? `+${eur(r * Q)} revenus · ` : ''}${cr ? `${eur(cr * Q)} crédit · ` : ''}${eur(ch * Q)} charges</div></td><td class="n ${cls(r + cr + ch)}"><b>${eur((r + cr + ch) * Q)}</b></td></tr>`; }).join('')}
      <tr class="tot"><td>Solde mensuel</td><td class="n ${cls(cash)}">${eur(cash)}</td></tr></tbody></table>
      <div class="note">Dont ${eur(sum(b => b.loans.reduce((s, l) => s + (l.rows.find(r => r.k === NOWK)?.pr || 0), 0)))} de capital remboursé ce mois-ci : c’est de l’épargne qui augmente votre patrimoine net.</div></div>
  </div>`;
}

function bienCard(b) {
  const Q = q(b), v = b.valeur(TODAY) * Q, d = b.dette(TODAY) * Q, pv = (b.valeur(TODAY) - b.cout) * Q, c = b.cashMois() * Q;
  const hauts = b.alertes.filter(a => a.niveau === 'haut').length;
  return `<a class="card bien" href="#/bien/${b.id}"><div class="ph">${visu(b, false)}<div class="tagw"><span>${esc(b.usage)}</span>${MODE === 'part' && b.quote < 1 ? `<span>${b.quote * 100} %</span>` : ''}${hauts ? `<span class="r">${hauts} urgent${hauts > 1 ? 's' : ''}</span>` : ''}</div><div><h2>${esc(b.nom)}</h2><p>${esc(b.cp)} · ${esc(b.desc)}</p></div></div>
    <div class="body"><div class="figs">
      <div><small>Valeur estimée</small><b>${eur(r1k(v))}</b></div><div><small>Capital restant dû</small><b>${eur(d)}</b></div><div><small>Patrimoine net</small><b>${eur(r1k(v - d))}</b></div>
      <div><small>Acheté en</small><b>${b.T0.getFullYear()}</b></div><div><small>Plus-value latente</small><b class="${cls(pv)}">${sgn(r1k(pv))}</b></div><div><small>${b.locatif ? 'Solde mensuel' : 'Coût mensuel'}</small><b class="${cls(c)}">${eur(c)}</b></div></div>
      <div><div class="bar"><i style="width:${Math.max(0, Math.min(100, (1 - d / v) * 100))}%;background:var(${b.couleur})"></i></div><div class="small muted" style="margin-top:5px">${Math.round((1 - d / v) * 100)} % du bien vous appartient${b.fin ? ` · crédit jusqu’en ${b.fin.getFullYear()}` : ' · aucun crédit'}</div></div>
    </div></a>`;
}

function drawAlloc() {
  chart('chAlloc', { type: 'doughnut', data: { labels: BIENS.map(b => b.nom), datasets: [{ data: BIENS.map(b => b.valeur(TODAY) * q(b)), backgroundColor: BIENS.map(b => css(b.couleur)), borderColor: css('--panel'), borderWidth: 3 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `${c.label} : ${eur(c.parsed)}` } } } } });
}
function drawFlux() {
  const ys = []; for (let y = TY - 7; y <= TY; y++) ys.push(y);
  const rev = ys.map(y => sum(b => b.revenusAn(y))), ch = ys.map(y => -sum(b => b.chargesAn(y))), cr = ys.map(y => -sum(b => { const c = b.creditAn(y); return c.it + c.pr; }));
  chart('chFlux', { type: 'bar', data: { labels: ys, datasets: [
    { label: 'Revenus locatifs', data: rev, backgroundColor: css('--c3'), stack: 's', borderRadius: 4 },
    { label: 'Charges et impôts', data: ch, backgroundColor: css('--c2'), stack: 's', borderRadius: 4 },
    { label: 'Crédits (capital + intérêts)', data: cr, backgroundColor: css('--c4'), stack: 's', borderRadius: 4 },
    { label: 'Solde', type: 'line', data: ys.map((_, i) => rev[i] + ch[i] + cr[i]), borderColor: css('--ink'), backgroundColor: css('--ink'), pointRadius: 3, tension: .3 }] },
    options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { labels: { boxWidth: 10, usePointStyle: true } }, tooltip: { callbacks: { label: c => `${c.dataset.label} : ${eur(c.parsed.y)}` } } }, scales: { x: { grid: { display: false } }, y: yEur } } });
}

/* ---------- page d'un bien ---------- */
const TABS = [['synthese', 'Synthèse', 'gauge'], ['historique', 'Historique', 'clock'], ['finances', 'Achat & crédit', 'bank'], ['location', 'Location', 'key'], ['charges', 'Charges & fiscalité', 'receipt'], ['entretien', 'Travaux & certificats', 'tool'], ['documents', 'Documents', 'doc'], ['fiche', 'Fiche & contacts', 'users']];
function viewBien(b, tab) {
  const t = TABS.find(x => x[0] === tab) ? tab : 'synthese';
  const locLabel = b.saisonnier ? 'Location saisonnière' : b.unites.length ? 'Location' : 'Potentiel locatif';
  const body = { synthese: tSynthese, historique: tHistorique, finances: tFinances, location: tLocation, charges: tCharges, entretien: tEntretien, documents: tDocuments, fiche: tFiche }[t](b);
  return `<div class="head" style="margin-bottom:10px"><a class="crumb" href="#/">${ic('back')} Vue d’ensemble</a><div class="actions">${b.quote < 1 ? segMode() : ''}</div></div>
    <div class="hero">${visu(b)}<div><div class="eyebrow">${esc(b.usage)} · ${esc(b.region)}</div><h1>${esc(b.nom)}</h1><p>${esc(b.adresse)} · ${esc(b.cp)}</p>
      <div class="pills"><span class="pill">${b.surface} m²</span><span class="pill">${b.chambres} ch.</span><span class="pill">PEB ${esc(b.peb.classe)}</span><span class="pill">Acheté en ${b.T0.getFullYear()}</span>${b.quote < 1 ? `<span class="pill">Indivision ${b.quote * 100} %</span>` : ''}</div></div></div>
    <div class="tabs">${TABS.map(([k, l, i]) => `<a href="#/bien/${b.id}/${k}" class="${k === t ? 'on' : ''}">${ic(i)} ${k === 'location' ? locLabel : l}</a>`).join('')}</div>${body}`;
}

function tSynthese(b) {
  const Q = q(b), v = b.valeur(TODAY), d = b.dette(TODAY), c = b.cashMois(), L = b.lignes();
  later(() => {
    const dates = quarters(b.T0, new Date(2046, 0, 1)), iNow = dates.findIndex(x => x > TODAY);
    chart('chVD', { type: 'line', plugins: [nowMarker(() => iNow)], data: { labels: dates.map(mlabel), datasets: [
      { label: 'Valeur estimée', data: dates.map(x => b.valeur(x) * Q), borderColor: css(b.couleur), backgroundColor: alpha(css(b.couleur), .18), fill: true, pointRadius: 0, borderWidth: 2, tension: .25 },
      { label: 'Capital restant dû', data: dates.map(x => b.dette(x) * Q), borderColor: css('--c5'), backgroundColor: alpha(css('--c5'), .14), fill: true, pointRadius: 0, borderWidth: 2, tension: .25 }] },
      options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { labels: { boxWidth: 10, usePointStyle: true } }, tooltip: { callbacks: { label: c => `${c.dataset.label} : ${eur(c.parsed.y)}`, footer: it => `Patrimoine net : ${eur(it[0].parsed.y - (it[1]?.parsed.y || 0))}` } } }, scales: { x: { ticks: { maxRotation: 0, autoSkipPadding: 28 }, grid: { display: false } }, y: yEur } } });
  });
  return `<div class="grid k4">${[
    ['Valeur estimée', eur(r1k(v * Q)), `${sgn((v - b.achat.prix) / b.achat.prix, x => pct(x, 0))} depuis l’achat (${eur(b.achat.prix * Q)})`, 'home', b.couleur],
    ['Capital restant dû', eur(d * Q), b.fin ? `Dernière mensualité en ${fdate(kOf(b.fin))}` : 'Aucun crédit en cours', 'bank', '--c5'],
    ['Patrimoine net', eur(r1k((v - d) * Q)), `${Math.round((1 - d / v) * 100)} % du bien vous appartient`, 'piggy', '--c3'],
    [b.locatif ? 'Solde mensuel' : 'Coût mensuel du logement', `<span class="${cls(c)}">${eur(c * Q)}</span>`, b.locatif ? 'Revenus − crédit, charges et impôts' : 'Crédit, énergie, assurances, précompte', 'wallet', '--c2']
  ].map(kpi).join('')}</div>
  ${b.alertes.length ? `<h3>Points d’attention</h3><div class="alerts two">${b.alertes.map(a => alertCard(a)).join('')}</div>` : ''}
  <div class="grid k21" style="margin-top:34px">
    <div class="card"><span class="ctitle">Valeur et dette dans le temps</span><span class="small muted">La surface entre les deux courbes est votre patrimoine net dans ce bien.</span><div class="chartbox"><canvas id="chVD"></canvas></div></div>
    <div class="card"><span class="ctitle">Budget mensuel</span><table style="margin-top:6px"><tbody>${L.map(([k, x]) => `<tr><td class="small">${esc(k)}</td><td class="n ${x < 0 ? 'neg' : 'pos'}">${eur(x * Q)}</td></tr>`).join('')}<tr class="tot"><td>Solde</td><td class="n ${cls(c)}">${eur(c * Q)}</td></tr></tbody></table></div>
  </div>`;
}

function tHistorique(b) {
  const evs = [...b.evenements].sort((x, y) => y.date.localeCompare(x.date));
  let yr = null, h = '';
  for (const e of evs) {
    const y = e.date.slice(0, 4); if (y !== yr) { h += `<div class="yr">${y}</div>`; yr = y; }
    const [lbl, col] = CAT[e.cat] || ['Autre', '--muted'], fut = new Date(e.date) > TODAY;
    h += `<div class="ev ${fut ? 'fut' : ''}" style="--evc:var(${col})"><div class="meta"><span>${fdate(e.date)}</span><span class="tag">${lbl}</span>${fut ? '<span class="st info">À venir</span>' : ''}${e.montant ? `<span class="amt">${eur(e.montant)}</span>` : ''}</div><div class="t">${esc(e.titre)}</div>${e.detail ? `<div class="d">${esc(e.detail)}</div>` : ''}</div>`;
  }
  return `<div class="chips">${Object.entries(CAT).filter(([k]) => b.evenements.some(e => e.cat === k)).map(([, [l, c]]) => `<span class="chip"><span class="sw" style="background:var(${c})"></span>${l}</span>`).join('')}</div><div class="tl">${h}</div>`;
}

function tFinances(b) {
  const Q = q(b);
  const loanCards = b.loans.map(l => {
    const c = l.c, last = l.rows.at(-1), cur = l.rows.find(r => r.k === NOWK), itTot = l.rows.reduce((s, r) => s + r.it, 0), itPaid = l.rows.filter(r => r.d <= TODAY).reduce((s, r) => s + r.it, 0);
    return `<div class="card"><span class="ctitle">${esc(c.libelle)} — ${esc(c.banque)}</span><dl class="facts" style="margin-top:10px">
      <dt>Montant emprunté</dt><dd>${eur(c.montant * Q)}</dd><dt>Taux</dt><dd>${nf(c.taux, 2)} % ${esc(c.type.toLowerCase())}${(c.revisions || []).map(r => ` → ${nf(r.taux, 2)} % (${fdate(r.debut)})`).join('')}</dd>
      <dt>Durée</dt><dd>${c.duree_mois / 12} ans · ${fdate(c.debut)} → ${fdate(last.k)}</dd>
      <dt>Mensualité actuelle</dt><dd>${cur ? eur(cur.pmt * Q, 2) : 'Crédit remboursé'}</dd>
      <dt>Capital restant dû</dt><dd><b>${eur(b.dette(TODAY) === 0 ? 0 : (cur ? cur.cap : 0) * Q)}</b></dd>
      <dt>Intérêts payés / total</dt><dd>${eur(itPaid * Q)} / ${eur(itTot * Q)}</dd>
      ${(c.remboursements || []).map(r => `<dt>Remboursement anticipé</dt><dd>${eur(r.montant * Q)} en ${fdate(r.mois)}</dd>`).join('')}
      <dt>Solde restant dû</dt><dd>${c.srd.prime ? `${esc(c.srd.assureur)} · ${eur(c.srd.prime * Q)}/an` : esc(c.srd.assureur)}</dd></dl></div>`;
  }).join('');
  const L = b.loans[0], ys = [...new Set(L.rows.map(r => r.y))];
  later(() => chart('chAm', { type: 'bar', data: { labels: ys, datasets: [
    { label: 'Capital remboursé', data: ys.map(y => b.creditAn(y).pr * Q), backgroundColor: css('--c3'), stack: 's', borderRadius: 3 },
    { label: 'Intérêts', data: ys.map(y => b.creditAn(y).it * Q), backgroundColor: css('--c2'), stack: 's', borderRadius: 3 },
    { label: 'Capital restant dû (fin d’année)', type: 'line', yAxisID: 'y2', data: ys.map(y => b.dette(new Date(y, 11, 31)) * Q), borderColor: css('--c5'), pointRadius: 0, tension: .2 }] },
    options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { labels: { boxWidth: 10, usePointStyle: true } }, tooltip: { callbacks: { label: c => `${c.dataset.label} : ${eur(c.parsed.y)}` } } },
      scales: { x: { grid: { display: false } }, y: { ...yEur, stacked: true }, y2: { position: 'right', ticks: { callback: v => eurk(v) }, grid: { display: false } } } } }));
  return `<div class="grid k2">
    <div class="card"><span class="ctitle">Acquisition</span><dl class="facts" style="margin:10px 0 14px"><dt>Date de l’acte</dt><dd>${fdate(b.achat.date)}</dd><dt>Notaire</dt><dd>${esc(b.achat.notaire)}</dd><dt>Agence</dt><dd>${esc(b.achat.agence)}</dd>${b.quote < 1 ? `<dt>Propriété</dt><dd>${b.quote * 100} % · ${esc(b.coproprietaire)}</dd>` : ''}</dl>
      <table><tbody><tr><td>Prix d’achat</td><td class="n">${eur(b.achat.prix * Q)}</td></tr>${b.achat.frais.map(f => `<tr><td class="small">${esc(f.poste)}</td><td class="n">${eur(f.montant * Q)}</td></tr>`).join('')}${b.achat.travaux_initiaux ? `<tr><td class="small">Travaux de rénovation initiaux</td><td class="n">${eur(b.achat.travaux_initiaux * Q)}</td></tr>` : ''}
      <tr class="tot"><td>Coût de revient</td><td class="n">${eur(b.cout * Q)}</td></tr><tr><td>Valeur estimée aujourd’hui</td><td class="n"><b>${eur(r1k(b.valeur(TODAY) * Q))}</b></td></tr><tr><td>Plus-value latente</td><td class="n ${cls(b.valeur(TODAY) - b.cout)}"><b>${sgn(r1k((b.valeur(TODAY) - b.cout) * Q))}</b></td></tr></tbody></table></div>
    <div class="grid">${loanCards}</div></div>
  <h3>Amortissement du crédit</h3><div class="card"><div class="chartbox"><canvas id="chAm"></canvas></div></div>
  <h3>Tableau d’amortissement annuel</h3><div class="card tw" style="max-height:420px;overflow:auto"><table><thead><tr><th>Année</th><th class="n">Mensualités</th><th class="n">Intérêts</th><th class="n">Capital</th><th class="n">Restant dû (31/12)</th></tr></thead><tbody>
    ${ys.map(y => { const c = b.creditAn(y); return `<tr${y === TY ? ' class="tot"' : ''}><td>${y}${y === TY ? ' · en cours' : ''}</td><td class="n">${eur((c.it + c.pr) * Q)}</td><td class="n">${eur(c.it * Q)}</td><td class="n">${eur((c.pr + c.extra) * Q)}${c.extra ? ' *' : ''}</td><td class="n">${eur(b.dette(new Date(y, 11, 31)) * Q)}</td></tr>`; }).join('')}</tbody></table>
    ${b.loans.some(l => (l.c.remboursements || []).length) ? '<div class="note">* comprend un remboursement anticipé partiel.</div>' : ''}</div>`;
}

function tLocation(b) {
  const Q = q(b), v = b.valeur(TODAY);
  if (b.saisonnier) {
    const S = b.saisonnier, loue = S.mois.reduce((s, m) => s + m.loue, 0), perso = S.mois.reduce((s, m) => s + m.perso, 0), brut = b.saisonBrut(TY);
    later(() => {
      chart('chSai', { type: 'bar', data: { labels: S.mois.map(m => m.m), datasets: [{ label: 'Nuits louées', data: S.mois.map(m => m.loue), backgroundColor: css('--c3'), stack: 's', borderRadius: 3 }, { label: 'Séjours de la famille', data: S.mois.map(m => m.perso), backgroundColor: css('--c4'), stack: 's', borderRadius: 3 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { boxWidth: 10, usePointStyle: true } } }, scales: { x: { grid: { display: false } }, y: { max: 31, grid: { color: () => css('--line') } } } } });
      chart('chSaiY', { type: 'bar', data: { labels: S.annees.map(a => a.annee), datasets: [{ label: 'Revenus bruts', data: S.annees.map(a => a.brut * Q), backgroundColor: alpha(css('--c3'), .35), borderRadius: 4 }, { label: 'Net d’agence', data: S.annees.map(a => a.brut * (1 - S.commission) * Q), backgroundColor: css('--c3'), borderRadius: 4 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { boxWidth: 10, usePointStyle: true } }, tooltip: { callbacks: { label: c => `${c.dataset.label} : ${eur(c.parsed.y)}` } } }, scales: { x: { grid: { display: false } }, y: yEur } } });
    });
    return `<div class="grid k4">${[
      [`Revenus bruts ${TY}`, eur(brut * Q), `Via ${esc(S.agence.split(' (')[0])}`, 'key', '--c3'],
      ['Net après commission', eur(brut * (1 - S.commission) * Q), `Commission d’agence ${pct(S.commission, 0)}`, 'wallet', '--c1'],
      ['Nuits louées', `${loue}`, `${pct(loue / 365, 0)} de l’année · ${perso} nuits en famille`, 'cal', '--c4'],
      ['Rendement net', pct((b.revenuActuelAn - b.chargesBase) / v), 'Après charges, taxe de seconde résidence et impôts', 'trend', '--c2']].map(kpi).join('')}</div>
      <div class="grid k2" style="margin-top:16px"><div class="card"><span class="ctitle">Occupation ${TY}</span><div class="chartbox"><canvas id="chSai"></canvas></div></div>
      <div class="card"><span class="ctitle">Revenus saisonniers par année</span><div class="chartbox"><canvas id="chSaiY"></canvas></div><div class="note">2020 : saison réduite (confinement). Enregistrement : ${esc(S.enregistrement)}.</div></div></div>`;
  }
  if (!b.unites.length) {
    const lo = b.loyer_estime, rb = lo * 12 / v, ch = b.charges.filter(c => c.cat === 'Fiscalité' || c.cat === 'Assurances').reduce((s, c) => s + c.annuel, 0);
    return `<div class="card hl"><span class="ctitle">${ic('key')} Et si vous mettiez ce bien en location ?</span><p style="margin:6px 0 0">Ce bien est votre résidence principale. Estimation du marché pour une maison comparable à ${esc(b.cp.split(' ').slice(1).join(' '))} :</p></div>
      <div class="grid k3" style="margin-top:16px">${[
        ['Loyer de marché estimé', eur(lo * Q) + '<span class="small muted"> /mois</span>', `Fourchette ${eur(lo * .92 * Q)} – ${eur(lo * 1.08 * Q)}`, 'key', '--c3'],
        ['Rendement brut', pct(rb), 'Loyer annuel / valeur estimée actuelle', 'trend', '--c1'],
        ['Couverture du crédit', b.fin ? pct(lo / b.pmtMois(NOWK), 0) : '—', 'Loyer estimé / mensualité actuelle', 'bank', '--c4']].map(kpi).join('')}</div>
      <div class="card" style="margin-top:16px"><span class="ctitle">Points à considérer</span><ul class="small" style="margin:8px 0 0;padding-left:18px;line-height:1.8">
        <li>La mise en location fait perdre les avantages liés à l’habitation propre (revenu cadastral exonéré) : le revenu cadastral indexé devient imposable (≈ ${eur(b.rc * 2.2 * 1.4 * Q)}/an avant impôt).</li>
        <li>Le précompte (${eur(b.charges.find(c => c.cat === 'Fiscalité').annuel * Q)}/an) et les assurances (${eur(ch * Q)}/an au total avec le précompte) restent à votre charge.</li>
        <li>Un relogement ailleurs doit être financé : votre gestionnaire peut simuler l’ensemble (achat d’un plus petit bien, location, revente).</li></ul></div>`;
  }
  const actu = b.loyersMois(NOWK), pot = b.potentielMois(), occ = b.unites.filter(u => !u.vacant_depuis).length;
  const start = new Date(Math.min(...b.unites.map(u => new Date(u.bail.debut))));
  const months = []; for (let d = new Date(start.getFullYear(), start.getMonth(), 1); d <= TODAY; d = new Date(d.getFullYear(), d.getMonth() + 1, 1)) months.push(d);
  const pal = ['--c3', '--c1', '--c2', '--c4'];
  later(() => chart('chLoy', { type: 'bar', data: { labels: months.map(mlabel), datasets: b.unites.map((u, i) => ({ label: u.nom, data: months.map(d => b.loyerU(u, kOf(d)) * Q), backgroundColor: css(pal[i % 4]), stack: 's', barPercentage: 1, categoryPercentage: .9 })) },
    options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { labels: { boxWidth: 10, usePointStyle: true } }, tooltip: { callbacks: { label: c => `${c.dataset.label} : ${eur(c.parsed.y)}` } } }, scales: { x: { stacked: true, ticks: { maxRotation: 0, autoSkipPadding: 28 }, grid: { display: false } }, y: { ...yEur, stacked: true } } } }));
  later(updIdx);
  return `<div class="grid k4">${[
    ['Loyers perçus', eur(actu * Q) + '<span class="small muted"> /mois</span>', `${eur(actu * 12 * Q)} par an`, 'key', '--c3'],
    ['Loyer potentiel', eur(pot * Q) + '<span class="small muted"> /mois</span>', pot > actu ? `<span class="neg">${eur((pot - actu) * Q)} /mois de vacance</span>` : 'Tout est loué', 'wallet', '--c1'],
    ['Occupation', `${occ} / ${b.unites.length}`, b.unites.length > 1 ? 'unités louées' : 'logement loué', 'users', occ < b.unites.length ? '--c5' : '--c3'],
    ['Rendement brut / net', `${pct(pot * 12 / v)} <span class="small muted">/</span> ${pct((b.revenuActuelAn - b.chargesBase) / v)}`, 'Sur la valeur estimée actuelle', 'trend', '--c2']].map(kpi).join('')}</div>
  <h3>Baux en cours</h3><div class="card tw"><table><thead><tr><th>Unité</th><th>Locataire</th><th>Bail</th><th>Échéance</th><th class="n">Loyer</th><th>Statut</th></tr></thead><tbody>
    ${b.unites.map(u => { const l = b.loyerU(u, NOWK); const st = u.vacant_depuis ? ['bad', `Vacant depuis ${fdate(u.vacant_depuis)}`] : u.indexation_due ? ['warn', 'Indexation à appliquer'] : ['ok', 'Loué']; return `<tr><td><b>${esc(u.nom)}</b><div class="small muted">${esc(u.type)} · ${u.surface} m²</div></td><td>${esc(u.locataire)}<div class="small muted">Garantie : ${esc(u.garantie)}</div></td><td class="small">${esc(u.bail.type)}<div class="muted">depuis ${fdate(u.bail.debut)}</div></td><td class="small">${fdate(u.bail.fin)}<div class="muted">${esc(u.bail.preavis)}</div></td><td class="n">${u.vacant_depuis ? `<span class="muted">cible ${eur(u.loyer_cible * Q)}</span>` : eur(l * Q)}${u.indexation_due ? `<div class="small pos">→ ${eur(u.indexation_due.loyer * Q)}</div>` : ''}</td><td><span class="st ${st[0]}">${st[1]}</span></td></tr>`; }).join('')}</tbody></table></div>
  <div class="grid k21" style="margin-top:16px">
    <div class="card"><span class="ctitle">Loyers mensuels perçus</span><span class="small muted">Par unité, depuis le premier bail. Les marches correspondent aux indexations annuelles.</span><div class="chartbox"><canvas id="chLoy"></canvas></div></div>
    <div class="card"><span class="ctitle">Calculateur d’indexation</span><span class="small muted">Loyer de base × nouvel indice santé / indice de départ</span>
      <div class="form" style="margin-top:12px"><label>Bail<select id="idxU">${b.unites.map(u => `<option value="${u.id}">${esc(u.nom)}</option>`).join('')}</select></label>
      <label>Nouvel indice santé<input type="number" id="idxN" step="0.01" value="${b.unites[0].indice_actuel}"></label></div>
      <div id="idxR" style="margin-top:14px"></div><div class="note">Indices fictifs pour la démo. Le loyer indexé ne peut être réclamé que pour les 3 mois précédant la demande.</div></div></div>`;
}
function updIdx() {
  const b = byId(route().id), u = b?.unites.find(x => x.id === $('#idxU')?.value); if (!u) return;
  const n = parseFloat($('#idxN').value) || u.indice_actuel, base = u.loyers[0].loyer, res = base * n / u.indice_base, cur = u.loyers.at(-1).loyer;
  $('#idxR').innerHTML = `<div class="stat"><span>Loyer de base (${fdate(u.bail.debut)})</span><b>${eur(base)}</b></div><div class="stat"><span>Indice de départ</span><b>${nf(u.indice_base, 2)}</b></div><div class="stat"><span>Loyer actuel</span><b>${eur(cur)}</b></div><div class="stat"><span>Loyer indexé possible</span><b class="pos" style="font-size:18px">${eur(res, 2)}</b></div><div class="stat"><span>Écart mensuel</span><b class="${cls(res - cur)}">${sgn(res - cur, x => eur(x, 2))}</b></div>`;
}

function tCharges(b) {
  const Q = q(b), cats = [...new Set(b.charges.map(c => c.cat))], pal = ['--c1', '--c2', '--c3', '--c4', '--c5', '--gold'];
  const y0 = Math.max(b.T0.getFullYear(), TY - 9), ys = []; for (let y = TY; y >= y0; y--) ys.push(y);
  later(() => chart('chCat', { type: 'doughnut', data: { labels: cats, datasets: [{ data: cats.map(c => b.charges.filter(x => x.cat === c).reduce((s, x) => s + x.annuel, 0) * Q), backgroundColor: cats.map((_, i) => css(pal[i])), borderColor: css('--panel'), borderWidth: 3 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true } }, tooltip: { callbacks: { label: c => `${c.label} : ${eur(c.parsed)}/an` } } } } }));
  const fisc = b.charges.filter(c => c.cat === 'Fiscalité').reduce((s, c) => s + c.annuel, 0);
  return `<div class="grid k4">${[
    ['Charges annuelles', eur(b.chargesBase * Q), `${eur(b.chargesBase / 12 * Q)} par mois, hors crédit`, 'receipt', '--c2'],
    ['Fiscalité', eur(fisc * Q), 'Précompte, impôts et taxes locales', 'bank', '--c5'],
    ['Revenu cadastral', eur(b.rc), `Non indexé · indexé ${TY} ≈ ${eur(b.rc * 2.2)}`, 'doc', '--c1'],
    ['Assurances', eur(b.charges.filter(c => c.cat === 'Assurances').reduce((s, c) => s + c.annuel, 0) * Q), 'Habitation, RC et solde restant dû', 'shield', '--c4']].map(kpi).join('')}</div>
  <div class="grid k21" style="margin-top:16px">
    <div class="card tw"><span class="ctitle">Détail des charges</span><table style="margin-top:6px"><thead><tr><th>Poste</th><th>Catégorie</th><th class="n">Par mois</th><th class="n">Par an</th></tr></thead><tbody>
      ${b.charges.map(c => `<tr><td>${esc(c.poste)}</td><td><span class="tag">${esc(c.cat)}</span></td><td class="n">${eur(c.annuel / 12 * Q, 2)}</td><td class="n">${eur(c.annuel * Q)}</td></tr>`).join('')}
      <tr class="tot"><td colspan="2">Total</td><td class="n">${eur(b.chargesBase / 12 * Q, 2)}</td><td class="n">${eur(b.chargesBase * Q)}</td></tr></tbody></table></div>
    <div class="card"><span class="ctitle">Répartition</span><div class="chartbox"><canvas id="chCat"></canvas></div></div></div>
  <h3>Bilan annuel du bien</h3><div class="card tw"><table><thead><tr><th>Année</th><th class="n">Revenus</th><th class="n">Charges & impôts</th><th class="n">Intérêts</th><th class="n">Capital remboursé</th><th class="n">Cash-flow</th><th class="n">Enrichissement</th></tr></thead><tbody>
    ${ys.map(y => { const r = b.revenusAn(y), ch = b.chargesAn(y), c = b.creditAn(y), cf = r - ch - c.it - c.pr - c.extra; return `<tr><td>${y}${y === TY ? ' <span class="muted small">(estim.)</span>' : ''}</td><td class="n">${r ? eur(r * Q) : '—'}</td><td class="n neg">${eur(-ch * Q)}</td><td class="n neg">${c.it ? eur(-c.it * Q) : '—'}</td><td class="n">${c.pr + c.extra ? eur((c.pr + c.extra) * Q) : '—'}</td><td class="n ${cls(cf)}">${eur(cf * Q)}</td><td class="n ${cls(cf + c.pr + c.extra)}"><b>${eur((cf + c.pr + c.extra) * Q)}</b></td></tr>`; }).join('')}</tbody></table>
    <div class="note">Enrichissement = cash-flow + capital remboursé (hors évolution de la valeur du bien). Charges des années passées estimées à partir du niveau actuel (inflation ${pct(SIM.infl, 0)}/an).</div></div>`;
}

function tEntretien(b) {
  const Q = q(b), fait = b.travaux.filter(t => t.statut === 'fait').reduce((s, t) => s + t.montant, 0), avenir = b.travaux.filter(t => t.statut !== 'fait').reduce((s, t) => s + t.montant, 0);
  return `<div class="grid k3">${[
    ['Travaux réalisés', eur(fait * Q), `Depuis ${b.T0.getFullYear()}`, 'tool', '--c2'],
    ['Travaux à venir', eur(avenir * Q), 'Prévus, en cours ou au stade du devis', 'cal', '--c4'],
    ['Certificat PEB', `Classe ${esc(b.peb.classe)}`, `${b.peb.valeur} kWh/m².an · valable jusqu’au ${fdate(b.peb.validite)}`, 'sun', '--c3']].map(kpi).join('')}</div>
  <h3>Certificats, contrôles et obligations</h3><div class="card tw"><table><thead><tr><th>Document</th><th>Détail</th><th>Dernier</th><th>Échéance</th><th>Statut</th></tr></thead><tbody>
    ${[...b.certificats].sort((x, y) => x.echeance.localeCompare(y.echeance)).map(c => { const [s, l] = certStatus(c.echeance); return `<tr><td><b>${esc(c.type)}</b></td><td class="small muted">${esc(c.detail)}</td><td class="small">${fdate(c.date)}</td><td class="small">${fdate(c.echeance)}</td><td><span class="st ${s}">${l}</span></td></tr>`; }).join('')}</tbody></table></div>
  <h3>Travaux et investissements</h3><div class="card tw"><table><thead><tr><th>Date</th><th>Objet</th><th>Entreprise</th><th class="n">Montant</th><th>Statut</th></tr></thead><tbody>
    ${[...b.travaux].sort((x, y) => y.date.localeCompare(x.date)).map(t => { const [s, l] = TRAV[t.statut]; return `<tr><td class="small">${fdate(t.date)}</td><td><b>${esc(t.objet)}</b></td><td class="small muted">${esc(t.entreprise)}</td><td class="n">${eur(t.montant * Q)}</td><td><span class="st ${s}">${l}</span></td></tr>`; }).join('')}</tbody></table></div>`;
}

let DOCF = { q: '', bien: '', cat: '' };
function tDocuments(b) { DOCF = { q: '', bien: b.id, cat: '' }; later(renderDocList); return docShell(false); }
function docShell(global) {
  const cats = [...new Set(ALL_DOCS.map(d => d.cat))];
  return `<div class="toolbar"><input type="search" id="docq" placeholder="Rechercher un document…" autocomplete="off"><button class="btn" data-act="upload">${ic('upload')} Ajouter</button></div>
    ${global ? `<div class="chips" id="chB"><button class="chip sel" data-act="docf" data-k="bien" data-v="">Tous les biens</button>${BIENS.map(b => `<button class="chip" data-act="docf" data-k="bien" data-v="${b.id}"><span class="sw" style="background:var(${b.couleur})"></span>${esc(b.nom)}</button>`).join('')}</div>` : ''}
    <div class="chips" id="chC"><button class="chip sel" data-act="docf" data-k="cat" data-v="">Toutes catégories</button>${cats.map(c => `<button class="chip" data-act="docf" data-k="cat" data-v="${esc(c)}">${esc(c)}</button>`).join('')}</div>
    <div class="card" style="padding:0" id="doclist"></div>`;
}
function renderDocList() {
  const el = $('#doclist'); if (!el) return;
  const qq = DOCF.q.toLowerCase();
  const L = ALL_DOCS.filter(d => (!DOCF.bien || d.b.id === DOCF.bien) && (!DOCF.cat || d.cat === DOCF.cat) && (!qq || (d.n + ' ' + d.cat + ' ' + d.b.nom).toLowerCase().includes(qq)));
  el.innerHTML = L.length ? L.map(d => docRow(DOCF.bien && route().v === 'bien' ? { ...d, b: null } : d)).join('') : '<p class="muted" style="padding:18px">Aucun document.</p>';
  document.querySelectorAll('[data-act="docf"]').forEach(c => c.classList.toggle('sel', DOCF[c.dataset.k] === c.dataset.v));
}

function tFiche(b) {
  return `<div class="grid k2"><div class="card"><span class="ctitle">Fiche du bien</span><dl class="facts" style="margin-top:10px">
    <dt>Adresse</dt><dd>${esc(b.adresse)}, ${esc(b.cp)}</dd><dt>Région</dt><dd>${esc(b.region)}</dd><dt>Type</dt><dd>${esc(b.desc)}</dd>
    <dt>Construction</dt><dd>${b.construction}</dd>${b.terrain ? `<dt>Terrain</dt><dd>${esc(b.terrain)}</dd>` : ''}<dt>PEB</dt><dd>Classe ${esc(b.peb.classe)} — ${b.peb.valeur} kWh/m².an</dd>
    <dt>Revenu cadastral</dt><dd>${eur(b.rc)} (non indexé)</dd><dt>Propriété</dt><dd>${b.quote < 1 ? `${esc(D.client.prenom)} ${esc(D.client.nom)} (${b.quote * 100} %) · ${esc(b.coproprietaire)}` : `${esc(D.client.prenom)} ${esc(D.client.nom)} (100 %)`}</dd>
    <dt>Usage</dt><dd>${esc(b.usage)}</dd><dt>Acquis le</dt><dd>${fdate(b.achat.date)} — vendeur : ${esc(b.achat.vendeur)}</dd></dl></div>
    <div class="card"><span class="ctitle">Contacts</span><div class="feed" style="margin-top:4px">${b.contacts.map(c => `<div style="align-items:center"><div class="av" style="background:var(--accent-soft);color:var(--accent)">${initials(c.nom)}</div><div><div class="small muted">${esc(c.role)}</div><b>${esc(c.nom)}</b><div class="small">${esc(c.contact)}</div></div></div>`).join('')}</div></div></div>`;
}

/* ---------- simulateur ---------- */
let SV = { bien: 'namur', an: 2030, frais: 3, prix: 290000, apport: 110000, taux: 3.1, duree: 20, loyer: 1250 };
function viewSim() {
  later(simUpdate);
  const sl = (k, l, min, max, step, v, disp) => `<div class="sl"><label>${l}<b id="o_${k}">${disp}</b></label><input type="range" data-sim="${k}" min="${min}" max="${max}" step="${step}" value="${v}"></div>`;
  const slp = (k, l, max) => sl(k, l, 0, max, .25, SIM[k] * 100, nf(SIM[k] * 100, 2) + ' %');
  return `<div class="head"><div><h1>Simulateur & projections</h1><p class="lead">Faites varier les hypothèses et visualisez l’effet sur votre patrimoine, votre retraite, une revente ou un nouvel achat.</p></div><div class="actions">${segMode()}</div></div>
  <div class="grid k21">
    <div class="card"><span class="ctitle">Patrimoine net projeté</span><span class="small muted">Valeur − dettes, empilé par bien, jusqu’en 2046</span><div class="chartbox tall"><canvas id="chSim"></canvas></div></div>
    <div class="card"><span class="ctitle">Hypothèses</span><div style="margin-top:14px">
      ${slp('g', 'Croissance annuelle des prix', 5)}${slp('idx', 'Indexation des loyers', 4)}${slp('infl', 'Hausse des charges', 4)}</div>
      <div class="note">Référence : +2 à +3 %/an pour l’immobilier résidentiel belge sur longue période ; indice santé +2 %.</div></div></div>
  <h3>À votre retraite (${D.client.retraite}, 65 ans)</h3><div class="grid k3" id="simRet"></div>
  <div class="grid k2" style="margin-top:34px">
    <div class="card"><span class="ctitle">${ic('home')} Simuler une revente</span>
      <div class="form" style="margin-top:12px;grid-template-columns:1fr 1fr"><label>Bien<select data-sv="bien">${BIENS.map(b => `<option value="${b.id}" ${b.id === SV.bien ? 'selected' : ''}>${esc(b.nom)}</option>`).join('')}</select></label>
        <label>Frais de vente (%)<input type="number" data-sv="frais" value="${SV.frais}" step="0.5" min="0"></label></div>
      ${sl('an', 'Année de la revente', TY, 2045, 1, SV.an, SV.an).replace('data-sim="an"', 'data-sv="an"')}<div id="simRev"></div></div>
    <div class="card"><span class="ctitle">${ic('key')} Simuler un nouvel investissement locatif</span>
      <div class="form" style="margin-top:12px;grid-template-columns:1fr 1fr">
        <label>Prix du bien (€)<input type="number" data-sv="prix" value="${SV.prix}" step="5000"></label><label>Apport (€)<input type="number" data-sv="apport" value="${SV.apport}" step="5000"></label>
        <label>Taux du crédit (%)<input type="number" data-sv="taux" value="${SV.taux}" step="0.05"></label><label>Durée (ans)<input type="number" data-sv="duree" value="${SV.duree}" step="1" min="5" max="30"></label>
        <label>Loyer attendu (€/mois)<input type="number" data-sv="loyer" value="${SV.loyer}" step="25"></label></div><div id="simInv" style="margin-top:12px"></div></div></div>`;
}
function simUpdate() {
  CHARTS.forEach(c => c.destroy()); CHARTS = [];
  netChart('chSim', new Date(2046, 0, 1), [[RET, 'Retraite']]);
  const y = RET.getFullYear(), net = sum(b => b.valeur(RET) - b.dette(RET)), val = sum(b => b.valeur(RET));
  const revRet = sum(b => (b.revenusAn(y) - b.chargesAn(y)) / 12 - b.pmtMois(kOf(RET)));
  const encours = BIENS.filter(b => b.fin && b.fin > RET);
  $('#simRet').innerHTML = [
    ['Patrimoine immobilier net', eur(r1k(net)), `Valeur ${eurk(val)} · aujourd’hui ${eurk(sum(b => b.valeur(TODAY) - b.dette(TODAY)))}`, 'piggy', '--c3'],
    ['Solde mensuel de l’immobilier', `<span class="${cls(revRet)}">${eur(revRet)}</span>`, 'Loyers indexés − charges − crédits encore en cours', 'wallet', '--c2'],
    ['Crédits encore en cours', encours.length ? eurk(sum(b => b.dette(RET))) : 'Aucun', encours.length ? encours.map(b => `${b.nom} jusqu’en ${fdate(kOf(b.fin))}`).join(' · ') : 'Tous les crédits sont remboursés', 'bank', '--c5']].map(kpi).join('');
  simRevente(); simInvest();
}
function simRevente() {
  const b = byId(SV.bien), d = new Date(SV.an, 6, 1), Q = q(b);
  const prix = b.valeur(d), crd = b.dette(d), t = b.loans.map(l => l.rows.find(r => r.d >= d)?.taux).find(x => x) || 0;
  const remploi = crd * t / 100 * 3 / 12, frais = prix * SV.frais / 100 + 1500;
  const ans = (d - b.T0) / YR, rp = b.usage === 'Résidence principale';
  const tax = !rp && ans < 5 ? 0.165 * Math.max(0, prix - b.cout) : 0;
  const net = prix - crd - remploi - frais - tax;
  $('#simRev').innerHTML = `<table><tbody>
    <tr><td>Prix de vente estimé (${SV.an})</td><td class="n">${eur(r1k(prix * Q))}</td></tr>
    <tr><td>Capital restant dû remboursé</td><td class="n neg">${eur(-crd * Q)}</td></tr>
    <tr><td>Indemnité de remploi (3 mois d’intérêts)</td><td class="n neg">${eur(-remploi * Q)}</td></tr>
    <tr><td>Frais de vente (agence, certificats)</td><td class="n neg">${eur(-frais * Q)}</td></tr>
    <tr><td>Taxe sur la plus-value</td><td class="n ${tax ? 'neg' : ''}">${tax ? eur(-tax * Q) : `<span class="muted small">${rp ? 'exonérée (habitation propre)' : 'exonérée (détenu > 5 ans)'}</span>`}</td></tr>
    <tr class="tot"><td>Liquidités récupérées${Q < 1 ? ' (votre part)' : ''}</td><td class="n pos">${eur(r1k(net * Q))}</td></tr></tbody></table>
    <div class="note">${b.locatif ? `Revenus nets abandonnés : ≈ ${eur((b.revenusAn(SV.an) - b.chargesAn(SV.an)) * Q)}/an. ` : ''}Placées à 3 %/an, ces liquidités rapporteraient ≈ ${eur(net * Q * .03)}/an avant précompte mobilier. Estimation indicative, hors fiscalité personnelle.</div>`;
}
function simInvest() {
  const frais = SV.prix * .125 + 2500, credit = Math.max(0, SV.prix + frais - SV.apport), r = SV.taux / 1200, n = SV.duree * 12;
  const pmt = credit ? (r ? credit * r / (1 - Math.pow(1 + r, -n)) : credit / n) : 0, charges = SV.loyer * .22, cf = SV.loyer - pmt - charges;
  const val = sum(b => b.valeur(TODAY)), det = sum(b => b.dette(TODAY));
  $('#simInv').innerHTML = `<div class="stat"><span>Frais d’acquisition (≈ 12,5 % + acte de crédit)</span><b>${eur(frais)}</b></div>
    <div class="stat"><span>Montant à emprunter</span><b>${eur(credit)}</b></div><div class="stat"><span>Mensualité</span><b>${eur(pmt, 2)}</b></div>
    <div class="stat"><span>Charges, impôts et vacance (≈ 22 % du loyer)</span><b class="neg">${eur(-charges)}</b></div>
    <div class="stat"><span>Cash-flow mensuel</span><b class="${cls(cf)}" style="font-size:18px">${eur(cf)}</b></div>
    <div class="stat"><span>Rendement brut</span><b>${pct(SV.loyer * 12 / SV.prix)}</b></div>
    <div class="stat"><span>Taux d’endettement global après achat</span><b>${pct(det / val)} → ${pct((det + credit) / (val + SV.prix))}</b></div>
    <div class="note">Le bien de Knokke, libre de toute dette, peut servir de garantie hypothécaire et réduire l’apport nécessaire.</div>`;
}

/* ---------- documents (coffre-fort) ---------- */
function viewDocs() {
  DOCF = { q: '', bien: '', cat: '' }; later(renderDocList);
  return `<div class="head"><div><h1>Coffre-fort documents</h1><p class="lead">${ALL_DOCS.length} documents classés par bien et par catégorie : actes, crédits, baux, certificats, assurances, fiscalité.</p></div><span class="demo">${ic('shield')} Stockage chiffré · accès partagé avec votre gestionnaire</span></div>${docShell(true)}`;
}

/* ---------- guide d'utilisation (contenu dans guide.js) ---------- */
function viewGuide() {
  const G = window.GUIDE;
  if (!G) return '<p class="muted">Guide indisponible (guide.js non chargé).</p>';
  const fig = ([f, cap], mob) => `<figure class="${mob ? 'mob' : ''}"><img src="guide/${f}.jpg" alt="${esc(cap)}" loading="lazy" data-act="zoom" data-cap="${esc(cap)}"><figcaption>${esc(cap)}</figcaption></figure>`;
  return `<div class="head"><div><h1>Guide d’utilisation</h1><p class="lead">${esc(G.intro)}</p></div><button class="btn" data-act="print">${ic('print')} Imprimer le guide</button></div>
    <div class="card toc no-print"><span class="ctitle">Sommaire</span><div class="tocg">${G.sections.map((s, i) => `<button data-act="goto" data-id="${s.id}">${ic(s.icone)}<span><small>${i + 1}</small>${esc(s.titre)}</span></button>`).join('')}<button data-act="goto" data-id="faq">${ic('info')}<span><small>?</small>Questions fréquentes</span></button></div>
      <div class="note">Ce guide décrit l’utilisation en situation réelle. Les encadrés <span class="demo">Démo</span> signalent ce qui est simulé dans la version de démonstration.</div></div>
    ${G.sections.map((s, i) => `<section class="gsec" id="g-${s.id}"><h2><span class="num">${i + 1}</span>${esc(s.titre)}</h2><div class="gtxt">${s.texte}</div>
      ${s.astuce ? `<div class="tip">${ic('sun')}<div><b>Astuce</b> ${esc(s.astuce)}</div></div>` : ''}
      ${s.demo ? `<div class="tip dm">${ic('info')}<div><b>Démo</b> ${esc(s.demo)}</div></div>` : ''}
      <div class="gimgs ${s.mobile ? 'mob' : ''}">${s.images.map(x => fig(x, s.mobile)).join('')}</div></section>`).join('')}
    <section class="gsec" id="g-faq"><h2><span class="num">?</span>Questions fréquentes</h2>${G.faq.map(([qq, r]) => `<details class="card faq"><summary>${esc(qq)}</summary><p>${esc(r)}</p></details>`).join('')}</section>`;
}

/* ---------- coquille : navigation, modales ---------- */
function route() {
  const p = location.hash.replace(/^#\/?/, '').split('/');
  if (p[0] === 'bien' && byId(p[1])) return { v: 'bien', id: p[1], tab: p[2] || 'synthese' };
  if (p[0] === 'simulateur') return { v: 'sim' };
  if (p[0] === 'documents') return { v: 'docs' };
  if (p[0] === 'guide') return { v: 'guide' };
  return { v: 'home' };
}
function renderSide(r) {
  const M = D.marque, C = D.client, A = D.conseiller;
  $('#side').innerHTML = `<div class="brand"><div class="logo">${esc(M.societe[0])}</div><div><b>${esc(M.produit)}</b><span>par ${esc(M.societe)}</span></div></div>
    <div class="who"><div class="av">${initials(C.prenom + ' ' + C.nom)}</div><div><b>${esc(C.prenom)} ${esc(C.nom)}</b><span>${esc(C.ref)}</span></div></div>
    <a href="#/" class="${r.v === 'home' ? 'on' : ''}">${ic('grid')} Vue d’ensemble</a>
    <a href="#/simulateur" class="${r.v === 'sim' ? 'on' : ''}">${ic('sliders')} Simulateur</a>
    <a href="#/documents" class="${r.v === 'docs' ? 'on' : ''}">${ic('doc')} Documents <span class="cnt">${ALL_DOCS.length}</span></a>
    <a href="#/guide" class="${r.v === 'guide' ? 'on' : ''}">${ic('info')} Guide d’utilisation</a>
    <div class="navlbl">Mes biens</div>
    ${BIENS.map(b => { const h = b.alertes.filter(a => a.niveau === 'haut').length; return `<a href="#/bien/${b.id}" class="${r.id === b.id ? 'on' : ''}"><span class="dot" style="background:var(${b.couleur})"></span>${esc(b.nom)}${h ? `<span class="badge">${h}</span>` : `<span class="cnt">${eurk(b.valeur(TODAY) * q(b))}</span>`}</a>`; }).join('')}
    <div class="adv"><div class="row"><div class="av">${initials(A.nom)}</div><div><span>Votre gestionnaire</span><b>${esc(A.nom)}</b></div></div>
      <div class="btns"><button data-act="advisor">${ic('chat')} Contacter</button><button class="ic" data-act="theme" aria-label="Changer de thème">${ic('moon')}</button></div></div>`;
  $('#topbar').innerHTML = `<div class="logo" style="width:32px;height:32px;font-size:14px;border-radius:9px">${esc(M.societe[0])}</div><b>${esc(M.produit)}</b><span class="sp"></span><button data-act="theme" aria-label="Changer de thème">${ic('moon')}</button><button data-act="advisor" aria-label="Contacter votre gestionnaire">${ic('chat')}</button>`;
  $('#bottombar').innerHTML = [['#/', 'grid', 'Accueil', r.v === 'home'], [null, 'home', 'Biens', r.v === 'bien'], ['#/simulateur', 'sliders', 'Simulateur', r.v === 'sim'], ['#/documents', 'doc', 'Documents', r.v === 'docs'], ['#/guide', 'info', 'Aide', r.v === 'guide']]
    .map(([h, i, l, on]) => h ? `<a href="${h}" class="${on ? 'on' : ''}">${ic(i)}${l}</a>` : `<a href="#" data-act="biens" class="${on ? 'on' : ''}">${ic(i)}${l}</a>`).join('');
}
let lastRoute = '';
function render() {
  CHARTS.forEach(c => c.destroy()); CHARTS = []; AFTER = [];
  const r = route(), key = location.hash;
  renderSide(r);
  $('#main').innerHTML = r.v === 'bien' ? viewBien(byId(r.id), r.tab) : r.v === 'sim' ? viewSim() : r.v === 'docs' ? viewDocs() : r.v === 'guide' ? viewGuide() : viewHome();
  document.title = `${D.marque.produit} · ${r.v === 'bien' ? byId(r.id).nom : r.v === 'sim' ? 'Simulateur' : r.v === 'docs' ? 'Documents' : r.v === 'guide' ? 'Guide' : `${D.client.prenom} ${D.client.nom}`}`;
  AFTER.forEach(f => f());
  if (key !== lastRoute) { window.scrollTo(0, 0); lastRoute = key; }
}

const modal = html => { $('#modalbox').innerHTML = html; $('#modal').classList.add('on'); };
const closeModal = () => { $('#modal').classList.remove('on'); $('#modalbox').classList.remove('wide'); };
let tt; const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2800); };
function openAdvisor() {
  const A = D.conseiller;
  modal(`<div style="display:flex;gap:14px;align-items:center;margin-bottom:16px"><div class="av" style="width:52px;height:52px;font-size:18px;background:linear-gradient(135deg,#d9b25a,#b8892b);color:#0f2340">${initials(A.nom)}</div><div><h2>${esc(A.nom)}</h2><div class="muted small">${esc(A.role)} · ${esc(D.marque.societe)}</div></div></div>
    <div class="feed small" style="margin-bottom:16px"><div>${ic('phone')} ${esc(A.tel)}</div><div>${ic('mail')} ${esc(A.email)}</div><div>${ic('cal')} Prochain rendez-vous : ${fdate(A.prochain_rdv)}</div></div>
    <form class="form" id="rdv"><label>Sujet<select><option>Revue annuelle du patrimoine</option><option>Financement d’un nouveau bien</option><option>Revente d’un bien</option><option>Fiscalité immobilière</option><option>Succession et donation</option><option>Autre question</option></select></label>
    <label>Date souhaitée<input type="date" value="2026-11-04"></label><label>Message<textarea rows="3" placeholder="Votre question…"></textarea></label>
    <div class="actions" style="justify-content:flex-end"><button type="button" class="btn" data-act="close">Annuler</button><button class="btn gold" type="submit">Envoyer la demande</button></div></form>`);
}
function openBiens() {
  modal(`<h2 style="margin-bottom:12px">Mes biens</h2>${BIENS.map(b => `<a href="#/bien/${b.id}" data-act="close" class="doc" style="color:inherit;text-decoration:none"><div class="fi" style="background:color-mix(in srgb,var(${b.couleur}) 16%,transparent);color:var(${b.couleur})">${ic('home')}</div><div><div class="nm">${esc(b.nom)}</div><div class="mt">${esc(b.usage)} · ${esc(b.cp)}</div></div><div class="sz">${eurk(b.valeur(TODAY) * q(b))}</div></a>`).join('')}`);
}
function toggleTheme() {
  const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = cur === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('ci-theme', document.documentElement.dataset.theme); } catch (e) { }
  render();
}

document.addEventListener('click', e => {
  const t = e.target.closest('[data-act]');
  if (e.target.id === 'modal') return closeModal();
  if (!t) return;
  const a = t.dataset.act;
  if (a === 'mode') { MODE = t.dataset.v; render(); }
  else if (a === 'theme') toggleTheme();
  else if (a === 'print') window.print();
  else if (a === 'advisor') openAdvisor();
  else if (a === 'biens') { e.preventDefault(); openBiens(); }
  else if (a === 'close') closeModal();
  else if (a === 'goto') document.getElementById('g-' + t.dataset.id)?.scrollIntoView({ behavior: 'smooth' });
  else if (a === 'zoom') { modal(`<img src="${esc(t.getAttribute('src'))}" alt="" style="width:100%;border-radius:12px;display:block"><div class="small muted" style="margin:10px 4px 2px">${esc(t.dataset.cap)}</div>`); $('#modalbox').classList.add('wide'); }
  else if (a === 'doc') toast(`« ${t.dataset.n} » — document fictif de la démo`);
  else if (a === 'upload') toast('Démo : l’ajout de documents (glisser-déposer, scan) sera disponible dans la version complète');
  else if (a === 'docf') { DOCF[t.dataset.k] = t.dataset.v; renderDocList(); }
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'docq') { DOCF.q = t.value; renderDocList(); }
  else if (t.id === 'idxN' || t.id === 'idxU') updIdx();
  else if (t.dataset.sim) { SIM[t.dataset.sim] = parseFloat(t.value) / 100; $('#o_' + t.dataset.sim).textContent = nf(SIM[t.dataset.sim] * 100, 2) + ' %'; simUpdate(); }
  else if (t.dataset.sv) {
    const k = t.dataset.sv; SV[k] = k === 'bien' ? t.value : parseFloat(t.value) || 0;
    if (k === 'an') $('#o_an').textContent = SV.an;
    simRevente(); simInvest();
  }
});
document.addEventListener('change', e => { if (e.target.id === 'idxU') { const u = byId(route().id).unites.find(x => x.id === e.target.value); $('#idxN').value = u.indice_actuel; updIdx(); } });
document.addEventListener('submit', e => { if (e.target.id === 'rdv') { e.preventDefault(); closeModal(); toast(`Demande envoyée à ${D.conseiller.nom} (démo)`); } });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

try { const t = localStorage.getItem('ci-theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) { }
window.addEventListener('hashchange', render);
render();
if (document.fonts) document.fonts.ready.then(() => { if (CHARTS.length) render(); });
})();
