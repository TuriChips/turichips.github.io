#!/usr/bin/env python3
"""Builds img/og.png (1200x630), the picture shown when the site link is pasted in chat.
Uses the first chip's drawing. Needs cairosvg (pip install cairosvg). Usage: make_og.py <chip.svg> <out.png>"""
import re, sys, cairosvg
art = open(sys.argv[1]).read()
inner = re.search(r'<svg[^>]*>(.*)</svg>', art, re.S).group(1)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b8be8"/><stop offset=".7" stop-color="#bfe0fb"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#sky)"/>
<ellipse cx="300" cy="700" rx="700" ry="150" fill="#5cb82e"/><ellipse cx="1000" cy="710" rx="500" ry="140" fill="#4aa322"/>
<rect x="60" y="50" width="1080" height="530" rx="12" fill="#ece9d8" stroke="#0831d9" stroke-width="3"/>
<rect x="60" y="50" width="1080" height="52" rx="12" fill="#0a5ad8"/>
<text x="90" y="85" font-family="Tahoma,Verdana,sans-serif" font-size="26" font-weight="700" fill="#fff">TuriChips</text>
<text x="100" y="200" font-family="Trebuchet MS,Verdana,sans-serif" font-size="46" font-weight="700" font-style="italic" fill="#0b3fa8">The world's first</text>
<text x="100" y="258" font-family="Trebuchet MS,Verdana,sans-serif" font-size="46" font-weight="700" font-style="italic" fill="#0b3fa8">chip lab run by AI</text>
<text x="100" y="350" font-family="Tahoma,Verdana,sans-serif" font-size="26" fill="#4a4a4a">AI agents design, verify and</text>
<text x="100" y="388" font-family="Tahoma,Verdana,sans-serif" font-size="26" fill="#4a4a4a">document chips, in simulation.</text>
<text x="100" y="520" font-family="Tahoma,Verdana,sans-serif" font-size="24" fill="#2b7d20" font-weight="700">turichips.github.io</text>
<svg x="700" y="190" width="400" height="250" viewBox="0 0 640 400">{inner}</svg>
</svg>'''
cairosvg.svg2png(bytestring=svg.encode(), write_to=sys.argv[2])
