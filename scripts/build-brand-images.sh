#!/bin/sh
# Render the social card and the app icons (#269) from their SVG sources in web/brand/ into web/,
# where build:web copies them. The PNGs are committed: Vercel's build has neither rsvg-convert nor
# Inter, so this runs by hand after editing a source, never in the build.
#
# Every pixel is original (brand mark, wordmark, palette tokens from web/styles.css): no Riot card
# art and no Riot logo may enter these files (CLAUDE.md, legal posture).
#
#   brew install librsvg && sh scripts/build-brand-images.sh
set -eu
root=$(cd "$(dirname "$0")/.." && pwd)
fonts=$(mktemp -d)
# Inter is the site's only face; fetched from Google Fonts into a private fontconfig so nothing is
# installed system-wide and no other font can stand in for it unnoticed.
css=$(curl -sf -A "Mozilla/4.0" "https://fonts.googleapis.com/css2?family=Inter:wght@400;600")
i=0
for url in $(printf '%s' "$css" | grep -o 'https://[^)]*\.ttf'); do
  i=$((i + 1)); curl -sf -o "$fonts/inter-$i.ttf" "$url"
done
printf '<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>%s</dir><cachedir>%s/cache</cachedir></fontconfig>\n' "$fonts" "$fonts" > "$fonts/fonts.conf"
export FONTCONFIG_FILE="$fonts/fonts.conf"
fc-list : family | grep -q '^Inter' || { echo "Inter did not load" >&2; exit 1; }

rsvg-convert -w 1200 -h 630 -o "$root/web/og.png" "$root/web/brand/og.svg"
rsvg-convert -w 180 -h 180 -o "$root/web/apple-touch-icon.png" "$root/web/brand/icon.svg"
rsvg-convert -w 192 -h 192 -o "$root/web/icon-192.png" "$root/web/brand/icon.svg"
rsvg-convert -w 512 -h 512 -o "$root/web/icon-512.png" "$root/web/brand/icon.svg"
ls -l "$root"/web/og.png "$root"/web/apple-touch-icon.png "$root"/web/icon-192.png "$root"/web/icon-512.png
