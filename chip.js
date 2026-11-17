// Renders a chip's write-up (the README of its public repo) on this site. One copy of the text: the repo.
const slug = new URLSearchParams(location.search).get('chip');
const doc = document.getElementById('doc');
const fail = m => { doc.textContent = m; };
fetch('chips.json').then(r => r.json()).then(chips => {
  const c = chips.find(x => x.slug === slug);
  if (!c) return fail('Unknown chip. Go back to the list of chips.');
  document.title = c.name + ' · TuriChips';
  document.getElementById('crumb').textContent = c.name;
  const base = 'https://github.com/' + c.repo + '/blob/' + c.branch + '/';
  const rawBase = 'https://raw.githubusercontent.com/' + c.repo + '/' + c.branch + '/';
  const rel = h => h.replace(/^\.?\//, ''); // 'x', './x' and '/x' all mean a path in the repo
  const head = document.getElementById('head');
  head.innerHTML = '';
  const img = Object.assign(document.createElement('img'), {src: c.image, alt: 'Illustration of the ' + c.name + ' chip'});
  const t = document.createElement('div');
  const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = c.kind + ' · ' + c.year + ' · ';
  const badge = document.createElement('span'); badge.className = 'badge' + (/released/i.test(c.status) ? ' released' : ''); badge.textContent = c.status; meta.append(badge);
  const h = document.createElement('h1'); h.textContent = c.name;
  const p = document.createElement('p'); p.className = 'lead'; p.textContent = c.description;
  t.append(meta, h, p);
  head.append(img, t);
  const src = document.getElementById('src');
  const link = (file, text) => Object.assign(document.createElement('a'), {href: base + file, textContent: text});
  // The page shows the chip's STORY.md (written for anyone); chips without one yet fall back to the README.
  // GitHub renders and sanitizes the markdown for us, so this page needs no third-party code.
  const gh = 'https://api.github.com/repos/' + c.repo;
  const ref = '?ref=' + encodeURIComponent(c.branch);
  const get = url => fetch(url, {headers: {Accept: 'application/vnd.github.html+json'}}).then(r => { if (!r.ok) throw 0; return r.text(); });
  return get(gh + '/contents/STORY.md' + ref).then(html => {
    src.append('This story is ', link('STORY.md', 'STORY.md in ' + c.repo), ' on GitHub. For engineers: the ', link('README.md', 'technical write-up'), ', with run commands and every log.');
    return html;
  }, () => get(gh + '/readme' + ref).then(html => {
    src.append('This write-up is the ', link('README.md', 'README.md in ' + c.repo), ' on GitHub, shown here unchanged.');
    return html;
  })).then(html => {
    const div = document.createElement('div');
    div.innerHTML = html;
    div.querySelector('.markdown-heading')?.remove(); // title is in the header above
    div.querySelectorAll('a.anchor').forEach(x => x.remove()); // permalink icons
    // relative links (logs, spec, source) point at the repo on GitHub
    div.querySelectorAll('a[href]').forEach(l => {
      const href = l.getAttribute('href');
      if (!/^(https?:|#|mailto:)/.test(href)) l.href = base + rel(href);
      if (/^https?:/.test(l.href)) l.rel = 'noopener';
    });
    // log paths written as `code` become links to the repo
    // images with a repo path (e.g. the layout picture) come from the repo's raw files
    div.querySelectorAll('img[src]').forEach(im => {
      const src = im.getAttribute('src');
      if (!/^(https?:|data:)/.test(src)) im.src = rawBase + rel(src);
    });
    div.querySelectorAll('code').forEach(cd => {
      if (cd.closest('a,pre')) return;
      const txt = cd.textContent.trim();
      if (/^(logs|docs|rtl|tb|tests|ref|synth|sw)\/[\w./-]+$/.test(txt)) {
        const l = document.createElement('a'); l.href = base + txt; l.rel = 'noopener';
        cd.replaceWith(l); l.append(cd);
      }
    });
    div.querySelectorAll('table').forEach(tb => {
      const w = document.createElement('div'); w.className = 'tablewrap'; tb.replaceWith(w); w.append(tb);
    });
    doc.replaceChildren(...div.childNodes);
    (c.extra_images || []).forEach(e => {
      const f = document.createElement('figure');
      const i = Object.assign(document.createElement('img'), {src: e.src, alt: e.caption, loading: 'lazy'});
      const cap = document.createElement('figcaption'); cap.textContent = e.caption;
      f.append(i, cap); doc.append(f);
    });
  });
}).catch(() => fail('Could not load the write-up. It lives at the chip repo on GitHub.'));
