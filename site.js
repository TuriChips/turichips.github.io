// Add a chip by adding one entry to chips.json (oldest first). Set "show": false to hide it.
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
fetch('chips.json').then(r => r.json()).then(chips => {
  const shown = chips.filter(c => c.show !== false);
  const released = shown.filter(c => /released/i.test(c.status)).length;
  document.getElementById('stat-released').textContent = released;
  const root = document.getElementById('cards');
  shown.forEach((c, i) => {
    const a = el('a', 'card');
    a.href = 'chip.html?chip=' + encodeURIComponent(c.slug);
    const art = el('div', 'card-art');
    art.append(Object.assign(document.createElement('img'), {src: c.image, alt: 'Illustration of the ' + c.name + ' chip', loading: 'lazy'}));
    const body = el('div', 'card-body');
    const top = el('div', 'card-top');
    const year = el('span', 'year');
    year.append(el('span', 'idx', String(i + 1).padStart(2, '0')), String(c.year));
    top.append(year, el('span', 'badge' + (/released/i.test(c.status) ? ' released' : ''), c.status));
    body.append(top, el('h3', null, c.name), el('span', 'kind', c.kind), el('p', null, c.description), el('span', 'more', 'Read the write-up'));
    a.append(art, body);
    root.append(a);
  });
});
