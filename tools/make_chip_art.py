#!/usr/bin/env python3
"""Draws the DIP-package illustration for a chip card. Our own art, no photos.
Usage: make_chip_art.py <out.svg> <name> <subtitle> <pins> [year-line]"""
import sys
out, name, sub, pins = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
tag = sys.argv[5] if len(sys.argv) > 5 else "DESIGNED BY AI"
per = pins // 2
W, H = 640, 400
pitch = 36
bw = per * pitch + 40          # body width
bx = (W - bw) / 2
by, bh = 110, 180
s = []
a = s.append
a(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="Illustration of the {name} chip in a {pins}-pin DIP package">')
a('''<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16202e"/><stop offset="1" stop-color="#0b0f17"/></linearGradient>
<linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2f38"/><stop offset=".5" stop-color="#1c1f26"/><stop offset="1" stop-color="#111318"/></linearGradient>
<linearGradient id="pin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a8f98"/><stop offset=".4" stop-color="#e8eaee"/><stop offset="1" stop-color="#7d828b"/></linearGradient>
<linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
<pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#7aa2ff" stroke-opacity=".07"/></pattern>
</defs>''')
a(f'<rect width="{W}" height="{H}" fill="url(#bg)"/><rect width="{W}" height="{H}" fill="url(#grid)"/>')
# shadow
a(f'<ellipse cx="{W/2}" cy="{by+bh+48}" rx="{bw/2}" ry="12" fill="#000" opacity=".35"/>')
# pins
pw, ph = 16, 34
for side in (0, 1):
    for i in range(per):
        x = bx + 28 + i * pitch + (pitch - pw) / 2 - 0
        y = by - ph + 6 if side == 0 else by + bh - 6
        a(f'<rect x="{x:.1f}" y="{y}" width="{pw}" height="{ph}" rx="3" fill="url(#pin)" stroke="#555a63" stroke-width=".8"/>')
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
a(f'<text x="{cx}" y="{by+54}" {f} font-size="15" letter-spacing="5" fill="#9fb4d9">TURICHIPS</text>')
a(f'<text x="{cx}" y="{by+108}" {f} font-size="50" font-weight="700" letter-spacing="3" fill="#f2f4f8">{name}</text>')
a(f'<text x="{cx}" y="{by+138}" {f} font-size="16" letter-spacing="4" fill="#c4cbd8">{sub}</text>')
a(f'<text x="{cx}" y="{by+162}" {f} font-size="11" letter-spacing="3" fill="#7e8798">{tag}</text>')
a('</svg>')
open(out, "w").write("\n".join(s))
