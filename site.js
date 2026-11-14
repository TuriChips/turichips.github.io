// Add a chip by adding one entry to chips.json (oldest first). Set "show": false to hide it.
fetch('chips.json').then(r => r.json()).then(chips => {
  const root = document.getElementById('cards');
  chips.filter(c => c.show !== false).forEach(c => {
    const a = document.createElement('a');
    a.className = 'card';
    a.href = 'chip.html?chip=' + encodeURIComponent(c.slug);
    const tb = document.createElement('div'); tb.className = 'titlebar small';
    tb.textContent = c.name + '.chip';
    const img = document.createElement('img');
    img.src = c.image; img.alt = 'Illustration of the ' + c.name + ' chip'; img.loading = 'lazy';
    const body = document.createElement('div'); body.className = 'card-body';
    const meta = document.createElement('div'); meta.className = 'meta';
    meta.textContent = c.kind + ' · ' + c.year;
    const badge = document.createElement('span'); badge.className = 'badge'; badge.textContent = c.status;
    meta.append(badge);
    const h = document.createElement('h3'); h.textContent = c.name;
    const p = document.createElement('p'); p.textContent = c.description;
    const more = document.createElement('span'); more.className = 'more'; more.textContent = 'Open write-up »';
    body.append(meta, h, p, more);
    a.append(tb, img, body);
    root.append(a);
  });
});
