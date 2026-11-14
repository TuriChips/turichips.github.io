// Add a chip by adding one entry to chips.json (oldest first). Set "show": false to hide it.
fetch('chips.json').then(r => r.json()).then(chips => {
  const root = document.getElementById('chips');
  chips.filter(c => c.show !== false).forEach(c => {
    const a = document.createElement('a');
    a.className = 'card';
    a.href = c.link;
    const img = document.createElement('img');
    img.src = c.image; img.alt = 'Synthesized gate-level netlist of the ' + c.name;
    const h = document.createElement('h2'); h.textContent = c.name + ' (' + c.year + ')';
    const p = document.createElement('p'); p.textContent = c.description;
    a.append(img, h, p);
    root.append(a);
  });
});
