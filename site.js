// Add a chip by adding one entry to chips.json (oldest first). Set "show": false to hide it.
const el = (tag, text) => { const e = document.createElement(tag); if (text != null) e.textContent = text; return e; };
document.getElementById('updated').textContent = new Date(document.lastModified).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});
fetch('chips.json').then(r => r.json()).then(chips => {
  const root = document.getElementById('chips');
  chips.filter(c => c.show !== false).forEach(c => {
    const href = 'chip.html?chip=' + encodeURIComponent(c.slug);
    const h = el('h3');
    const a = el('a', c.name); a.href = href;
    h.append(c.year + ' · ', a);
    const meta = el('p', c.kind + (/released/i.test(c.status) ? '' : ' · ' + c.status));
    meta.className = 'meta';
    const more = el('a', 'Read the write-up →'); more.href = href;
    const p = el('p', c.description + ' ');
    p.append(more);
    root.append(h, meta, p);
  });
});
