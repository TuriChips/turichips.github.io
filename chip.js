// Renders a chip's write-up (the README of its public repo) on this site. One copy of the text: the repo.
const slug = new URLSearchParams(location.search).get('chip');
const doc = document.getElementById('doc');
const fail = m => { doc.textContent = m; };
fetch('chips.json').then(r => r.json()).then(chips => {
  const c = chips.find(x => x.slug === slug);
  if (!c) return fail('Unknown chip. Go back to the list of chips.');
  document.title = c.name + ' · TuriChips';
  const base = 'https://github.com/' + c.repo + '/blob/' + c.branch + '/';
  const rawBase = 'https://raw.githubusercontent.com/' + c.repo + '/' + c.branch + '/';
  const head = document.getElementById('head');
  head.innerHTML = '';
  const img = Object.assign(document.createElement('img'), {src: c.image, alt: 'Illustration of the ' + c.name + ' chip'});
  const t = document.createElement('div');
  const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = c.kind + ' · ' + c.year + ' · ';
  const badge = document.createElement('span'); badge.className = 'badge'; badge.textContent = c.status; meta.append(badge);
  const h = document.createElement('h1'); h.textContent = c.name;
  const p = document.createElement('p'); p.className = 'lead'; p.textContent = c.description;
  t.append(meta, h, p);
  head.append(img, t);
  const src = document.getElementById('src');
  const a = Object.assign(document.createElement('a'), {href: base + 'README.md', textContent: 'README.md in ' + c.repo});
  src.append('This write-up is the ', a, ' on GitHub, shown here unchanged.');
  return fetch(rawBase + 'README.md').then(r => { if (!r.ok) throw 0; return r.text(); }).then(md => {
    md = md.replace(/^# .*\n/, ''); // title is in the header above
    const div = document.createElement('div');
    div.innerHTML = DOMPurify.sanitize(marked.parse(md));
    // relative links (logs, spec, source) point at the repo on GitHub
    div.querySelectorAll('a[href]').forEach(l => {
      const href = l.getAttribute('href');
      if (!/^(https?:|#|mailto:)/.test(href)) l.href = base + href;
      if (/^https?:/.test(l.href)) l.rel = 'noopener';
    });
    // log paths written as `code` become links to the repo
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
