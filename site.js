// Add a chip by adding one entry to chips.json (oldest first). Set "show": false to hide it.
const el = (tag, text) => { const e = document.createElement(tag); if (text != null) e.textContent = text; return e; };
document.getElementById('updated').textContent = new Date(document.lastModified).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});
fetch('chips.json').then(r => r.json()).then(chips => {
  const root = document.getElementById('chips');
  chips.filter(c => c.show !== false).forEach(c => {
    const href = 'chip.html?chip=' + encodeURIComponent(c.slug);
    const box = el('div'); box.className = 'chip';
    const meta = el('p', c.year + ' · ' + c.kind); meta.className = 'meta';
    if (!/released/i.test(c.status)) { const s = el('span', ' · ' + c.status); s.className = 'status'; meta.append(s); }
    const h = el('h3'); const a = el('a', c.name); a.href = href; h.append(a);
    const p = el('p', c.description); p.className = 'desc';
    const more = el('a', 'Read the write-up →'); more.href = href; more.className = 'more';
    box.append(meta, h, p, more);
    root.append(box);
  });
});
