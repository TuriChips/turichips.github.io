#!/usr/bin/env python3
"""Draws the DIP-package illustration for a chip card. Our own art, no photos.
Usage: make_chip_art.py tools/chips/<chip>.json
The JSON gives out, name, subtitle, tag and the pin names in package order
(pin 1 first; copied from the chip's spec, never from memory). Adding a chip
means adding a JSON file, not drawing again."""
import sys, json
d = json.load(open(sys.argv[1]))
out, name, sub, tag = d["out"], d["name"], d["subtitle"], d["tag"]
names = d["pins"]
pins = len(names)
per = pins // 2
W, H = 640, 400
pitch = min(36, (W - 70) // per)   # narrower pin spacing for 40-pin chips so the package fits the picture
bw = per * pitch + 40          # body width
bx = (W - bw) / 2
by, bh = 110, 180
s = []
a = s.append
a(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="Illustration of the {name} chip in a {pins}-pin DIP package">')
a('''<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6f1f9"/><stop offset="1" stop-color="#c8ddec"/></linearGradient>
<linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2f38"/><stop offset=".5" stop-color="#1c1f26"/><stop offset="1" stop-color="#111318"/></linearGradient>
<linearGradient id="pin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a8f98"/><stop offset=".4" stop-color="#e8eaee"/><stop offset="1" stop-color="#7d828b"/></linearGradient>
<linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
<pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#0b1f3a" stroke-opacity=".09"/></pattern>
</defs>''')
a(f'<rect width="{W}" height="{H}" fill="url(#bg)"/><rect width="{W}" height="{H}" fill="url(#grid)"/>')
# shadow
a(f'<ellipse cx="{W/2}" cy="{by+bh+48}" rx="{bw/2}" ry="12" fill="#0b1f3a" opacity=".22"/>')
# pins
pw, ph = 16, 34
for side in (0, 1):
    for i in range(per):
        x = bx + 28 + i * pitch + (pitch - pw) / 2 - 0
        y = by - ph + 6 if side == 0 else by + bh - 6
        n = i + 1 if side == 1 else pins - i   # pin 1 bottom-left, counter-clockwise
        a(f'<g><title>Pin {n}: {names[n-1]}</title><rect x="{x:.1f}" y="{y}" width="{pw}" height="{ph}" rx="3" fill="url(#pin)" stroke="#555a63" stroke-width=".8"/></g>')
# body
a(f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="10" fill="url(#body)" stroke="#05070a" stroke-width="2"/>')
a(f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="10" fill="url(#shine)"/>')
a(f'<rect x="{bx+6}" y="{by+6}" width="{bw-12}" height="{bh-12}" rx="6" fill="none" stroke="#fff" stroke-opacity=".06"/>')
# notch + pin-1 dot
a(f'<path d="M{bx} {by+bh/2-18} a18 18 0 0 1 0 36" fill="#0b0d11" stroke="#05070a" stroke-width="1.5"/>')
a(f'<circle cx="{bx+30}" cy="{by+bh-24}" r="5" fill="#0b0d11" stroke="#3a3f49"/>')
# markings
cx = W / 2 + 6
f = "font-family=\"ui-monospace,SFMono-Regular,Menlo,Consolas,monospace\" text-anchor=\"middle\""
a(f'<text x="{cx}" y="{by+54}" {f} font-size="15" letter-spacing="5" fill="#f5e05a">TURICHIPS</text>')
a(f'<text x="{cx}" y="{by+108}" {f} font-size="50" font-weight="700" letter-spacing="3" fill="#f2f4f8">{name}</text>')
a(f'<text x="{cx}" y="{by+138}" {f} font-size="16" letter-spacing="4" fill="#c4cbd8">{sub}</text>')
a(f'<text x="{cx}" y="{by+162}" {f} font-size="11" letter-spacing="3" fill="#7e8798">{tag}</text>')
a('</svg>')
open(out, "w").write("\n".join(s))
