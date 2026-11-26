// Add a chip by adding one entry to chips.json (oldest first). Set "show": false to hide it.
const el = (tag, text) => { const e = document.createElement(tag); if (text != null) e.textContent = text; return e; };
const modified = new Date(document.lastModified);
document.getElementById('updated').textContent = modified.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
document.getElementById('year').textContent = modified.getFullYear();
fetch('chips.json').then(r => r.json()).then(chips => {
  const root = document.getElementById('chip-list');
  chips.filter(c => c.show !== false).forEach(c => {
    const box = el('article'); box.className = 'project';
    const w = el('a', 'Write-up'); w.href = 'chip.html?chip=' + encodeURIComponent(c.slug);
    box.append(el('h3', c.name), w);
    root.append(box);
  });
});
