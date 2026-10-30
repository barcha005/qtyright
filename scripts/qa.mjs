import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
const out = 'out';
let fail = 0; const ok = (name, cond, detail='') => { console.log(`${cond?'PASS':'FAIL'}  ${name}${cond?'':' — '+detail}`); if(!cond) fail++; };
const sitemap = readFileSync(join(out,'sitemap.xml'),'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
ok('sitemap has 23 URLs', urls.length===23, `got ${urls.length}`);
const robots = readFileSync(join(out,'robots.txt'),'utf8');
ok('robots allows all + sitemap', robots.includes('Allow: /') && robots.includes('sitemap.xml'));
const titles = new Set(), descs = new Set();
for (const u of urls) {
  const path = u.replace('https://qtyright.com','') || '/';
  const file = path==='/' ? join(out,'index.html') : join(out, path.replace(/^\//,''), 'index.html');
  if (!existsSync(file)) { ok(`page exported: ${path}`, false, file); continue; }
  const html = readFileSync(file,'utf8');
  const title = (html.match(/<title>([^<]+)<\/title>/)||[])[1]||'';
  const desc = (html.match(/<meta name="description" content="([^"]+)"/)||[])[1]||'';
  const h1s = (html.match(/<h1[ >]/g)||[]).length;
  titles.add(title); descs.add(desc);
  ok(`${path}: title+desc+h1+canonical`, title.length>10 && desc.length>40 && h1s===1 && html.includes('rel="canonical"'), `t=${title.length} d=${desc.length} h1=${h1s} canon=${html.includes('rel="canonical"')}`);
}
ok('all titles unique', titles.size===urls.length, `${titles.size}/${urls.length}`);
ok('all descriptions unique', descs.size===urls.length, `${descs.size}/${urls.length}`);
const tool = readFileSync(join(out,'concrete-calculator','index.html'),'utf8');
ok('tool page has FAQPage schema', tool.includes('"@type":"FAQPage"'));
ok('tool page has WebApplication schema', tool.includes('"@type":"WebApplication"'));
ok('tool page has breadcrumbs schema', tool.includes('BreadcrumbList'));
ok('no fake ads rendered', !tool.includes('adsbygoogle'));
ok('OG tags present on tool page', tool.includes('property="og:title"'));
const home = readFileSync(join(out,'index.html'),'utf8');
const links = [...new Set([...home.matchAll(/href="(\/[^"#?]*)/g)].map(m=>m[1]))];
let bad = [];
for (const l of links) {
  if (!l || l==='/') continue;
  const f = join(out, l.replace(/^\//,''), 'index.html');
  const f2 = join(out, l.replace(/^\//,''));
  if (!existsSync(f) && !existsSync(f2)) bad.push(l);
}
ok('homepage internal links all resolve', bad.length===0, bad.join(','));
let s=0; const walk=d=>{for(const e of readdirSync(d)){const p=join(d,e); statSync(p).isDirectory()?walk(p):s+=statSync(p).size;}}; walk(out);
console.log(`INFO  total export size: ${(s/1024).toFixed(0)} KB across all pages/assets`);
console.log(fail===0 ? 'QA: ALL PASSED' : `QA: ${fail} FAILURES`);
process.exit(fail?1:0);
