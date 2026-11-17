// Add a chip by adding one entry to chips.json (oldest first). Set "show": false to hide it.
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const updated = document.getElementById('updated');
if (updated) updated.textContent = new Date(document.lastModified).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});
fetch('chips.json').then(r => r.json()).then(chips => {
  const shown = chips.filter(c => c.show !== false);
  const released = shown.filter(c => /released/i.test(c.status)).length;
  document.getElementById('stat-released').textContent = String(released).padStart(3, '0');
  const root = document.getElementById('cards');
  shown.forEach((c, i) => {
    const href = 'chip.html?chip=' + encodeURIComponent(c.slug);
    const tr = el('tr');
    const pic = el('td', 'pic');
    const pa = el('a'); pa.href = href;
    pa.append(Object.assign(document.createElement('img'), {src: c.image, alt: 'Illustration of the ' + c.name + ' chip', loading: 'lazy'}));
    pic.append(pa);
    const info = el('td', 'info');
    const name = el('a', 'name', c.name); name.href = href;
    const more = el('a', 'more', 'Read the write-up »'); more.href = href;
    info.append(name, el('span', 'kind', ' (' + c.kind + ')'), el('p', null, c.description), more);
    const isRel = /released/i.test(c.status);
    const st = el('td', 'status');
    st.append(el('span', 'badge' + (isRel ? ' released' : ' wip'), c.status));
    tr.append(el('td', 'idx', String(i + 1).padStart(2, '0')), pic, el('td', 'year', String(c.year)), info, st);
    root.append(tr);
  });
});
