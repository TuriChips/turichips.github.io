// Add a chip by adding one entry to chips.json (oldest first). Set "show": false to hide it.
fetch('chips.json').then(r => r.json()).then(chips => {
  const root = document.getElementById('cards');
  chips.filter(c => c.show !== false).forEach((c, i) => {
    const a = document.createElement('a');
    a.className = 'row';
    a.href = 'chip.html?chip=' + encodeURIComponent(c.slug);
    const img = document.createElement('img');
    img.src = c.image; img.alt = 'Illustration of the ' + c.name + ' chip'; img.loading = 'lazy';
    const body = document.createElement('div'); body.className = 'row-body';
    const h = document.createElement('h3');
    h.textContent = c.name;
    const badge = document.createElement('span'); badge.className = 'badge'; badge.textContent = c.status;
    h.append(badge);
    const meta = document.createElement('div'); meta.className = 'meta';
    meta.textContent = String(i + 1).padStart(2, '0') + ' · ' + c.kind + ' · ' + c.year;
    const p = document.createElement('p'); p.textContent = c.description;
    const more = document.createElement('span'); more.className = 'more'; more.textContent = 'read write-up';
    body.append(meta, h, p, more);
    a.append(img, body);
    root.append(a);
  });
});
