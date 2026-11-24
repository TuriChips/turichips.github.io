// Add a chip by adding one entry to chips.json (oldest first). Set "show": false to hide it.
const el = (tag, text) => { const e = document.createElement(tag); if (text != null) e.textContent = text; return e; };
const modified = new Date(document.lastModified);
document.getElementById('updated').textContent = modified.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
document.getElementById('year').textContent = modified.getFullYear();
fetch('chips.json').then(r => r.json()).then(chips => {
  const root = document.getElementById('chip-list');
  chips.filter(c => c.show !== false).forEach((c, i) => {
    const href = 'chip.html?chip=' + encodeURIComponent(c.slug);
    const box = el('article'); box.className = 'project';
    const meta = el('p', String(i + 1).padStart(2, '0') + ' · ' + c.year + ' · ' + c.kind); meta.className = 'meta';
    if (!/released/i.test(c.status)) { meta.append(' · '); const s = el('span', c.status); s.className = 'status'; meta.append(s); }
    const h = el('h3'); const a = el('a', c.name); a.href = href; h.append(a);
    const p = el('p', c.description);
    const links = el('p'); links.className = 'links';
    const w = el('a', 'Write-up'); w.href = href;
    const src = el('a', 'Source ↗'); src.href = 'https://github.com/' + c.repo; src.rel = 'noopener';
    links.append(w, src);
    box.append(meta, h, p, links);
    root.append(box);
  });
});
