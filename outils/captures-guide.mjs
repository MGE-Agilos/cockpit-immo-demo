// Régénère les captures du guide (dossier guide/) : node outils/captures-guide.mjs "<dossier de l app>" "<dossier de l app>/guide" "<dossier temporaire>"
// Nécessite Google Chrome (chemin ci-dessous) et Node 22+. Pilote Chrome headless via le protocole DevTools.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
const [, , appDir, outDir, prof] = process.argv;
mkdirSync(outDir, { recursive: true });
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=9334', `--user-data-dir=${prof}`, '--hide-scrollbars', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ver; for (let i = 0; i < 50; i++) { try { ver = await (await fetch('http://127.0.0.1:9334/json/list')).json(); break; } catch { await sleep(200); } }
const ws = new WebSocket(ver.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = {}; const errs = [];
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } if (m.method === 'Runtime.exceptionThrown') errs.push(m.params.exceptionDetails.exception?.description); };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result.result?.value;
await send('Runtime.enable'); await send('Page.enable');
const base = 'file:///' + appDir.replace(/\\/g, '/') + '/index.html?capture';
const HELP = `window.__h3=t=>[...document.querySelectorAll('main h3')].find(h=>h.textContent.includes(t));
window.__u=(...els)=>{els=els.filter(Boolean);const r=els.map(e=>e.getBoundingClientRect());const x=Math.min(...r.map(a=>a.left))-12,y=Math.min(...r.map(a=>a.top))-12,X=Math.max(...r.map(a=>a.right))+12,Y=Math.max(...r.map(a=>a.bottom))+12;return {x:x,y:y+scrollY,width:X-x,height:Y-y,scale:1};};`;
const shots = [
  ['accueil', '/', null, `__u(document.querySelector('main .head'), document.querySelector('main .grid.k4'))`],
  ['evolution', '/', null, `__u(document.querySelector('main .grid.k21'))`],
  ['biens', '/', null, `__u(__h3('Vos biens'), __h3('Vos biens').nextElementSibling)`],
  ['performance', '/', null, `__u(__h3('Performance'), __h3('Performance').nextElementSibling)`],
  ['alertes', '/', null, `__u(__h3('Points d’attention').closest('.grid'))`],
  ['budget', '/', null, `__u(__h3('Revenus et dépenses'), __h3('Revenus et dépenses').nextElementSibling)`],
  ['bien', '/bien/namur', null, `__u(document.querySelector('main .head'), document.querySelector('main .grid.k4'))`],
  ['bien-alertes', '/bien/namur', null, `__u(__h3('Points d’attention'), __h3('Points d’attention').nextElementSibling)`],
  ['historique', '/bien/namur/historique', null, `(()=>{const r=__u(document.querySelector('main .chips'), document.querySelector('.tl'));r.height=Math.min(r.height,760);return r})()`],
  ['credit', '/bien/uccle/finances', null, `__u(document.querySelector('main .grid.k2'), __h3('Amortissement du crédit').nextElementSibling)`],
  ['location', '/bien/namur/location', null, `__u(__h3('Baux en cours'), document.querySelectorAll('main .grid.k21')[0])`],
  ['saisonnier', '/bien/knokke/location', null, `__u(document.querySelector('main .grid.k4'), document.querySelector('main .grid.k2'))`],
  ['charges', '/bien/gand/charges', null, `__u(__h3('Bilan annuel'), __h3('Bilan annuel').nextElementSibling)`],
  ['certificats', '/bien/namur/entretien', null, `__u(__h3('Certificats'), __h3('Travaux').nextElementSibling)`],
  ['documents', '/documents', null, `(()=>{const r=__u(document.querySelector('main .head'), document.querySelector('#doclist'));r.height=Math.min(r.height,720);return r})()`],
  ['simulateur', '/simulateur', null, `__u(document.querySelector('main .head'), document.querySelector('#simRet'))`],
  ['revente', '/simulateur', null, `__u(document.querySelectorAll('main .grid.k2')[0])`],
  ['conseiller', '/', `document.querySelector('[data-act=advisor]').click()`, `(()=>{const r=__u(document.querySelector('#modalbox'));r.y-=scrollY;return r})()`],
  ['mapart', '/', `document.querySelector('[data-act=mode][data-v=part]').click()`, `__u(document.querySelector('main .head'), document.querySelector('.banner'))`],
];
async function go(hash, width, mobile) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1.5, mobile });
  await send('Page.navigate', { url: 'about:blank' }); await sleep(300); await send('Page.navigate', { url: base + '#' + hash }); await sleep(1500);
  await ev(`window.dispatchEvent(new HashChangeEvent('hashchange'))`); await sleep(1800);
  await ev(HELP);
}
const save = (name, data) => { writeFileSync(`${outDir}/${name}.jpg`, Buffer.from(data, 'base64')); console.log(name); };
for (const [name, hash, prep, clipExpr] of shots) {
  await go(hash, 1280, false);
  if (prep) { await ev(prep); await sleep(1500); }
  const clip = await ev(clipExpr);
  const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82, clip, captureBeyondViewport: true });
  if (!s.result) { console.log('FAIL', name, JSON.stringify(s.error), JSON.stringify(clip)); continue; }
  save(name, s.result.data);
}
// vues mobiles (écran entier)
for (const [name, hash] of [['mobile-accueil', '/'], ['mobile-bien', '/bien/knokke']]) {
  await go(hash, 390, true);
  const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82 });
  save(name, s.result.data);
}
console.log('ERRORS:', errs.length ? errs : 'none');
ws.close(); chrome.kill(); process.exit(0);
