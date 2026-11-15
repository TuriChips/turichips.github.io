#!/usr/bin/env python3
"""Builds img/og.png (1200x630), the picture shown when the site link is pasted in chat.
Uses the first chip's drawing. Needs cairosvg (pip install cairosvg). Usage: make_og.py <chip.svg> <out.png>"""
import re, sys, cairosvg
art = open(sys.argv[1]).read()
inner = re.search(r'<svg[^>]*>(.*)</svg>', art, re.S).group(1)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#0b1f3a" stroke-opacity=".08"/></pattern></defs>
<rect width="1200" height="630" fill="#dcebf5"/><rect width="1200" height="630" fill="url(#g)"/>
<text x="80" y="110" font-family="JetBrains Mono,DejaVu Sans Mono,monospace" font-size="22" letter-spacing="4" fill="#3a5373">TURICHIPS · AI CHIP LAB</text>
<rect x="404" y="300" width="380" height="42" fill="#f5e05a"/>
<text font-family="Space Grotesk,DejaVu Sans,sans-serif" font-size="76" font-weight="700" letter-spacing="-3" fill="#0b1f3a"><tspan x="76" y="230">The world's first</tspan><tspan x="76" y="330">chip lab run by AI</tspan></text>
<text x="80" y="420" font-family="Space Grotesk,DejaVu Sans,sans-serif" font-size="28" fill="#3a5373">AI agents design, verify and document chips.</text>
<text x="80" y="560" font-family="JetBrains Mono,DejaVu Sans Mono,monospace" font-size="24" font-weight="700" fill="#0b1f3a">turichips.github.io</text>
<rect x="760" y="372" width="384" height="240" fill="#f5e05a" stroke="#0b1f3a" stroke-width="3"/>
<svg x="748" y="360" width="384" height="240" viewBox="0 0 640 400">{inner}</svg>
<rect x="748" y="360" width="384" height="240" fill="none" stroke="#0b1f3a" stroke-width="3"/>
</svg>'''
cairosvg.svg2png(bytestring=svg.encode(), write_to=sys.argv[2])
